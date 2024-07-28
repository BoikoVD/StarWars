import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '../../utils/routesConfig';
import { Page404 } from './Page404';

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(Page404),
};