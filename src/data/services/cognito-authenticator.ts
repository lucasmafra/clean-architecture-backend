import { AuthenticatorServiceGateway } from 'core'

export class CognitoAuthenticatorService implements AuthenticatorServiceGateway.IAuthenticatorService  {

    public async signinAsCustomer(email: string, password: string): Promise<AuthenticatorServiceGateway.IMyTopShopToken> {
        return Promise.resolve({
            value: 'jfdlksjfkls',
        })
    }

    public async signinAsAdmin(email: string, password: string): Promise<AuthenticatorServiceGateway.IMyTopShopToken> {
        return Promise.resolve({
            value: 'jfdlksjfkls',
        })
    }

    public async signinAsCompanyOwner(email: string, password: string): Promise<AuthenticatorServiceGateway.IMyTopShopToken> {
        return Promise.resolve({
            value: 'jfdlksjfkls',
        })
    }

    public async signinAsStoreManager(email: string, password: string): Promise<AuthenticatorServiceGateway.IMyTopShopToken> {
        return Promise.resolve({
            value: 'jfdlksjfkls',
        })
    }

    public async confirmCompanyOwner(email: string): Promise<void> {
        return Promise.resolve()
    }
}
