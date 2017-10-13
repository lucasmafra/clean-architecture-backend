import { CompanyRepositoryGateway } from 'core'

export class DynamoCompany implements CompanyRepositoryGateway.ICompanyRepository {

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

    public async getCompanyById(id: string): Promise <CompanyRepositoryGateway.ICompanyOutput | undefined> {
        return this.mockCompany
    }

    public async getCompaniesByIds(ids: string[]): Promise <CompanyRepositoryGateway.ICompanyOutput[]> {
        return new Array<CompanyRepositoryGateway.ICompanyOutput>(this.mockCompany)
    }

    public async getAllCompanies(): Promise <CompanyRepositoryGateway.ICompanyOutput[]> {
        return new Array<CompanyRepositoryGateway.ICompanyOutput>(this.mockCompany)
    }

    public async deleteCompany(id: string): Promise <void> {
        return Promise.resolve()
    }

    public async createCompany(company: CompanyRepositoryGateway.ICreateCompanyInput): Promise <CompanyRepositoryGateway.ICompanyOutput > {
        return this.mockCompany
    }

    public async updateCompany(id: string, company: CompanyRepositoryGateway.IUpdateCompanyInput): Promise <CompanyRepositoryGateway.ICompanyOutput>{
        return this.mockCompany
    }

}
