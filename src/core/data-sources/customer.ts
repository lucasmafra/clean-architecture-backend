export interface ICustomerDataSource {
    getCustomersByIds(ids: string[]): Promise<ICustomerOutput[]>
    getAllCustomers(): Promise<ICustomerOutput[]>
    getCustomerById(id: string): Promise<ICustomerOutput>
    createCustomer(customer: ICreateCustomerInput): Promise<ICustomerOutput>
    updateCustomer(id: string, customer: IUpdateCustomerInput): Promise<ICustomerOutput>
    deleteCustomer(id: string): Promise<void>
    getCustomerByEmail(email: string): Promise<ICustomerOutput>
}

export enum CustomerAccountProvider {
    Facebook = 'facebook',
    Google = 'google',
    Cognito = 'cognito',
}

export interface ICustomerOutput {
    id: string
    email: string
    name: string
    city: string
    state: string
    country: string
    accountProviders: CustomerAccountProvider[]
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
    accountProvider: CustomerAccountProvider
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
    accountProviders?: CustomerAccountProvider[]
    profilePicture?: string
}
