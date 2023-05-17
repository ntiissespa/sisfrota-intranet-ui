<template>
  <Fieldset legend="CONDIÇÃO DOS PNEUS" :toggleable="true">
    <div class="grid">
      <div
        class="col-12 md:col-6"
        v-for="tire in obj.tireConditions"
        :key="tire.id"
      >
        <p>
          <b>{{ tire.description }}: </b
          ><Badge
            :value="convertCondition(tire.condition).value"
            :severity="convertCondition(tire.condition).color"
            class="mr-2"
          ></Badge>
        </p>
      </div>
    </div>
  </Fieldset>
</template>

<script>
import { convertCondition } from "../../../../models/enums/condition";
export default {
  props: ["obj"],
  data() {
    return {
      convertCondition,
    };
  },
};
</script>

<style></style>
