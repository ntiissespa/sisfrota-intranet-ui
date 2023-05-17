<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '800px' }"
    header="Formulário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <fieldset-driver :obj="obj" />
    <br />
    <Fieldset legend="HISTÓRICO DA REVISÃO" :toggleable="true">
      <div class="grid" v-for="history in obj.historys" :key="history.id">
        <div class="col-12 md:col-6">
          <p><b>Origem: </b>{{ history.origin }}</p>
        </div>
        <div class="col-12 md:col-6">
          <p><b>Destino: </b>{{ history.destiny }}</p>
        </div>
        <div class="col-12 md:col-6">
          <p><b>Setor: </b>{{ history.sector.name }}</p>
        </div>
        <div class="col-12 md:col-6">
          <p>
            <b>Data de Saída: </b>{{ $DateTime.formatarDate(history.dtInit) }}
          </p>
        </div>
        <div class="col-12 md:col-6">
          <p>
            <b>Data de Retorno: </b
            >{{ $DateTime.formatarDate(history.dtFinish) }}
          </p>
        </div>
        <div class="col-12 md:col-6">
          <p><b>Km Inicial: </b>{{ history.kmInit }}</p>
        </div>
        <div class="col-12 md:col-6">
          <p><b>Km Final: </b>{{ history.kmFinish }}</p>
        </div>
        <div class="col-12">
          <hr />
        </div>
      </div>
    </Fieldset>
    <br />
    <fieldset-vehicle :obj="obj" />
    <br />
    <fieldset-qtd-fuel :obj="obj" />
    <br />
    <fieldset-document :obj="obj" />
    <br />
    <fieldset-accessory :obj="obj" />
    <br />
    <fieldset-breakdown :obj="obj" />
    <br />
    <fieldset-tire :obj="obj" />
    <br />
    <fieldset-images :obj="obj" />
    <template #footer>
      <Button
        label="Fechar"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
    </template>
  </Dialog>
</template>

<script>
//models
import Revision from "../../../../models/internal/revision";

//Service
import DriverService from "../../../../service/driver/driver_service";

//Components
import FieldsetImages from "../fieldsets/fieldset-images.vue";
import FieldsetDriver from "../fieldsets/fieldset-driver.vue";
import FieldsetVehicle from "../fieldsets/fieldset-vehicle.vue";
import FieldsetQtdFuel from "../fieldsets/fieldset-qtd-fuel.vue";

import { convertCondition } from "../../../../models/enums/condition";
import FieldsetDocument from "../fieldsets/fieldset-document.vue";
import FieldsetAccessory from "../fieldsets/fieldset-accessory.vue";
import FieldsetBreakdown from "../fieldsets/fieldset-breakdown.vue";
import FieldsetTire from "../fieldsets/fieldset-tire.vue";

export default {
  props: ["objSelected"],
  components: {
    FieldsetImages,
    FieldsetDriver,
    FieldsetVehicle,
    FieldsetQtdFuel,
    FieldsetDocument,
    FieldsetAccessory,
    FieldsetBreakdown,
    FieldsetTire,
  },
  data() {
    return {
      driverService: new DriverService(),
      obj: new Revision(),

      convertCondition,
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.checklist.dialogDetails;
        if (value) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.checklist.dialogDetails = value;
      },
    },
  },
  methods: {
    getData() {
      this.obj = this.objSelected;
      if (this.obj.driver.name == null) {
        this.findDriver();
      }
    },
    findDriver() {
      this.driverService.findById(this.obj.driver.id).then((data) => {
        this.obj.driver = data;
      });
    },
    hideDialog() {
      this.visibleDialog = false;
      this.obj = new Revision();
    },
  },
};
</script>

<style></style>
