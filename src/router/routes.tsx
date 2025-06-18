import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Payments = lazy(() => import('../pages/Payments/Payments'));
const EChange = lazy(() => import('../pages/E-Change/EChange'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <Dashboard />,
        layout: 'default',
    },
    {
        path: '/payment',
        element: <Payments />,
    },
    {
        path: '/e-change',
        element: <EChange />,
    },
];

export { routes };
