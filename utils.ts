import { NextFunction } from 'express';

/**
 * @DESC: either converts a single item to an array if it wasn't already or returns the original array.
 */
export const toArray = (potentialArr: Function[] | Function): Function[] =>
    Array.isArray(potentialArr) ? potentialArr : [potentialArr];


/**
 * @DESC: acts as a middleware function but simply skips to next middleware
 */
export const skip = (_req: Request, _res: Response, next: NextFunction) => next();
