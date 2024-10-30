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
        path: routes.$test,
        lazy: () => import("../pages/test.page")
        .then(m => ({ Component: m.TestPage })),
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
