import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter([
    {
        path: routes.$root,
        lazy: () => import("../pages/root.page")
            .then(m => ({ Component: m.RootPage })),
        // children: [
        //     {
        //         index: true,
        //         lazy: () => import("pages/redirect.page")
        //             .then(m => ({ Component: m.RedirectPage }))
        //     },
        // ]
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
    }
]);

// function recursiveMap(a: RouteObject[]) {
//     return [
//         a,
//         ...a.map(r => r.children ?? [])
//     ].flat();
// }

// export const flatRoutes = router.routes
//     .flatMap(r => [r, ...recursiveMap(r.children!)]);
