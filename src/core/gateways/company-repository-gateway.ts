export namespace CompanyRepositoryGateway {

    export interface ICompanyRepository {
        getCompanyById(id: string): Promise <ICompanyOutput | undefined>
        getCompaniesByIds(ids: string[]): Promise <ICompanyOutput[]>
        getAllCompanies(): Promise <ICompanyOutput[]>
        deleteCompany(id: string): Promise <void>
        createCompany(company: ICreateCompanyInput): Promise <ICompanyOutput>
        updateCompany(id: string, company: IUpdateCompanyInput): Promise <ICompanyOutput>
    }

    export interface ICompanyOutput {
        id: string
        tradeName: string // nome fantasia
        companyName: string // razao social
        cnpj: string
        phone: string
        zipCode: string
        address: string
        addressNumber: string
        addressComplement: string
        city: string
        state: string
        logoPhoto?: string
        coverPhoto?: string
    }

    export interface ICreateCompanyInput {
        id: string
        tradeName: string // nome fantasia
        companyName: string // razao social
        cnpj: string
        phone: string
        zipCode: string
        address: string
        addressNumber: string
        addressComplement: string
        city: string
        state: string
        logoPhoto?: string
        coverPhoto?: string
    }

    export interface IUpdateCompanyInput {
        tradeName?: string // nome fantasia
        companyName?: string // razao social
        cnpj?: string
        phone?: string
        zipCode?: string
        address?: string
        addressNumber?: string
        addressComplement?: string
        city?: string
        state?: string
        logoPhoto?: string
        coverPhoto?: string
    }
}
