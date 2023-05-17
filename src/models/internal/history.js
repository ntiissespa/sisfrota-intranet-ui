import { required } from "@vuelidate/validators";

export default class History {
  constructor() {
    this.id = null;
    this.sector = null;
    this.origin = null;
    this.destiny = null;
    this.dtInit = null;
    this.dtFinish = null;
    this.kmInit = null;
    this.kmFinish = null;
  }
  validations() {
    return {
      sector: {
        required,
      },
      origin: {
        required,
      },
      destiny: {
        required,
      },
      dtInit: {
        required,
      },
      dtFinish: {
        required,
      },
      kmInit: {
        required,
      },
      kmFinish: {
        required,
      },
    };
  }
}
