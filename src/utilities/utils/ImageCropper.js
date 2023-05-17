export default class ImageCropper {
  async urlToFile(file) {
    return fetch(file.base64)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((buf) => {
        return new File([buf], file.name, { type: file.type });
      });
  }
}
