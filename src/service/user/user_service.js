import axios from "axios";
import AuthService from "../auth/auth_service";

export default class UserService extends AuthService {
  findById(id) {
    return axios({
      method: "get",
      url: this.api_url_intra + "user/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  findByGroup(groupId) {
    return axios({
      method: "GET",
      url: this.api_url_intra + "user/group/" + groupId,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }
}
