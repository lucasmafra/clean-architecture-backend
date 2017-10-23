export interface ISubcategoryRepository {
    getSubcategoriesByIds(ids: string[]): Promise<ISubcategoryOutput[]>
    getAllSubcategories(): Promise<ISubcategoryOutput[]>
    getSubcategoriesByCategoryId(categoryId: string): Promise<ISubcategoryOutput[]>
    getSubcategoryById(id: string): Promise<ISubcategoryOutput>
    createSubcategory(Subcategory: ICreateSubcategoryInput): Promise<ISubcategoryOutput>
    updateSubcategory(id: string, Subcategory: IUpdateSubcategoryInput): Promise<ISubcategoryOutput>
    deleteSubcategory(id: string): Promise<void>
}

export interface ISubcategoryOutput {
    id: string
    name: string
    image: string
    categoryId: string
}

export interface ICreateSubcategoryInput {
    name: string
    image: string
    categoryId: string
}

export interface IUpdateSubcategoryInput {
    name?: string
    image?: string
}
