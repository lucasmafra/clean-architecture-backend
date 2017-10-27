
import { ICreateSubcategoryInput, ISubcategoryDataSource, ISubcategoryOutput, IUpdateSubcategoryInput } from 'core'

export class SubcategoryDatabase implements ISubcategoryDataSource {

    private mockSubcategory: ISubcategoryOutput = {
        id: '1',
        image: 'fkjdlkjfksl',
        name:  'Categoria teste',
        categoryId: '1',
    }

    public async getSubcategoriesByIds(ids: string[]): Promise<ISubcategoryOutput[]> {
        return new Array<ISubcategoryOutput>(this.mockSubcategory)
    }

    public async getAllSubcategories(): Promise<ISubcategoryOutput[]> {
        return new Array<ISubcategoryOutput>(this.mockSubcategory)
    }

    public async getSubcategoryById(id: string): Promise<ISubcategoryOutput> {
        return this.mockSubcategory
    }

    public async getSubcategoriesByCategoryId(id: string): Promise<ISubcategoryOutput[]> {
        return new Array<ISubcategoryOutput>(this.mockSubcategory)
    }

    public async createSubcategory(Subcategory: ICreateSubcategoryInput): Promise<ISubcategoryOutput> {
        return this.mockSubcategory
    }

    public async updateSubcategory(id: string, Subcategory: IUpdateSubcategoryInput): Promise<ISubcategoryOutput> {
        return this.mockSubcategory
    }

    public async deleteSubcategory(id: string): Promise<void> {
        return
    }

}
