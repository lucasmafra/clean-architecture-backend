export interface IStoreManagerDataSource {
    getStoreManagersByIds(ids: string[]): Promise<IStoreManagerOutput[]>
    getAllStoreManagers(): Promise<IStoreManagerOutput[]>
    getStoreManagerById(id: string): Promise<IStoreManagerOutput>
    getStoreManagersByStoreId(storeId: string): Promise<IStoreManagerOutput[]>
    getStoreManagersByCompanyId(companyId: string): Promise<IStoreManagerOutput[]>
    createStoreManager(input: ICreateStoreManagerInput): Promise<IStoreManagerOutput>
    updateStoreManager(id: string, input: IUpdateStoreManagerInput): Promise<IStoreManagerOutput>
    deleteStoreManager(id: string): Promise<void>
}

export interface IStoreManagerOutput {
    id: string
    email: string
    name: string
}

export interface ICreateStoreManagerInput {
    email: string
    name: string
}

export interface IUpdateStoreManagerInput {
    name?: string
}
