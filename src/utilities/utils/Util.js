export default class Util {
  formatBoolean(value) {
    if (value === true) return "SIM";
    return "NÃO";
  }
  formatAtivo(value) {
    if (value === true) return "ATIVO";
    return "INATIVO";
  }
  formatCondition(value) {
    if (value === true) return "BOM";
    return "RUIM";
  }
  formatStatus(situacao) {
    switch (situacao) {
      case "EM_ABERTO":
        return "Em Aberto";
      case "FINALIZADO":
        return "Finalizado";
    }
  }
}
