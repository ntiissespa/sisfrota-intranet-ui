import Moment from "moment";

export default class DateTime {
  formatarDateTime(date) {
    Moment.locale("pt-br");
    if (date) {
      return Moment(date).utc().format("DD/MM/YYYY h:mm:ss a");
    }
    return;
  }
  formatarDate(date) {
    Moment.locale("pt-br");
    if (date) {
      return Moment(date).utc().format("DD/MM/YYYY");
    }
    return;
  }
  formatarDateInput(date) {
    // Moment.locale("pt-br");
    if (date) {
      return Moment(date).utc().format("YYYY-MM-DD");
    }
    return;
  }
  formatarDateTime24hours(date) {
    Moment.locale("pt-br");
    if (date) {
      return Moment(date).format("DD/MM/YYYY HH:mm:ss");
    }
    return;
  }

  formateToString(date) {
    Moment.locale("pt-br");
    if (date) {
      return Moment(date).utc().format("DD-MM-YYYY HH:mm:ss");
    }
    return;
  }

  formateToHash(date) {
    Moment.locale("pt-br");
    if (date) {
      return Moment(date).utc().format("DDMMYYYYHHmmss");
    }
    return;
  }
}
