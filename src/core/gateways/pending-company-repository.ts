export namespace PendingCompanyRepositoryGateway {

    export interface IPendingCompanyRepository {
        getPendingCompanyById(id: string): Promise <IPendingCompanyOutput | undefined>
        getPendingCompaniesByIds(ids: string[]): Promise <IPendingCompanyOutput[]>
        getAllPendingCompanies(): Promise <IPendingCompanyOutput[]>
        createPendingCompany(company: ICreatePendingCompanyInput): Promise <IPendingCompanyOutput>
        approvePendingCompany(id: string): Promise<IPendingCompanyOutput>
        deletePendingCompany(id: string): Promise<void>
    }

    export interface IPendingCompanyOutput {
        id: string
        companyOwnerName: string
        companyOwnerCpf: string
        companyOwnerEmail: string
        tradeName: string
        companyName: string
        cnpj: string
        phone: string
        zipCode: string
        address: string
        addressNumber: string
        addressComplement: string
        city: string
        state: string
        adminApproved: boolean
    }

    export interface ICreatePendingCompanyInput {
        companyOwnerName: string
        companyOwnerCpf: string
        companyOwnerEmail: string
        tradeName: string
        companyName: string
        cnpj: string
        phone: string
        zipCode: string
        address: string
        addressNumber: string
        addressComplement: string
        city: string
        state: string
        adminApproved: boolean
    }

}
