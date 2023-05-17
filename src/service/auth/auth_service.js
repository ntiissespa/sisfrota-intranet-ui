import axios from "axios";
import Token from "../../utilities/jwt/Token.js";

export default class AuthService extends Token {
  
  constructor(url, accessMethods = { c: true, r: true, u: true, d: true }) {
    super();
    (this.accessMethods = accessMethods), (this.pathUrl = url);
  }

  static getAcessMethods() {
    return {
      c: false,
      r: false,
      u: false,
      d: false,
    };
  }

  findAll() {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.r) {
        axios({
          method: "get",
          url: this.api_url + this.pathUrl,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        }).then((res) => resolve(res.data));
      } else {
        reject("Acesso negado!");
      }
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.r) {
        axios({
          method: "get",
          url: this.api_url + this.pathUrl + "/" + id,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        }).then((res) => resolve(res.data)).catch((err) => reject(err));
      } else {
        reject("Acesso negado!");
      }
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.c) {
        const result = axios({
          method: "post",
          url: this.api_url + this.pathUrl,
          data: data,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.u) {
        const result = axios({
          method: "put",
          url: this.api_url + this.pathUrl + "/" + data.id,
          data: data,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.d) {
        const result = axios({
          method: "delete",
          url: this.api_url + this.pathUrl + "/" + id,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  execute(method, params, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: this.api_url + this.pathUrl + params,
        withCredentials: true,
        data: data,
        headers: {
          Authorization: "Bearer " + this.token(),
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  
  executePermitAll(method, params, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: this.api_url + this.pathUrl + params,
        data: data,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  login(login, password) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: this._api_url + "oauth/token",
        withCredentials: true,
        data:
          "username=" +
          login +
          "&password=" +
          password +
          "&grant_type=password",
        headers: {
          Authorization: "Basic c2VzcGF3ZWI6IyQzJHBAY3QxJCM=",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          new Token().storeToken(res.data);
          resolve();
        })
        .catch((err) => {
          const jsonStr = JSON.stringify(err);
          const jsonError = JSON.parse(jsonStr);
          reject(jsonError);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      let token = sessionStorage.getItem("token");
      token = JSON.parse(token);
      axios({
        method: "delete",
        url: this._api_url + "tokens/revoke",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      })
        .then(() => {
          new Token().clearAccessToken();
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  refresh_token() {
    return axios({
      method: "post",
      url: this._api_url + "oauth/token",
      withCredentials: true,
      data: "grant_type=refresh_token",
      headers: {
        Authorization: "Basic c2VzcGF3ZWI6IyQzJHBAY3QxJCM=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
