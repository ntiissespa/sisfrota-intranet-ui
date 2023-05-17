<template>
  <Fieldset legend="QUANTIDADE DE COMBUSTÍVEL" :toggleable="true">
    <div class="grid">
      <div class="col-12 md:col-6">
        <p>
          <b>Quantidade de Combustível Inicial: </b
          >{{ convertQtdFuel(obj.qtdFuelInit) }}
        </p>
      </div>
      <div class="col-12 md:col-6">
        <p>
          <b> Quantidade de Combustível Final: </b
          >{{ convertQtdFuel(obj.qtdFuelFinish) }}
        </p>
      </div>
    </div>
  </Fieldset>
</template>

<script>
import { convertQtdFuel } from "../../../../models/enums/qtd_fuel";
import { convertCondition } from "../../../../models/enums/condition";

export default {
  props: ["obj"],
  data() {
    return {
      convertQtdFuel,
      convertCondition,
    };
  },
};
</script>

<style></style>
