export namespace CustomerRepositoryGateway {

    export interface ICustomerRepository {
        getCustomersByIds(ids: string[]): Promise<ICustomerOutput[]>
        getAllCustomers(): Promise<ICustomerOutput[]>
        getCustomerById(id: string): Promise<ICustomerOutput | undefined>
        createCustomer(Customer: ICreateCustomerInput): Promise<ICustomerOutput>
        updateCustomer(id: string, Customer: IUpdateCustomerInput): Promise<ICustomerOutput>
        deleteCustomer(id: string): Promise<void>
        getCustomerByEmail(email: string): Promise<ICustomerOutput | undefined>
    }

    export interface IAccountProvider {
        value: string
    }

    export interface ICustomerOutput {
        id: string
        email: string
        name: string
        city: string
        state: string
        country: string
        accountProviders: IAccountProvider[]
        gender?: string
        dateOfBirth?: Date
        profilePicture?: string
    }

    export interface ICreateCustomerInput {
        id: string
        email: string
        name: string
        city: string
        state: string
        country: string
        accountProvider: IAccountProvider
        gender?: string
        dateOfBirth?: Date
        profilePicture?: string
    }

    export interface IUpdateCustomerInput {
        name?: string
        country?: string
        state?: string
        city?: string
        gender?: string
        dateOfBirth?: Date
        accountProviders?: IAccountProvider[]
        profilePicture?: string
    }

}
