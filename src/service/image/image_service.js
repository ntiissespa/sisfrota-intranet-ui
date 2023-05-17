import axios from "axios";
import AuthService from "../auth/auth_service";

export default class ImageService extends AuthService {
  constructor() {
    super("imagem");
  }

  upload(file, id) {
    return axios({
      method: "POST",
      url: `${this.api_url}imagem/upload/${id}`,
      withCredentials: true,
      data: { File: file },
      headers: {
        Authorization: "Bearer " + this.token(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  download(id) {
    window.open(`${this.api_url}imagem/download/${id}`);
  }
}
