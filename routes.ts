import glob from 'glob';
import path from 'path';
import { Router } from 'express';
import { toArray, skip } from './utils';
import { isRouteType, isObjectOrArrayHasContent } from './type-checking';
import { Route } from './types';

const router: any = Router({ mergeParams: true });

// relative path from routes file to controllers folder.
const controllersPath: string = '../http/controllers/';
// extension of controllers files (js/ts)
const extension: string = 'js'
// bool for whether you want sucure routes by default
const secureRoutesConstant: boolean = true;
// your route securing function (must be changed)
const secureRoute: Function = () => {};

const addRouteToRouter = (route: Route, filename: string) => {
    const acceptableRoute: object | boolean = isRouteType(route);
    const message: string = `issue with route while exporting a controller in file ${filename}\nroute supplied was:`;

    if (!acceptableRoute) console.log(message, route);
    if (!acceptableRoute) return;

    const { endpoint, controller, method, isSecure = secureRoutesConstant } = route;
    const { middlewareBefore = [], middlewareAfter = [] } = route;

    const makeRouteSecure: Function = isSecure ? secureRoute : skip;
    const middlewareBeforeArr: Function[] = toArray(middlewareBefore);
    const middlewareAfterArr: Function[] = toArray(middlewareAfter);

    const routeArguments: Function[] = [
        ...middlewareBeforeArr,
        makeRouteSecure,
        controller,
        ...middlewareAfterArr,
    ];

    router.route(endpoint)[method](...routeArguments);
};

const addToRouterForEach = (allRoutes: Route[], filename: string) =>
    allRoutes.forEach((route: Route) => addRouteToRouter(route, filename));

glob
    .sync(`**/*.${extension}`, { cwd: path.join(`${__dirname}/`, controllersPath) })
    .filter((filename: string) => filename.split('.').includes('controller'))
    .map((filename: string) => ({ exports: require(`${controllersPath}${filename}`), filename }))
    .filter(({ exports }) => exports && isObjectOrArrayHasContent(exports.default))
    .forEach(({ exports, filename }) => addToRouterForEach(Object.values(exports.default), filename));

export default router;
