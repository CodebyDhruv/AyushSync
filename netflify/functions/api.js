exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        },
        body: '',
      };
    }
  
    const { httpMethod, queryStringParameters, body } = event;
    
    // Extract the API path from the Netlify function path
    // event.path will be something like: /.netlify/functions/api/codesystem/lookup
    const apiPath = event.path.replace('/.netlify/functions/api', '');
    
    // Your API base URL
    const baseUrl = 'http://3.26.95.153:8080';
    const targetUrl = `${baseUrl}/api${apiPath}`;
    
    console.log(`${httpMethod} request to: ${targetUrl}`);
    console.log('Query parameters:', queryStringParameters);
  
    try {
      // Build the URL with query parameters
      const url = new URL(targetUrl);
      if (queryStringParameters) {
        Object.keys(queryStringParameters).forEach(key => {
          url.searchParams.append(key, queryStringParameters[key]);
        });
      }
  
      console.log('Final URL:', url.toString());
  
      // Make the request using Node.js built-in fetch (Node 18+)
      const response = await fetch(url.toString(), {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Netlify-Function-Proxy/1.0',
        },
        ...(httpMethod !== 'GET' && httpMethod !== 'HEAD' && body && { body }),
      });
  
      console.log(`Response status: ${response.status}`);
      console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
  
      // Get the response data
      const contentType = response.headers.get('content-type') || '';
      let responseData;
  
      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
  
      console.log('Response data type:', typeof responseData);
      console.log('Response data preview:', JSON.stringify(responseData).substring(0, 200));
  
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
      };
  
    } catch (error) {
      console.error('API Proxy Error:', error);
      console.error('Error stack:', error.stack);
      
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Internal Server Error',
          message: error.message,
          path: apiPath,
          timestamp: new Date().toISOString(),
        }),
      };
    }
  };