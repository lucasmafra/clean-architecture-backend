import { ICompanyOwnerDataSource, ICompanyOwnerOutput, ICreateCompanyOwnerInput, IUpdateCompanyOwnerInput } from 'core'

export class CompanyOwnerDatabase implements ICompanyOwnerDataSource {

    private mockCompanyOwner = {
        id: '1',
        name: 'Teste', // razao social
        email: 'teste@teste.com',
        cpf: '10260485837',
        companyId: '123', // nome fantasia
    }

    public async getCompanyOwnersByIds(ids: string[]): Promise<ICompanyOwnerOutput[]> {
        return new Array<ICompanyOwnerOutput>(this.mockCompanyOwner)
    }

    public async getAllCompanyOwners(): Promise<ICompanyOwnerOutput[]> {
        return new Array<ICompanyOwnerOutput>(this.mockCompanyOwner)
    }

    public async getCompanyOwnerById(id: string): Promise<ICompanyOwnerOutput> {
        return this.mockCompanyOwner
    }

    public async createCompanyOwner(companyOwner: ICreateCompanyOwnerInput): Promise<ICompanyOwnerOutput> {
        return this.mockCompanyOwner
    }

    public async updateCompanyOwner(id: string, companyOwner: IUpdateCompanyOwnerInput): Promise<ICompanyOwnerOutput> {
        return this.mockCompanyOwner
    }

    public async deleteCompanyOwner(id: string): Promise<void> {
        return
    }
}
