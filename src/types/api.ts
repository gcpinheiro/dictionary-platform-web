export interface PaginatedResponse<T> {
  data: T[];
  first?: number;
  prev?: number;
  next?: number;
  last?: number;
  pages?: number;
  items?: number;
}

