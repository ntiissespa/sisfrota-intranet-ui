import { required, maxLength } from "@vuelidate/validators";

export default class Breakdown {
  constructor() {
    this.id = null;
    this.description = null;
  }
  validations() {
    return {
      description: {
        required,
        maxLength: maxLength(150),
      },
    };
  }
}
