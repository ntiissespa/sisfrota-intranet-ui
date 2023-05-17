import AuthService from "../auth/auth_service";

export default class TireService extends AuthService {
  constructor() {
    super("pneu");
  }
}
