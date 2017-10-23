import { IAdminGetCompanyOwnersOutput } from 'core'
import { Injector } from 'di-typescript'
import { Field, ObjectType } from 'graphql-decorator'
import { AdminGetCompanyOwners } from 'presentation/use-case-factories/admin'

@ObjectType()
export class CompanyOwnerForAdmin implements IAdminGetCompanyOwnersOutput {

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public cpf: string

    @Field()
    public email: string
}

export function adminGetCompanyOwners(): Promise<CompanyOwnerForAdmin[]> {
    const useCase = new Injector().get(AdminGetCompanyOwners).build()
    return useCase.execute(null)
}
