import { required } from "@vuelidate/validators";
export default class Gender {
  constructor() {
    this.id = null;
    this.name = null;
    this.description = null;
  }
  validations() {
    return {
      name: {
        required,
      },
    };
  }
}
