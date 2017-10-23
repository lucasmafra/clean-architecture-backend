import { IAdminGetCompanyOwnerDetailOutput } from 'core'
import { Injector } from 'di-typescript'
import { Field, ObjectType } from 'graphql-decorator'
import { AdminGetCompanyOwnerDetail } from 'presentation/use-case-factories/admin'

@ObjectType()
export class CompanyOwnerDetailForAdmin implements IAdminGetCompanyOwnerDetailOutput {

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public cpf: string

    @Field()
    public email: string

}

export function adminGetCompanyOwnerDetail(id: string): Promise<CompanyOwnerDetailForAdmin>  {
    const useCase = new Injector().get(AdminGetCompanyOwnerDetail).build()
    return useCase.execute({id})
}
