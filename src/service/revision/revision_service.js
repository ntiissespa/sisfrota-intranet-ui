import AuthService from "../auth/auth_service";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class RevisionService extends AuthService {
  constructor() {
    super("revisao");
  }

  findByVehicleId(params) {
    let queryParams = gerarUrl(params);
    return this.execute("GET", `?${queryParams}`).then((res) => res.data);
  }
}
