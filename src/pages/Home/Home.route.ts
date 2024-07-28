import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { pathKeys } from '../../utils/routesConfig';
import Home from './Home';

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(Home),
};