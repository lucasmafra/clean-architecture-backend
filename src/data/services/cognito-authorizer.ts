import { AuthorizerService, IMyTopShopCredential, MyTopShopRole } from 'core'

export class CognitoAuthorizer extends AuthorizerService  {

  public async getCredential(): Promise<IMyTopShopCredential> {
      return Promise.resolve({
        role: MyTopShopRole.Admin,
        userId: '1',
      })
  }

}
