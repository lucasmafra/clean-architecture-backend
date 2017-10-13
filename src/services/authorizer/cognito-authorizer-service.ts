import { AuthorizerServiceGateway } from 'core'

export class CognitoAuthorizerService extends AuthorizerServiceGateway.BaseAuthorizerService  {

  public async getCredential(): Promise<AuthorizerServiceGateway.IMyTopShopCredential> {
      return Promise.resolve({
        role: AuthorizerServiceGateway.MyTopShopRole.Admin,
        userId: '1',
      })
  }

}
