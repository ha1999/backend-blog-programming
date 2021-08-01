export interface FilterBlog {
  tags?: string;
  email?: string;
}

export interface QueryBlog extends FilterBlog {
  take?: number;
}

export interface ParamGetDB {
  auth: string
  title: string
}
