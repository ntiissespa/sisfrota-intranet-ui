import AuthService from "../auth/auth_service";

export default class DocumentService extends AuthService {
  constructor() {
    super("documento");
  }
}
