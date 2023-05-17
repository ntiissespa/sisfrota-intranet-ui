<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '420px' }"
    header="Formulário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="description">Descrição</label>
      <InputText
        id="description"
        v-model="v$.obj.description.$model"
        maxlength="100"
        placeholder="Digite a descrição"
        :class="{ 'p-invalid': submitted && v$.obj.description.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.obj.description.$invalid"
        >Descrição é obrigatória.</small
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
import Document from "../../../models/internal/document";

//Services
import DocumentService from "../../../service/document/document_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Document(),
      submitted: false,
      service: new DocumentService(),
    };
  },
  mounted() {},
  validations() {
    return {
      obj: new Document().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.document.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.document.dialogForm = value;
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
      this.obj = new Document();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;
    },
  },
};
</script>
<style scoped></style>
