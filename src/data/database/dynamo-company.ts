import {
    ICompanyOutput,
    ICompanyRepository,
    ICreateCompanyInput,
    ICreatePendingCompanyInput,
    IPendingCompanyOutput,
    IUpdateCompanyInput,
 } from 'core'

export class DynamoCompany implements ICompanyRepository {

    private mockCompany = {
        id: '123',
        companyName: 'FakeCompany Ltda', // razao social
        cnpj: '43984302984302',
        tradeName: 'Fake Company', // nome fantasia
        phone: '31221321',
        zipCode: '343223432',
        address: 'dfdsfsfd',
        addressNumber: 'fsfsfds',
        addressComplement: 'fdfsdfs',
        city: 'fdfsd',
        state: 'fdfsfs',
    }

    private mockPendingCompany = {
        id: 'lkjfkldsjflksjfkls',
        companyOwnerName: 'lkjfkldsjflksjfkls',
        companyOwnerCpf: 'lkjfkldsjflksjfkls',
        companyOwnerEmail: 'lkjfkldsjflksjfkls',
        tradeName: 'lkjfkldsjflksjfkls',
        companyName: 'lkjfkldsjflksjfkls',
        cnpj: 'lkjfkldsjflksjfkls',
        phone: 'lkjfkldsjflksjfkls',
        zipCode: 'lkjfkldsjflksjfkls',
        address: 'lkjfkldsjflksjfkls',
        addressNumber: 'lkjfkldsjflksjfkls',
        addressComplement: 'lkjfkldsjflksjfkls',
        city: 'lkjfkldsjflksjfkls',
        state: 'lkjfkldsjflksjfkls',
        adminApproved: false,
    }

    public async getCompanyById(id: string): Promise <ICompanyOutput> {
        return this.mockCompany
    }

    public async getCompaniesByIds(ids: string[]): Promise <ICompanyOutput[]> {
        return new Array<ICompanyOutput>(this.mockCompany)
    }

    public async getAllCompanies(): Promise <ICompanyOutput[]> {
        return new Array<ICompanyOutput>(this.mockCompany)
    }

    public async deleteCompany(id: string): Promise <void> {
        return
    }

    public async createCompany(company: ICreateCompanyInput): Promise <ICompanyOutput > {
        return this.mockCompany
    }

    public async updateCompany(id: string, company: IUpdateCompanyInput): Promise <ICompanyOutput> {
        return this.mockCompany
    }

    public async getPendingCompanyById(id: string): Promise <IPendingCompanyOutput> {
        return this.mockPendingCompany
    }

    public async getPendingCompaniesByIds(ids: string[]): Promise <IPendingCompanyOutput[]> {
        return new Array<IPendingCompanyOutput>()
    }

    public async getAllPendingCompanies(): Promise <IPendingCompanyOutput[]> {
        return new Array<IPendingCompanyOutput>()
    }

    public async createPendingCompany(company: ICreatePendingCompanyInput): Promise <IPendingCompanyOutput> {
        return {
            id: '1',
            companyOwnerName: '1',
            companyOwnerCpf: '1',
            companyOwnerEmail: '1',
            tradeName: '1',
            companyName: '1',
            cnpj: '1',
            phone: '1',
            zipCode: '1',
            address: '1',
            addressNumber: '1',
            addressComplement: '1',
            city: '1',
            state: '1',
            adminApproved: false,
        }
    }

    public async approvePendingCompany(id: string): Promise<void> {
        return
    }

    public async rejectPendingCompany(id: string): Promise<void> {
        return
    }

}
