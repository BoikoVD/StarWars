import {
    createBrowserRouter,
    redirect,
    RouterProvider,
    useRouteError,
} from 'react-router-dom';
import { pathKeys } from '../utils/routesConfig';
import { homePageRoute } from '../pages/Home/Home.route';
import { page404Route } from '../pages/Page404/Page404.route';
import { Layout } from '../components';

function BubbleError() {
    const error = useRouteError();
    if (error) throw error;
    return <div>error</div>;
}

const router = createBrowserRouter([{
    errorElement: <BubbleError />,
    children: [
        {
            element: <Layout />,
            children: [homePageRoute, page404Route]
        },
        {
            loader: async () => redirect(pathKeys.page404()),
            path: '*',
        },
    ],
}]);

export const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};