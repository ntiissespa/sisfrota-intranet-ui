import AuthService from "../auth/auth_service";

export default class BreakdownService extends AuthService {
  constructor() {
    super("avarias");
  }
}
