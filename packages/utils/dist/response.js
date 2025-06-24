"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unprocessableEntity = exports.notFound = exports.badRequest = exports.noContent = exports.created = exports.ok = exports.statusCode = void 0;
const badRequestProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
    title: 'Invalid request.',
    status: 400,
};
const unprocessableEntityProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5',
    title: 'Unprocessable entity.',
    status: 422,
};
const notFoundProblemDetails = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
    title: 'The specified resource was not found.',
    status: 404,
};
const contentType = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};
const contentTypeProblemDetails = {
    'Content-Type': 'application/problem+json',
    'Access-Control-Allow-Origin': '*',
};
/**
 * Create an instance of APIGatewayProxyResult.
 * @param statusCode Status code to be defined on the response body.
 * @param data Content to be sent in the response body.
 * @param headers Headers to be sent in the response body.
 * @returns Api Gateway message in the specified format.
 */
const statusCode = (statusCode, 
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
data, headers) => {
    const body = data ? JSON.stringify(data) : '';
    return {
        statusCode,
        body,
        headers,
    };
};
exports.statusCode = statusCode;
/**
 * 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
 * @returns Api Gateway message in a 200 Ok format.
 */
const ok = (data) => (0, exports.statusCode)(200, data, contentType);
exports.ok = ok;
/**
 * 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. The new resource, or a description and link to the new resource, is effectively created before the response is sent back and the newly created items are returned in the body of the message, located at either the URL of the request, or at the URL in the value of the Location header.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
 * @returns Api Gateway message in a 201 Created format.
 */
const created = (data, location) => {
    let header = data ? contentType : {};
    if (location) {
        header = { ...header, Location: location };
    }
    return (0, exports.statusCode)(201, data, header);
};
exports.created = created;
/**
 * 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
 * @returns Api Gateway message in a 204 No Content format.
 */
const noContent = (data) => (0, exports.statusCode)(204, data, data ? contentType : undefined);
exports.noContent = noContent;
/**
 * 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
 * @returns Api Gateway message in a 400 Bad Request format.
 */
const badRequest = (detail) => (0, exports.statusCode)(400, { ...badRequestProblemDetails, detail }, contentTypeProblemDetails);
exports.badRequest = badRequest;
/**
 * 404 Not Found status response code indicates that a request has not found the resource give the arguments.
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
 * @returns Api Gateway message in a 404 Not Found format.
 */
const notFound = (detail) => (0, exports.statusCode)(404, { ...notFoundProblemDetails, detail }, contentTypeProblemDetails);
exports.notFound = notFound;
/**
 * 422 Unprocessable Content response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
 * @returns Api Gateway message in a 422 Unprocessable Content format.
 */
const unprocessableEntity = (detail) => (0, exports.statusCode)(422, { ...unprocessableEntityProblemDetails, detail }, contentTypeProblemDetails);
exports.unprocessableEntity = unprocessableEntity;
