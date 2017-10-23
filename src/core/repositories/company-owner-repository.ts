export interface ICompanyOwnerRepository {
    getCompanyOwnersByIds(ids: string[]): Promise<ICompanyOwnerOutput[]>
    getAllCompanyOwners(): Promise<ICompanyOwnerOutput[]>
    getCompanyOwnerById(id: string): Promise<ICompanyOwnerOutput>
    createCompanyOwner(companyOwner: ICreateCompanyOwnerInput): Promise<ICompanyOwnerOutput>
    updateCompanyOwner(id: string, companyOwner: IUpdateCompanyOwnerInput): Promise<ICompanyOwnerOutput>
    deleteCompanyOwner(id: string): Promise<void>
}

export interface ICompanyOwnerOutput {
    id: string
    name: string
    cpf: string
    email: string
    companyId: string
}

export interface ICreateCompanyOwnerInput {
    name: string
    cpf: string
    email: string
}

export interface IUpdateCompanyOwnerInput {
    name?: string
    cpf?: string
}
