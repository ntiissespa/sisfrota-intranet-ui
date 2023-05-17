import axios from "axios";
import AuthService from "../auth/auth_service";

export default class PersonService extends AuthService {
  findByCpfOrCredential(key) {
    return axios({
      method: "GET",
      url: this.api_url_intra + "person/search?keyParam=" + key,
    }).then((res) => res.data);
  }

  findById(id) {
    return axios({
      method: "get",
      url: this.api_url_intra + "person/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }
}
