import { CustomerAccountProvider, ICreateCustomerInput, ICustomerDataSource, ICustomerOutput, IUpdateCustomerInput } from 'core'

export class CustomerDatabase implements ICustomerDataSource {

    private mockCustomer: ICustomerOutput = {
        id: 'jfkajdla',
        email: 'jfkajdla',
        name: 'jfkajdla',
        city: 'jfkajdla',
        state: 'jfkajdla',
        country: 'jfkajdla',
        accountProviders: [CustomerAccountProvider.Cognito],
    }

    public async getCustomersByIds(ids: string[]): Promise<ICustomerOutput[]> {
        return new Array<ICustomerOutput>(this.mockCustomer)
    }
    public async getAllCustomers(): Promise<ICustomerOutput[]> {
        return new Array<ICustomerOutput>(this.mockCustomer)
    }
    public async getCustomerById(id: string): Promise<ICustomerOutput> {
        return this.mockCustomer
    }
    public async createCustomer(customer: ICreateCustomerInput): Promise<ICustomerOutput> {
        return this.mockCustomer
    }
    public async updateCustomer(id: string, customer: IUpdateCustomerInput): Promise<ICustomerOutput> {
        return this.mockCustomer
    }
    public async deleteCustomer(id: string): Promise<void> {
        return
    }
    public async getCustomerByEmail(email: string): Promise<ICustomerOutput> {
        return this.mockCustomer
    }

}
