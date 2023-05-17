export function gerarUrl(params) {
  //Pages Size
  params.size = params.rows;
  const queryParams = params
    ? Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&")
    : "";
  return queryParams;
}
