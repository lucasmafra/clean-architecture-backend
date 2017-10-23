export interface IStoreRepository {
    getStoresByIds(ids: string[]): Promise<IStoreOutput[]>
    getAllStores(): Promise<IStoreOutput[]>
    getStoreById(id: string): Promise<IStoreOutput>
    createStore(store: ICreateStoreInput): Promise<IStoreOutput>
    updateStore(id: string, store: IUpdateStoreInput): Promise<IStoreOutput>
    deleteStore(id: string): Promise<void>
}

export interface IStoreOutput {
    id: string
    name: string
    cnpj: string
    phone: string
    zipCode: string
    address: string
    addressNumber: string
    addressComplement: string
    locationDetail: string
    city: string
    state: string
    site: string
    description: string
    totalSales: number
    totalCampaigns: number
    totalFollowers: number
    logoPhoto?: string
}

export interface ICreateStoreInput {
    name: string
    cnpj: string
    phone: string
    zipCode: string
    address: string
    addressNumber: string
    addressComplement: string
    locationDetail: string
    city: string
    state: string
    site: string
    description: string
    totalSales: number
    totalCampaigns: number
    totalFollowers: number
    logoPhoto?: string
}

export interface IUpdateStoreInput {
    name?: string
    cnpj?: string
    phone?: string
    zipCode?: string
    address?: string
    addressNumber?: string
    addressComplement?: string
    locationDetail?: string
    city?: string
    state?: string
    site?: string
    description?: string
    totalSales?: number
    totalCampaigns?: number
    totalFollowers?: number
    logoPhoto?: string
}
