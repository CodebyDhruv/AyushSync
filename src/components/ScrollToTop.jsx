import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        console.log('ScrollToTop triggered:', { pathname, hash });
        console.log('Current scroll position:', window.scrollY);

        if (hash === "") {
            console.log('Scrolling to top for:', pathname);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                console.log('After scroll position:', window.scrollY);
            }, 100);
        } else {
            console.log('Skipping scroll due to hash:', hash);
        }
    }, [pathname, hash]);

    return;
};

export default ScrollToTop;