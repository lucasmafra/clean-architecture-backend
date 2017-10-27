export interface IPostDataSource {
    getPostsByIds(ids: string[]): Promise<IPostOutput[]>
    getAllPosts(): Promise<IPostOutput[]>
    getPostById(id: string): Promise<IPostOutput | undefined>
    createPost(input: ICreatePostInput): Promise<IPostOutput>
    deletePost(id: string): Promise<void>
}

export enum PostType {
    Campaign = 'campaign',
    Sale = 'sale',
    Advertisement = 'advertisement',
}

export interface IPostOutput {
    id: string
    type: PostType
    companyId: string
    companyName: string
    companyLogo: string
    description: string
    creationDate: Date
    expirationDate: Date
    photo?: string
    productName: string
    discount: string
}

export interface ICreatePostInput {
    type: PostType
    companyId: string
    companyName: string
    companyLogo: string
    description: string
    creationDate: Date
    expirationDate: Date
}
