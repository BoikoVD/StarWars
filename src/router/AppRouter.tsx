import {
    createBrowserRouter,
    redirect,
    RouterProvider,
    useRouteError,
} from 'react-router-dom';
import { pathKeys } from '../utils/routesConfig';
import { Layout } from '../components';
import { homePageRoute, page404Route } from '../pages';

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