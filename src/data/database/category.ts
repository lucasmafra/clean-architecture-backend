import { ICategoryDataSource, ICategoryOutput, ICreateCategoryInput, IUpdateCategoryInput } from 'core'

export class CategoryDatabase implements ICategoryDataSource {

    private mockCategory: ICategoryOutput = {
        id: '1',
        image: 'fkjdlkjfksl',
        name:  'Categoria teste',
    }

    public async getCategoriesByIds(ids: string[]): Promise<ICategoryOutput[]> {
        return new Array<ICategoryOutput>(this.mockCategory)
    }

    public async getAllCategories(): Promise<ICategoryOutput[]> {
        return new Array<ICategoryOutput>(this.mockCategory)
    }

    public async getCategoryById(id: string): Promise<ICategoryOutput> {
        return this.mockCategory
    }

    public async createCategory(category: ICreateCategoryInput): Promise<ICategoryOutput> {
        return this.mockCategory
    }

    public async updateCategory(id: string, category: IUpdateCategoryInput): Promise<ICategoryOutput> {
        return this.mockCategory
    }

    public async deleteCategory(id: string): Promise<void> {
        return
    }

}
