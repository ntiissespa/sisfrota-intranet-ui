<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '800px' }"
    header="Formulário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="grid">
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="brand">Marca</label>
          <InputText
            id="brand"
            v-model="v$.obj.brand.$model"
            maxlength="100"
            placeholder="Digite a Marca"
            :class="{ 'p-invalid': submitted && v$.obj.brand.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.brand.$invalid"
            >Marca é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="model">Modelo</label>
          <InputText
            id="model"
            v-model="v$.obj.model.$model"
            maxlength="100"
            placeholder="Digite a Modelo"
            :class="{ 'p-invalid': submitted && v$.obj.model.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.model.$invalid"
            >Modelo é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="renavam">RENAVAM</label>
          <InputText
            id="renavam"
            v-model="v$.obj.renavam.$model"
            maxlength="11"
            placeholder="Digite a RENAVAM"
            :class="{ 'p-invalid': submitted && v$.obj.renavam.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.renavam.$invalid"
            >RENAVAM é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="color">Cor</label>
          <InputText
            id="color"
            v-model="v$.obj.color.$model"
            maxlength="50"
            placeholder="Digite a Cor"
            :class="{ 'p-invalid': submitted && v$.obj.color.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.color.$invalid"
            >Cor é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="plate">Placa</label>
          <InputText
            id="plate"
            v-model="v$.obj.plate.$model"
            maxlength="11"
            placeholder="Digite a Placa"
            :class="{ 'p-invalid': submitted && v$.obj.plate.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.plate.$invalid"
            >Placa é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="fuel">Tipo de Combustível</label>
          <Dropdown
            id="fuel"
            v-model="v$.obj.fuel.$model"
            :options="FuelType"
            optionLabel="name"
            optionValue="key"
            placeholder="Selecione o tipo de combustível"
            :class="{ 'p-invalid': submitted && v$.obj.fuel.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.fuel.$invalid"
            >Tipo de Combustível é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="year">Ano</label>
          <InputText
            id="year"
            v-model="v$.obj.year.$model"
            type="number"
            placeholder="Digite a Ano"
            :class="{ 'p-invalid': submitted && v$.obj.year.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.year.$invalid"
            >Ano é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="fabricationYear">Ano de Fabricação</label>
          <InputText
            id="fabricationYear"
            v-model="v$.obj.fabricationYear.$model"
            type="number"
            placeholder="Digite o Ano de Fabricação"
            :class="{
              'p-invalid': submitted && v$.obj.fabricationYear.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.obj.fabricationYear.$invalid"
            >Ano de Fabricação é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="km">KM</label>
          <InputText
            id="km"
            v-model="v$.obj.km.$model"
            type="number"
            placeholder="Digite a KM"
            :class="{ 'p-invalid': submitted && v$.obj.km.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.km.$invalid"
            >KM é obrigatório.</small
          >
        </div>
      </div>
      <div class="col-12 md:col-6">
        <div class="field">
          <label for="amountPeople">Quantidade de pessoas</label>
          <InputText
            id="amountPeople"
            v-model="v$.obj.amountPeople.$model"
            type="number"
            placeholder="Digite a Quantidade de pessoas"
            :class="{
              'p-invalid': submitted && v$.obj.amountPeople.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.obj.amountPeople.$invalid"
            >Quantidade de pessoas é obrigatório.</small
          >
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.obj.$invalid)"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button p-button-text"
        @click="hideDialog"
      />
    </template>
  </Dialog>
</template>
<script>
//Models
import Vehicle from "../../../models/internal/vehicle";
import { FuelType } from "../../../models/enums/fuel_type";

//Services
import VehicleService from "../../../service/vehicle/vehicle_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Vehicle(),
      submitted: false,
      service: new VehicleService(),
      FuelType,
    };
  },
  mounted() {},
  validations() {
    return {
      obj: new Vehicle().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.vehicle.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.vehicle.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.obj.id) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return;
      }
    },
    create() {
      this.submitted = true;
      this.service
        .create(this.obj)
        .then((data) => {
          if (data.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro cadastrado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    update() {
      this.submitted = true;
      this.service
        .update(this.obj)
        .then((data) => {
          if (data.status === 200) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro alterado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    hideDialog() {
      this.obj = new Vehicle();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;
      // if (this.obj.credential !== null) this.findPerson();
    },
  },
};
</script>
<style scoped></style>
