import Person from "./person";

export default class Users {
  constructor() {
    this.id = null;
    this.login = null;
    this.password = null;
    this.email = null;
    this.status = true;
    this.dtCreated = null;
    this.dtUpdate = null;
    this.person = new Person();
    this.group = [];
  }
}
