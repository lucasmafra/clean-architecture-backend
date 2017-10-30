export interface IAuthenticatorDataSource {
    signinAsCustomer(email: string, password: string): Promise<IMyTopShopToken>
    signinAsAdmin(email: string, password: string): Promise<IMyTopShopToken>
    signinAsCompanyOwner(email: string, password: string): Promise<IMyTopShopToken>
    signinAsStoreManager(email: string, password: string): Promise<IMyTopShopToken>
    confirmCompanyOwner(email: string): Promise<void>
}

export interface IMyTopShopToken {
    value: string
}
