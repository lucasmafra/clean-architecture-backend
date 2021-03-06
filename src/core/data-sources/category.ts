export interface ICategoryDataSource {
    getCategoriesByIds(ids: string[]): Promise<ICategoryOutput[]>
    getAllCategories(): Promise<ICategoryOutput[]>
    getCategoryById(id: string): Promise<ICategoryOutput | undefined>
    createCategory(category: ICreateCategoryInput): Promise<ICategoryOutput>
    updateCategory(id: string, category: IUpdateCategoryInput): Promise<ICategoryOutput>
    deleteCategory(id: string): Promise<ICategoryOutput>
}

export interface ICategoryOutput {
    id: string
    name: string
    image: string
}

export interface ICreateCategoryInput {
    name: string
    image: string
}

export interface IUpdateCategoryInput {
    name?: string
    image?: string
}
