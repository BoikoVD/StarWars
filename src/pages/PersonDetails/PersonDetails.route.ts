import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { pathKeys } from '../../utils/routesConfig';
import { PersonDetails } from './PersonDetails';

export const personDetailsPageRoute: RouteObject = {
  path: pathKeys.person.root(),
  children: [
    {
      index: true,
      loader: async () => redirect(pathKeys.page404()),
    },
    {
      path: ':id',
      element: createElement(PersonDetails),
      loader: async (args) => {
        if (!args.params) {
          return redirect(pathKeys.page404());
        }

        return args;
      },
    },
  ]
};