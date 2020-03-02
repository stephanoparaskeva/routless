import { toArray } from './utils';
import { Route } from './types';

/**
 * @DESC: checks for an array with at least one or more items.
 */
export const isArrayHasContent = (arr: any): boolean =>
    arr && Array.isArray(arr) && !Number.isNaN(arr.length) && arr.length > 0;

/**
 * @DESC: checks for an object with at least one or more values.
 */
export const isObjectHasContent = (obj: object): boolean =>
    obj &&
    obj instanceof Object &&
    !Number.isNaN(Object.values(obj).length) &&
    Object.values(obj).length > 0;

/**
 * @DESC: checks for an array or an object with at least one or more items.
 */
export const isObjectOrArrayHasContent = (item: any[] | object): boolean =>
    isArrayHasContent(item) || isObjectHasContent(item);

/**
 * @DESC: returns true if given argument is a function or a function-array.
 */
export const isFunctionArrayOrFunction = (arr: Function[]) =>
    !toArray(arr).every((one: Function) => typeof one === 'function');

/**
 * @DESC: checks whether given argement strictly follows the shape of the Route type.
 */
export const isRouteType = (route: any): route is Route => {
    // if isSecure provided but not as boolean return false.
    if (route.isSecure && typeof route.isSecure !== 'boolean') {
        return false;
    }
    // if middlewareBefore provided but not as function/function-array return false.
    if (
        route.middlewareBefore &&
        !isFunctionArrayOrFunction(route.middlewareBefore)
    ) {
        return false;
    }
    // if middlewareAfter provided but not as function/function-array return false.
    if (
        route.middlewareAfter &&
        !isFunctionArrayOrFunction(route.middlewareAfter)
    ) {
        return false;
    }
    // if route has the same shape as Route type return route.
    if (
        route &&
        route instanceof Object &&
        route.endpoint &&
        typeof route.endpoint === 'string' &&
        route.method &&
        typeof route.method === 'string' &&
        ['get', 'post', 'put', 'patch', 'delete'].includes(route.method) &&
        route.controller &&
        typeof route.controller === 'function'
    ) {
        return route;
    }
    // default return false.
    return false;
};

