import Address from "./address";
import Gender from "./gender";
import { required, minLength } from "@vuelidate/validators";

export default class Person {
  constructor() {
    this.id = null;
    this.name = null;
    this.credential = null;
    this.cpf = null;
    this.contact = null;
    this.image = null;
    this.dtBirdate = null;
    this.dtCreated = null;
    this.dtUpdate = null;
    this.address = new Address();
    this.gender = new Gender();
  }
  validations() {
    return {
      name: {
        required,
      },
      credential: {
        required,
      },
      cpf: {
        required,
      },
      contact: {
        required,
      },
      dtBirdate: {
        required,
      },
      address: {
        cep: {
          required,
        },
        street: {
          required,
        },
        district: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
          minLength: minLength(2),
        },
        number: {
          required,
        },
      },
      gender: {
        name: {
          required,
        },
      },
    };
  }
}
