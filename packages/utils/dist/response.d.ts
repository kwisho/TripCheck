import { APIGatewayProxyResult } from 'aws-lambda';
type Model = unknown;
/**
 * This interface defines the structure of the object to be used as part of GetAllCommand on DynamoDb operations.
 */
export interface GetPagedResult<T> {
    items: T[];
    nextToken?: string;
    count?: number;
}
export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail?: object;
}
/**
 * Create an instance of APIGatewayProxyResult.
 * @param statusCode Status code to be defined on the response body.
 * @param data Content to be sent in the response body.
 * @param headers Headers to be sent in the response body.
 * @returns Api Gateway message in the specified format.
 */
export declare const statusCode: (statusCode: number, data?: Model | ProblemDetails, headers?: {
    [header: string]: boolean | number | string;
}) => APIGatewayProxyResult;
/**
 * 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
 * @returns Api Gateway message in a 200 Ok format.
 */
export declare const ok: (data: Model) => APIGatewayProxyResult;
/**
 * 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. The new resource, or a description and link to the new resource, is effectively created before the response is sent back and the newly created items are returned in the body of the message, located at either the URL of the request, or at the URL in the value of the Location header.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
 * @returns Api Gateway message in a 201 Created format.
 */
export declare const created: (data: Model, location?: string) => APIGatewayProxyResult;
/**
 * 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page.
 * @param data Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
 * @returns Api Gateway message in a 204 No Content format.
 */
export declare const noContent: (data?: Model) => APIGatewayProxyResult;
/**
 * 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
 * @returns Api Gateway message in a 400 Bad Request format.
 */
export declare const badRequest: (detail?: Model) => APIGatewayProxyResult;
/**
 * 404 Not Found status response code indicates that a request has not found the resource give the arguments.
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
 * @returns Api Gateway message in a 404 Not Found format.
 */
export declare const notFound: (detail?: Model) => APIGatewayProxyResult;
/**
 * 422 Unprocessable Content response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
 * @param detail Content to be sent in the response body.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
 * @returns Api Gateway message in a 422 Unprocessable Content format.
 */
export declare const unprocessableEntity: (detail?: Model) => APIGatewayProxyResult;
export {};
