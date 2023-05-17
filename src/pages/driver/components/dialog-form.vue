<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '500px' }"
    header="Formulário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="credential">Matricula</label>
      <InputText
        id="credential"
        placeholder="Digite a matricula"
        v-model="obj.credential"
        @change="findPerson"
        required
      />
      <div v-if="obj.person">
        <br />
        <Chip :label="obj.name" :image="obj.url" class="mr-2 mb-2" />
      </div>
    </div>
    <div class="field">
      <label for="cnh">CNH</label>
      <InputText
        id="cnh"
        v-model="v$.obj.cnh.$model"
        maxlength="100"
        placeholder="Digite a CNH"
        :class="{ 'p-invalid': submitted && v$.obj.cnh.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.obj.cnh.$invalid"
        >CNH é obrigatória.</small
      >
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
import Driver from "../../../models/internal/driver";

//Services
import DriverService from "../../../service/driver/driver_service";
import PersonService from "../../../service/person/person_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Driver(),
      submitted: false,
      service: new DriverService(),
      personService: new PersonService(),
    };
  },
  mounted() {},
  validations() {
    return {
      obj: new Driver().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.driver.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.driver.dialogForm = value;
      },
    },
  },
  methods: {
    findPerson() {
      this.personService
        .findByCpfOrCredential(this.obj.credential)
        .then((data) => {
          this.obj.person = data.id;
          this.obj.credential = data.credential;
          this.obj.name = data.name;
        });
    },
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
        .create(this.obj.toJson())
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
        .update(this.obj.toJson())
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
      this.obj = new Driver();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      console.log(this.objSelected);
      this.obj.fromJson(this.objSelected);
    },
  },
};
</script>
<style scoped></style>
