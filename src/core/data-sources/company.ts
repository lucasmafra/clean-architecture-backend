export interface ICompanyDataSource {
    getCompanyById(id: string): Promise <ICompanyOutput>
    getCompaniesByIds(ids: string[]): Promise <ICompanyOutput[]>
    getAllCompanies(): Promise <ICompanyOutput[]>
    deleteCompany(id: string): Promise <void>
    createCompany(company: ICreateCompanyInput): Promise <ICompanyOutput>
    updateCompany(id: string, company: IUpdateCompanyInput): Promise <ICompanyOutput>
    getPendingCompanyById(id: string): Promise <IPendingCompanyOutput>
    getPendingCompaniesByIds(ids: string[]): Promise <IPendingCompanyOutput[]>
    getAllPendingCompanies(): Promise <IPendingCompanyOutput[]>
    createPendingCompany(company: ICreatePendingCompanyInput): Promise <IPendingCompanyOutput>
    approvePendingCompany(id: string): Promise<void>
    rejectPendingCompany(id: string): Promise<void>
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
