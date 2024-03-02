export interface ResultSetResponse<T> {
  page: number;
  size: number;
  total: number;
  result: T[];
}
