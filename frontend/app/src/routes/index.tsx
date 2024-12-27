import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter([
    {
        path: routes.$root,
        lazy: () => import("../pages/root.page")
            .then(m => ({ Component: m.RootPage })),
    },
    {
        path: routes.$tester,
        lazy: () => import("../pages/tester.page")
        .then(m => ({ Component: m.TesterPage })),
    },
    {
        path: routes.$admin,
        lazy: () => import("../pages/admin.page")
        .then(m => ({ Component: m.AdminPage })),
    },
    {
        path: routes.$analyst,
        lazy: () => import("../pages/analyst.page")
        .then(m => ({Component: m.AnalystPage}))
    },
    {
        path: routes.$director,
        lazy: () => import("../pages/director.page")
        .then(m => ({Component: m.DirectorPage}))
    }
]);
