export interface ISubcategoryDataSource {
    getSubcategoriesByIds(ids: string[]): Promise<ISubcategoryOutput[]>
    getAllSubcategories(): Promise<ISubcategoryOutput[]>
    getSubcategoriesByCategoryId(categoryId: string): Promise<ISubcategoryOutput[]>
    getSubcategoryById(id: string): Promise<ISubcategoryOutput | undefined>
    createSubcategory(subcategory: ICreateSubcategoryInput): Promise<ISubcategoryOutput>
    updateSubcategory(id: string, subcategory: IUpdateSubcategoryInput): Promise<ISubcategoryOutput>
    deleteSubcategory(id: string): Promise<ISubcategoryOutput>
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
