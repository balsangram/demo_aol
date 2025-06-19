import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Payments = lazy(() => import('../pages/Payments/Payments'));
const EChange = lazy(() => import('../pages/E-Change/EChange'));
const Coupons = lazy(() => import('../pages/Coupons/Coupons'));
const Ads = lazy(() => import('../pages/Ads/Ads'));
const PetApplications = lazy(() => import('../pages/PetApplications/PetApplications'));
const RedDrop = lazy(() => import('../pages/RedDrop/RedDrop'));
const UsersList = lazy(() => import('../pages/UsersList/UsersList'));
const ExpenseTracker = lazy(() => import('../pages/ExpenseTracker/ExpenseTracker'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
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
    {
        path: '/coupons',
        element: <Coupons />,
    },
    {
        path: '/ads',
        element: <Ads />,
    },
    {
        path: '/pet-applications',
        element: <PetApplications />,
    },
    {
        path: '/red-drop',
        element: <RedDrop />,
    },
    {
        path: '/users-list',
        element: <UsersList />,
    },
    {
        path: '/expense-tracker',
        element: <ExpenseTracker />,
    },
    {
        path: '/settings',
        element: <Settings />,
    },
];

export { routes };
