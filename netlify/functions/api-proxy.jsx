// Create this file at: netlify/functions/api-proxy.js

exports.handler = async (event, context) => {
    const { httpMethod, path, queryStringParameters, body } = event;

    // Extract the API path from the Netlify function path
    const apiPath = event.path.replace('/.netlify/functions/api-proxy', '');

    // Construct the target URL
    const targetUrl = `http://3.26.95.153:8080${apiPath}`;
    const url = new URL(targetUrl);

    // Add query parameters if they exist
    if (queryStringParameters) {
        Object.keys(queryStringParameters).forEach(key => {
            url.searchParams.append(key, queryStringParameters[key]);
        });
    }

    try {
        // Make the request to your API server
        const response = await fetch(url.toString(), {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers your API needs
            },
            body: httpMethod !== 'GET' && httpMethod !== 'HEAD' ? body : undefined,
        });

        const data = await response.text();

        // Try to parse as JSON, fall back to text
        let responseData;
        try {
            responseData = JSON.parse(data);
        } catch (e) {
            responseData = data;
        }

        return {
            statusCode: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Content-Type': response.headers.get('content-type') || 'application/json',
            },
            body: typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
        };
    } catch (error) {
        console.error('API Proxy Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: error.message,
            }),
        };
    }
  };