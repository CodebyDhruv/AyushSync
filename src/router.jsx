import { createBrowserRouter, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Problem_list from "./Problem_list.jsx";
import Search from "./Search.jsx";
import Upload from "./Upload.jsx";
import AuditLogs from "./AuditLogs.jsx";
import About from "./components/About.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Comingsoon from "./components/Comingsoon.jsx";
import Signup from "./Signup.jsx";

function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <App /> },
            { path: "search", element: <Search /> },
            { path: "problem_list", element: <Problem_list /> },
            { path: "upload", element: <Upload /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "audit", element: <AuditLogs /> },
            { path: "apidocs", element: <Comingsoon/> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Comingsoon /> },
            { path: "blog", element: <Comingsoon /> },
            { path: "documentation", element: <Comingsoon /> },
            { path: "privacy_policy", element: <Comingsoon /> },
            { path: "terms", element: <Comingsoon /> },
            { path: "contact", element: <Comingsoon /> },
            { path: "facebook", element: <Comingsoon /> },
            { path: "twitter", element: <Comingsoon /> },
            { path: "linkedin", element: <Comingsoon /> },
            { path: "terms", element: <Comingsoon /> },
            { path: "privacy_policy", element: <Comingsoon /> },
            { path: "apidocs", element: <Apidocs />},
        ]
    }
]);

export default router;