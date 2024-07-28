import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '../../utils/routesConfig';
import { Home } from './Home';

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  children: [
    {
      index: true,
      element: createElement(Home),
    },
    {
      path: pathKeys.people.root(),
      children: [
        {
          index: true,
          element: createElement(Home),
        },
        {
          path: ':page',
          element: createElement(Home),
          loader: async (args) => {
            const pageParam = Number(args.params?.page);
            if (!pageParam || isNaN(pageParam) || pageParam <= 0) {
              return redirect(pathKeys.page404());
            }
            return args;
          }
        }
      ]
    },
  ]
};