import axios from "axios";

export function getCep(address) {
  return new Promise((resolve, reject) => {
    let msgErro = "Endereço não encontrado!";

    axios({
      method: "get",
      url: `https://viacep.com.br/ws/${address.cep}/json/`,
    })
      .then((res) => {
        if (res.data.erro) {
          reject(msgErro);
        } else {
          let data = res.data;

          address.cep = data.cep;
          address.district = data.bairro;
          address.city = data.localidade;
          address.street = data.logradouro;
          address.state = data.uf;
          address.complement = data.complemento;

          resolve(address);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(msgErro);
      });
  });
}
