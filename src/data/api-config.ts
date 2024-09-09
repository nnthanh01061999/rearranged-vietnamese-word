import { IApiDetailResponse, IApiResponse } from "@/types";

export const HTTP_STATUS_CODE = {
  // 1xx: Informational
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,

  // 2XX: Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 3XX: Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // 4XX: Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  // 5XX: Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Additional HTTP Status Codes
  PARTIAL_CONTENT: 206,
  IM_A_TEAPOT: 418, // Easter egg status code
};

export const defaultApiResponse: IApiResponse<any> = {
  code: HTTP_STATUS_CODE.OK,
  message: "",
  data: {
    items: [],
    total: 0,
  },
};

export const defaultApiDetailResponse: IApiDetailResponse<any> = {
  code: HTTP_STATUS_CODE.OK,
  message: "",
  data: {},
};
