export namespace CategoryRepositoryGateway {

    export interface ICategoryRepository {
        getCategoriesByIds(ids: string[]): Promise<ICategoryOutput[]>
        getAllCategories(): Promise<ICategoryOutput[]>
        getCategoryById(id: string): Promise<ICategoryOutput | undefined>
        createCategory(category: ICreateCategoryInput): Promise<ICategoryOutput>
        updateCategory(id: string, category: IUpdateCategoryInput): Promise<ICategoryOutput>
        deleteCategory(id: string): Promise<void>
    }

    export interface ICategoryOutput {
        id: string
        name: string
        description: string
        image: string
    }

    export interface ICreateCategoryInput {
        id: string
        name: string
        description: string
        image: string
    }

    export interface IUpdateCategoryInput {
        name?: string
        description?: string
        image?: string
    }
}
