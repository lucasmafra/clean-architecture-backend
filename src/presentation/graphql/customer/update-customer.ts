import { ICustomerUpdateProfileInput, ICustomerUpdateProfileOutput } from 'core'
import { Injector } from 'di-typescript'
import { Field, InputObjectType, List, ObjectType } from 'graphql-decorator'
import { CustomerUpdateProfile } from 'presentation/use-case-factories/customer'
import { CustomerAccountProviderType, TimestampType } from '../custom-types'

@InputObjectType()
export class UpdateCustomerProfileInput implements ICustomerUpdateProfileInput {

    @Field()
    public name?: string

    @Field()
    public city?: string

    @Field()
    public state?: string

    @Field()
    public country?: string

    @List() @Field({type: CustomerAccountProviderType})
    public accountProviders?: any

    @Field()
    public gender?: string

    @Field({ type: TimestampType})
    public dateOfBirth?: any

    @Field()
    public profilePicture?: string
}

@ObjectType()
export class UpdateCustomerProfileOutput implements ICustomerUpdateProfileOutput {

    @Field()
    public id: string

    @Field()
    public email: string

    @Field()
    public name: string

    @Field()
    public city: string

    @Field()
    public state: string

    @Field()
    public country: string

    @List() @Field({ type: CustomerAccountProviderType })
    public accountProviders: any

    @Field()
    public gender?: string

    @Field({ type: TimestampType})
    public dateOfBirth?: any

    @Field()
    public profilePicture?: string
}

export function customerUpdateProfile(input: ICustomerUpdateProfileInput ): Promise<UpdateCustomerProfileOutput> {
    const useCase = new Injector().get(CustomerUpdateProfile).build()
    return useCase.execute(input)
}
