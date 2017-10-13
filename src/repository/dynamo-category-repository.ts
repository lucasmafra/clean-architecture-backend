import { CategoryRepositoryGateway } from 'core'

export class DynamoCategoryRepository implements CategoryRepositoryGateway.ICategoryRepository {

    private mockCategory = {
        description: 'jfldfjklfds',
        id: '1',
        image: 'fkjdlkjfksl',
        name:  'Categoria teste',
    }

    public async getCategoriesByIds(ids: string[]): Promise<CategoryRepositoryGateway.ICategoryOutput[]> {
        return new Array<CategoryRepositoryGateway.ICategoryOutput>(this.mockCategory)
    }

    public async getAllCategories(): Promise<CategoryRepositoryGateway.ICategoryOutput[]> {
        return new Array<CategoryRepositoryGateway.ICategoryOutput>(this.mockCategory)
    }

    public async getCategoryById(id: string): Promise<CategoryRepositoryGateway.ICategoryOutput | undefined> {
        return this.mockCategory
    }

    public async createCategory(category: CategoryRepositoryGateway.ICreateCategoryInput): Promise<CategoryRepositoryGateway.ICategoryOutput> {
        return this.mockCategory
    }

    public async updateCategory(id: string, category: CategoryRepositoryGateway.IUpdateCategoryInput): Promise<CategoryRepositoryGateway.ICategoryOutput> {
        return this.mockCategory
    }

    public async deleteCategory(id: string): Promise<void> {
        return Promise.resolve()
    }

}
