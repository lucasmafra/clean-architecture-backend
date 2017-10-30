import { ICategoryDataSource, ICreateCategoryInput, IUpdateCategoryInput } from 'core'
import { v4 } from 'uuid'
import { OSDynamo } from './base-dynamo'
import { TABLE_NAMES } from './constants'

interface IDynamoCategory {
    id: string
    name: string
    image: string
}

const Category = OSDynamo.define<IDynamoCategory>(TABLE_NAMES.Category)

export class CategoryDatabase implements ICategoryDataSource {

    public async getCategoriesByIds(ids: string[]) {
        return Category.batchGet(ids)
    }

    public getAllCategories() {
        return Category.scan()
    }

    public getCategoryById(id: string) {
        return Category.get(id)
    }

    public createCategory(category: ICreateCategoryInput) {
        const id = v4()
        return Category.put({ id, ...category })
    }

    public updateCategory(id: string, category: IUpdateCategoryInput) {
        return Category.update(category, id)
    }

    public deleteCategory(id: string) {
        return Category.delete(id)
    }

}
