import jwtDecode from "jwt-decode";
import Config from "../../service/auth/config.js";

export default class Token extends Config {

  /** token expirado **/   
  checkExpiredToken() {
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    let decodeToken = jwtDecode(token.access_token);

    let d1 = new Date(Date.now());
    let d2 = new Date(decodeToken.exp * 1000);

    if (d1 >= d2) {
      return true;
    } else {
      return false;
    }
  }

  /** limpar token **/ 
  clearAccessToken() {
    sessionStorage.removeItem("token");
  }

  /** armazenaToken **/ 
  storeToken(token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  /** retorna token **/
  token() {
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    return token.access_token;
  }

  /** decodificando jwt **/
  jwtDecode() {
    let payLoad = jwtDecode(this.token());
    return payLoad;
  }
  
  /** token valido **/
  checkToken() {
    return new Promise((resolve, reject) => {
      const msg = "Sessão Expirada, saia e entre novamente!";
      if (sessionStorage.getItem("token")) {
        if (this.checkExpiredToken() === true) {
          sessionStorage.removeItem("token");
          reject(msg);
        } else {
          resolve();
        }
      } else {
        reject(msg);
      }
    });
  }

}