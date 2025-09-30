
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password',
    '/auth/new-verification',
    '/auth/forgot-password'
]

/**
 * An array of routes that are protected from the public
 * These routes require authentication
 * @type {string[]}
 */

export const protectedRoutes = [
    '/buy-course',
    '/profile',
    '/doubt-clearing',
    '/courses'
];

/**
 * The prefix for API authentication routes
 * Routes that start with this predix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';