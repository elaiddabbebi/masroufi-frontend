import {ResultSetResponse} from "../types/result-set-response";

export const EmptyResultSet: ResultSetResponse<any> = {
  result: [],
  total: 0,
  page: 1,
  size: 10,
};
