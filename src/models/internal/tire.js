import { required, maxLength } from "@vuelidate/validators";
export default class Tire {
  constructor() {
    this.id = null;
    this.description = null;
    this.condition = true;
  }

  validations() {
    return {
      description: {
        required,
        maxLength: maxLength(100),
      },
      condition: {
        required,
      },
    };
  }
}
