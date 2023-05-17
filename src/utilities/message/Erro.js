import Token from "../jwt/Token.js";

export default function msgErro(response) {
  this.mensagemDesenvolvedor = response.response.data[0].mensagemDesenvolvedor;
  this.mensagemUsuario = response.response.data[0].mensagemUsuario;
  let data = response.response.data[0];
  let status = response.response.status;

  if (status >= 400) {
    this.$toast.add({
      severity: "error",
      summary: "Alerta de Erro.",
      detail: data.mensagemUsuario,
      life: 6000,
    });
  }

  let containing = this.mensagemDesenvolvedor.indexOf("NegocioException");
  let foreignKey = this.mensagemDesenvolvedor.indexOf(
    "java.sql.SQLIntegrityConstraintViolationException"
  );
  if (containing > -1) {
    let negocio = this.mensagemDesenvolvedor.replace(
      "br.gov.pa.saude.api.exceptionhandler.NegocioException:",
      ""
    );
    //this.mensagemUsuario = negocio
    this.$toast.add({
      severity: "error",
      summary: "Alerta de Erro.",
      detail: negocio,
      life: 6000,
    });
  }
  if (foreignKey > -1) {
    this.$toast.add({
      severity: "error",
      summary: "Alerta de Erro.",
      detail: "Não é possivel excluir registros cujo estão dados atrelados.",
      life: 6000,
    });
  }

  if (new Token.checkToken()) {
    let message = "Secção expirada, efetue login novamente.";
    this.$toast.add({
      severity: "warn",
      summary: "Atenção.",
      detail: message,
      life: 6000,
    });
  }
}
