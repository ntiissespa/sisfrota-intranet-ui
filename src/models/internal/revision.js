import { required } from "@vuelidate/validators";
import Vehicle from "./vehicle";
import Driver from "./driver";
export default class Revision {
  constructor() {
    this.id = null;
    this.vehicle = new Vehicle();
    this.driver = new Driver();
    this.documents = [];
    this.accessories = [];
    this.historys = [];
    this.tireConditions = [];
    this.breakdowns = [];
    this.qtdFuelInit = null;
    this.qtdFuelFinish = null;
    this.obs = null;
    this.date = null;
  }

  toJson() {
    return {
      id: this.id,
      vehicle: this.vehicle,
      driver: this.driver.toJson(),
      documents: this.documents,
      accessories: this.accessories,
      historys: this.historys,
      tireConditions: this.tireConditions,
      breakdowns: this.breakdowns,
      qtdFuelInit: this.qtdFuelInit,
      qtdFuelFinish: this.qtdFuelFinish,
      obs: this.obs,
      date: this.date,
    };
  }

  fromJson(json) {
    this.id = json.id;
    this.vehicle = json.vehicle;
    this.driver.fromJson(json.driver);
    this.documents = json.documents;
    this.accessories = json.accessories;
    this.historys = json.historys;
    this.tireConditions = json.tireConditions;
    this.breakdowns = json.breakdowns;
    this.qtdFuelInit = json.qtdFuelInit;
    this.qtdFuelFinish = json.qtdFuelFinish;
    this.obs = json.obs;
    this.date = json.date;
  }

  validations() {
    return {
      vehicle: {
        id: {
          required,
        },
      },
      driver: {
        id: {
          required,
        },
      },
      qtdFuelInit: {
        required,
      },
      qtdFuelFinish: {
        required,
      },
      documents: {},
      date: {
        required,
      },
    };
  }

  setDriverToJson() {
    let d = new Driver();
    this.driver = d.fromJson(this.driver);
    this.driver = d.toJson();
  }
}
