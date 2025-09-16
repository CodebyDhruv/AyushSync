import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet /> 
        </>
    );
}

export default RootLayout;