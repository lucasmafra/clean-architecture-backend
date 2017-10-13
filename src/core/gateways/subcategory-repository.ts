export namespace SubcategoryRepositoryGateway {

    export interface ISubcategoryRepository {
        getSubcategoriesByIds(ids: string[]): Promise<ISubcategoryOutput[]>
        getAllSubcategories(): Promise<ISubcategoryOutput[]>
        getSubcategoriesByCategoryId(categoryId: string): Promise<ISubcategoryOutput[]>
        getSubcategoryById(id: string): Promise<ISubcategoryOutput | undefined>
        createSubcategory(Subcategory: ICreateSubcategoryInput): Promise<ISubcategoryOutput>
        updateSubcategory(id: string, Subcategory: IUpdateSubcategoryInput): Promise<ISubcategoryOutput>
        deleteSubcategory(id: string): Promise<void>
    }

    export interface ISubcategoryOutput {
        id: string
        name: string
        description: string
        image: string
        categoryId: string
    }

    export interface ICreateSubcategoryInput {
        name: string
        description: string
        image: string
        categoryId: string
    }

    export interface IUpdateSubcategoryInput {
        name?: string
        description?: string
        image?: string
    }

}
