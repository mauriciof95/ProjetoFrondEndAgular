export class LocalStorageUtils{
  public getToken() : string{
    return localStorage.getItem('token');
  }

  public setToken(token: string){
    localStorage.setItem('token', token);
  }

  public clearToken(){
    localStorage.removeItem('token');
  }
}
