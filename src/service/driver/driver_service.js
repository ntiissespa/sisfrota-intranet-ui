import axios from "axios";
import AuthService from "../auth/auth_service";

export default class DriverService extends AuthService {
  constructor() {
    super("motorista");
  }

  changeStatus(id) {
    return this.execute("PUT", "/status/" + id);
  }

  upload(file, id) {
    return axios({
      method: "POST",
      url: `${this.api_url}motorista/upload/${id}`,
      withCredentials: true,
      data: { File: file },
      headers: {
        Authorization: "Bearer " + this.token(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  download(id) {
    window.open(`${this.api_url}motorista/download/${id}`);
  }
}
