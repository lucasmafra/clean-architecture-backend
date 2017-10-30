import { AuthorizerDataSource, IMyTopShopCredential, MyTopShopRole } from 'core'

export class CognitoAuthorizer extends AuthorizerDataSource  {

  public async getCredential(): Promise<IMyTopShopCredential> {
      return Promise.resolve({
        role: MyTopShopRole.Admin,
        userId: '1',
      })
  }

}
