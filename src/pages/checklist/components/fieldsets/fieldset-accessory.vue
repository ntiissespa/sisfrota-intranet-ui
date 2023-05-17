<template>
  <Fieldset legend="ACESSÓRIOS" :toggleable="true">
    <div class="grid">
      <div
        class="col-12 md:col-6"
        v-for="accessory in obj.accessories"
        :key="accessory.id"
      >
        <p>
          <b>Acessórios: </b>{{ accessory.description }}
          <Badge
            :value="convertCondition(accessory.condition).value"
            :severity="convertCondition(accessory.condition).color"
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
