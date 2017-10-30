import { ICreateSubcategoryInput, ISubcategoryDataSource, IUpdateSubcategoryInput } from 'core'
import { v4 } from 'uuid'
import { OSDynamo } from './base-dynamo'
import { TABLE_NAMES } from './constants'

interface IDynamoSubcategory {
    id: string
    name: string
    image: string
    categoryId: string
}

const Subcategory = OSDynamo.define<IDynamoSubcategory>(TABLE_NAMES.Subcategory)

export class SubcategoryDatabase implements ISubcategoryDataSource {

    public async getSubcategoriesByIds(ids: string[]) {
        return Subcategory.batchGet(ids)
    }

    public async getAllSubcategories() {
        return Subcategory.scan()
    }

    public async getSubcategoryById(id: string) {
        return Subcategory.get(id)
    }

    public async getSubcategoriesByCategoryId(categoryId: string) {
        const results = await Subcategory.query('categoryId = :value', { ':value': categoryId }, 'categoryId-id-index')
        if (results.length) {
            return Subcategory.batchGet(results.map( (result) => result.id))
        }
        return new Array<IDynamoSubcategory>()
    }

    public async createSubcategory(subcategory: ICreateSubcategoryInput) {
        const id = v4()
        return Subcategory.put({ id, ...subcategory })
    }

    public async updateSubcategory(id: string, subcategory: IUpdateSubcategoryInput) {
        return Subcategory.update(subcategory, id)
    }

    public async deleteSubcategory(id: string) {
        return Subcategory.delete(id)
    }

}
