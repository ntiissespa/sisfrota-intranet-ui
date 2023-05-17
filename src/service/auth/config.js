export default class Config {
  constructor() {
    this._api_url =
      process.env.NODE_ENV === "production"
        ? window.location.origin + "/sisfrota-api/"
        : "http://localhost:8080/sisfrota-api/";

    this._api_url_intra =
      process.env.NODE_ENV === "production"
        ? window.location.origin + "/intranet-api/"
        : "http://localhost:8080/intranet-api/";
  }

  get api_url() {
    return this._api_url;
  }

  set api_url(value) {
    this._api_url = value;
  }

  get api_url_intra() {
    return this._api_url_intra;
  }

  set api_url_intra(value) {
    this._api_url_intra = value;
  }
}
