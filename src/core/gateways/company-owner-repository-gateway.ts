export namespace CompanyOwnerRepositoryGateway {

    export interface ICompanyOwnerRepository {
        getCompanyOwnersByIds(ids: string[]): Promise<ICompanyOwnerOutput[]>
        getAllCompanyOwners(): Promise<ICompanyOwnerOutput[]>
        getCompanyOwnerById(id: string): Promise<ICompanyOwnerOutput | undefined>
        createCompanyOwner(companyOwner: ICreateCompanyOwnerInput): Promise<ICompanyOwnerOutput>
        updateCompanyOwner(id: string, companyOwner: IUpdateCompanyOwnerInput): Promise<ICompanyOwnerOutput>
        deleteCompanyOwner(id: string): Promise<void>
        getPendingCompanyOwnersByIds(ids: string[]): Promise<IPendingCompanyOwnerOutput[]>
        getAllPendingCompanyOwners(): Promise<IPendingCompanyOwnerOutput[]>
        getPendingCompanyOwnerByEmail(email: string): Promise<IPendingCompanyOwnerOutput | undefined>
        deletePendingCompanyOwner(email: string): Promise<void>
        createPendingCompanyOwner(companyOwner: ICreatePendingCompanyOwnerInput): Promise<IPendingCompanyOwnerOutput>
    }

    export interface ICompanyOwnerOutput {
        id: string
        name: string
        cpf: string
        email: string
        companyId: string
    }

    export interface ICreateCompanyOwnerInput {
        id: string
        name: string
        cpf: string
        email: string
    }

    export interface IUpdateCompanyOwnerInput {
        name?: string
        cpf?: string
    }

    export interface IPendingCompanyOwnerOutput {
        name: string
        cpf: string
        email: string
        companyId: string
    }

    export interface ICreatePendingCompanyOwnerInput {
        name: string
        cpf: string
        email: string
    }

    export interface IUpdatePendingCompanyOwnerInput {
        name?: string
        cpf?: string
    }

}
