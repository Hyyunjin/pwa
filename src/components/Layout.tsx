import { Outlet } from "react-router-dom";
import SeoHelmet from "./SeoHelmet";

const Layout = () => (
    <>
        <SeoHelmet />
        <Outlet />
    </>
);

export default Layout;
