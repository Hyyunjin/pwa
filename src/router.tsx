import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import A from "./pages/A";
import B from "./pages/B";
import C from "./pages/C";
import Layout from "./components/Layout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />, children: [
            { path: "/a", element: <A /> },
            { path: "/b", element: <B /> },
            { path: "/c", element: <C /> },
        ]
    },
];

const router = createBrowserRouter(routes);

export default router;
