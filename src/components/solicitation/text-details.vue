<template>
  <div class="grid">
    <div class="col-12">
      Em
      <strong>{{ $DateTime.formatarDateTime24hours(objSelected.date) }}</strong
      >,
      <strong v-if="!objSelected.requester"> Servidor </strong>
      <strong v-else>{{ objSelected.requester }}</strong>
      pertencente ao setor
      <strong>{{ objSelected.acronym }}</strong
      >.<br />
      Solicitou:
      <strong>{{ objSelected.description }}</strong>
    </div>
    <div class="col-12 md-6">
      <strong>Situação: </strong
      ><span
        :class="'solicitacao-badge status-' + objSelected.status.toLowerCase()"
        >{{ objSelected.status }}</span
      >
    </div>
    <div class="col-12 md-6">
      <strong>Prioridade: </strong
      ><span :class="'solicitacao-badge status-' + objSelected.priority">{{
        $Util.formatBoolean(objSelected.priority)
      }}</span>
    </div>
    <div class="col-12" v-if="objSelected.operator != null">
      <image-user :objSelected="objSelected" />
    </div>
  </div>
</template>
<script>
// components
import ImageUser from "./image-user.vue";

export default {
  props: ["objSelected"],
  components: { ImageUser },
};
</script>
