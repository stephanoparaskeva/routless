export type Route = {
    endpoint: string;
    controller: Function;
    method: string;
    isSecure?: boolean;
    middlewareBefore?: Function[] | Function;
    middlewareAfter?: Function[] | Function;
};
