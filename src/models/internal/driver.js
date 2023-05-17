import { required, maxLength } from "@vuelidate/validators";

export default class Driver {
  constructor() {
    this.id = null;
    this.cnh = null;
    this.person = null;
    this.credential = null;
    this.name = null;
    this.status = true;
  }
  validations() {
    return {
      cnh: {
        required,
        maxLength: maxLength(150),
      },
      person: {
        required,
      },
    };
  }
  toJson() {
    return {
      id: this.id,
      cnh: this.cnh,
      person: this.person,
      status: this.status,
    };
  }
  fromJson(data) {
    this.id = data.id;
    this.cnh = data.cnh;
    this.person = data.person;
    this.status = data.status;
    this.name = data.name;
    this.credential = data.credential;
  }
}
