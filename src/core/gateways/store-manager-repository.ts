export namespace StoreManagerRepositoryGateway {

    export interface IStoreManagerRepository {
        getStoreManagersByIds(ids: string[]): Promise<IStoreManagerOutput[]>
        getAllStoreManagers(): Promise<IStoreManagerOutput[]>
        getStoreManagerById(id: string): Promise<IStoreManagerOutput | undefined>
        getStoreManagersByStoreId(storeId: string): Promise<IStoreManagerOutput[]>
        getStoreManagersByCompanyId(companyId: string): Promise<IStoreManagerOutput[]>
        createStoreManager(StoreManager: ICreateStoreManagerInput): Promise<IStoreManagerOutput>
        updateStoreManager(id: string, StoreManager: IUpdateStoreManagerInput): Promise<IStoreManagerOutput>
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

}
