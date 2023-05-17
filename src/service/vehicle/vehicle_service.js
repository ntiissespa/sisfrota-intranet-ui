import AuthService from "../auth/auth_service";

export default class VehicleService extends AuthService {
  constructor() {
    super("veiculo");
  }

  changeStatus(id) {
    return this.execute("PUT", "/alterar-status/" + id);
  }
}
