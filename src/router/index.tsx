import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';

<<<<<<< HEAD
const finalRoutes = routes.map((route) => {
=======
const finalRoutes = routes.map((route) => {    
>>>>>>> 6a0b4c9e69ef0c92143a74e5066c1bbee222661c
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
