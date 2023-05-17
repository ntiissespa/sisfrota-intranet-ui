import { required, maxLength } from "@vuelidate/validators";
export default class Vehicle {
  constructor() {
    this.id = null;
    this.brand = null;
    this.model = null;
    this.year = null;
    this.fabricationYear = null;
    this.renavam = null;
    this.plate = null;
    this.amountPeople = null;
    this.color = null;
    this.fuel = null;
    this.km = null;
    this.status = true;
  }
  validations() {
    return {
      brand: {
        required,
        maxLength: maxLength(100),
      },
      model: {
        maxLength: maxLength(100),
        required,
      },
      year: {
        required,
      },
      fabricationYear: {
        required,
      },
      renavam: {
        maxLength: maxLength(11),
        required,
      },
      plate: {
        maxLength: maxLength(11),
        required,
      },
      color: {
        maxLength: maxLength(50),
        required,
      },
      amountPeople: {
        required,
      },
      fuel: {
        required,
      },
      km: {
        required,
      },
      status: {
        required,
      },
    };
  }
}
