export interface FilterBlog{
    tags?: string
    email?: string
}

export interface QueryBlog extends FilterBlog {
    take?: number
}