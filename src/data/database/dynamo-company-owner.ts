import { CompanyOwnerRepositoryGateway } from 'core'

export class DynamoCompanyOwner implements CompanyOwnerRepositoryGateway.ICompanyOwnerRepository {

    private mockCompanyOwner = {
        id: '1',
        name: 'Teste', // razao social
        email: 'teste@teste.com',
        cpf: '10260485837',
        companyId: '123', // nome fantasia
    }

    public async getCompanyOwnersByIds(ids: string[]): Promise<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput[]> {
        return new Array<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput>(this.mockCompanyOwner)
    }

    public async getAllCompanyOwners(): Promise<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput[]> {
        return new Array<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput>(this.mockCompanyOwner)
    }

    public async getCompanyOwnerById(id: string): Promise<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput | undefined> {
        return this.mockCompanyOwner
    }

    public async createCompanyOwner(companyOwner: CompanyOwnerRepositoryGateway.ICreateCompanyOwnerInput): Promise<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput> {
        return this.mockCompanyOwner
    }

    public async updateCompanyOwner(id: string, companyOwner: CompanyOwnerRepositoryGateway.IUpdateCompanyOwnerInput): Promise<CompanyOwnerRepositoryGateway.ICompanyOwnerOutput> {
        return this.mockCompanyOwner
    }

    public async deleteCompanyOwner(id: string): Promise<void> {
        return Promise.resolve()
    }
}
