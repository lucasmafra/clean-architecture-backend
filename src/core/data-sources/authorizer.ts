import { ErrorType, MyTopShopError } from 'core'

export abstract class AuthorizerDataSource {

    public abstract getCredential(): Promise<IMyTopShopCredential>
    public async authorizeByAllowedRoles(allowedRoles: MyTopShopRole[]): Promise<IMyTopShopCredential> {
        try {
            const credential = await this.getCredential()
            for (const allowedRole of allowedRoles) {
                if (credential.role === allowedRole) {
                    return Promise.resolve(credential)
                }
            }
            throw new MyTopShopError(ErrorType.Unauthorized)
        } catch (err) {
            throw err
        }
    }

    public async authorizeByForbiddenRoles(forbiddenRoles: MyTopShopRole[]): Promise<IMyTopShopCredential> {
        try {
            const credential = await this.getCredential()
            for (const forbiddenRole of forbiddenRoles) {
                if (credential.role === forbiddenRole) {
                    throw new MyTopShopError(ErrorType.Unauthorized)
                }
            }
            return Promise.resolve(credential)
        } catch (err) {
            throw err
        }
    }

    public async authorizeByUserId(id: string): Promise<IMyTopShopCredential> {
        try {
            const credential = await this.getCredential()
            if (id !== credential.userId) {
                throw new MyTopShopError(ErrorType.Unauthorized)
            }
            return Promise.resolve(credential)
        } catch (err) {
            throw err
        }
    }
}

export interface IMyTopShopCredential {
    role: MyTopShopRole
    userId: string
}

export enum MyTopShopRole {
    Admin, CompanyOwner, StoreManager, Customer, Anonymous,
}
