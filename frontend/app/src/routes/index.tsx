import React, { useEffect, ReactNode, FC, Suspense, lazy, ComponentType } from "react";
import { createBrowserRouter, useNavigate, RouteObject } from "react-router-dom";
import { routes } from "./routes";

interface ProtectedRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
    requiredRole?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAuthenticated, requiredRole }) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(routes.$root);
        } else {
            if (requiredRole && userRole !== requiredRole) {
                navigate(routes.$root);
            }
        }
    }, [isAuthenticated, requiredRole, navigate, userRole]);

    return <>{children}</>;
};

type RouteConfig = RouteObject & {
    element?: React.ReactNode;
    path: routes;
    lazy?: () => Promise<{ default: ComponentType<any> }>;
};

export const createRoute = (path: routes, requiredRole?: string, Component?: FC): RouteConfig => {
    const DynamicImport = lazy(async () => {
        switch (path) {
            case routes.$tester:
                const m = await import("../pages/tester.page");
                return ({ default: m.TesterPage as ComponentType<any> });
            case routes.$admin:
                const m_1 = await import("../pages/admin.page");
                return ({ default: m_1.AdminPage as ComponentType<any> });
            case routes.$analyst:
                const m_2 = await import("../pages/analyst.page");
                return ({ default: m_2.AnalystPage as ComponentType<any> });
            case routes.$director:
                const m_3 = await import("../pages/director.page");
                return ({ default: m_3.DirectorPage as ComponentType<any> });
            default:
                throw new Error(`Unknown route: ${path}`);
        }
    });

    return {
        path,
        element: (
            <ProtectedRoute isAuthenticated={!!localStorage.getItem('userRole')} requiredRole={requiredRole}>
                <Suspense fallback={<div>Loading...</div>}>
                    {Component ? <Component /> : <DynamicImport />}
                </Suspense>
            </ProtectedRoute>
        ),
    };
};

export const router = createBrowserRouter([
    {
        path: routes.$root,
        Component: (await import("../pages/root.page")).RootPage as FC
    },
    createRoute(routes.$tester, "tester"),
    createRoute(routes.$admin, "admin"),
    createRoute(routes.$analyst, "analyst"),
    createRoute(routes.$director, "director"),
]);
