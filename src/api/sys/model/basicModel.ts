//查询基础类
export interface PagedListInput {
  filter?: string;
  sorting?: string;
  page: number;
  pageSize: number;
  skipCount: number;
  maxResultCount: number;
}

//分页基础类
export interface PagedListOutput {
  totalCount: number;
  items: any;
}

//不分页基础类
export interface ListOutput {
  items: any;
}
