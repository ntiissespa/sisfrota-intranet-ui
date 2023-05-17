<template>
  <Toast />
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Motoristas">
        <Toolbar class="p-mb-4">
          <template #start>
            <Button label="Novo" icon="pi pi-plus" @click="showCreate()" />
          </template>
          <template #end>
            <div
              class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
            >
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar..."
                />
              </span>
            </div>
          </template>
        </Toolbar>
        <DataTable
          ref="dt"
          dataKey="id"
          class="p-datatable-sm"
          :value="list"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :filters="filters"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Exibindo de {first} a {last} no total de {totalRecords} motoristas."
          :loading="loading"
        >
          <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>
          <Column field="url">
            <template #body="slotProps">
              <img
                :src="slotProps.data.url"
                class="circle-image"
                v-if="slotProps.data.url"
              />
              <img
                src="../../../public/images/sespa/user.png"
                class="circle-image"
                v-else
              />
            </template>
          </Column>
          <Column header="#" field="id" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column header="Nome" field="name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Matricula" field="credential" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.credential }}
            </template>
          </Column>
          <Column header="Status" field="status" :sortable="true">
            <template #body="slotProps">
              <span
                :class="'badge status-' + slotProps.data.status"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'Clique para alterar Status'"
                style="cursor: pointer"
                >{{ $Util.formatAtivo(slotProps.data.status) }}</span
              >
            </template>
          </Column>
          <Column header="Ações">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="showUpdate(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA ATUALIZAR'"
              />
              <Button
                icon="pi pi-camera"
                class="p-button-rounded p-button-info mr-2"
                @click="showUpload(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA ENVIAR FOTO'"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mr-2"
                @click="showRemove(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA REMOVER'"
              />
            </template>
          </Column>
        </DataTable>
      </Panel>
    </div>
  </div>

  <dialog-form :objSelected="obj" @findAll="findAll" />
  <dialog-upload :objSelected="obj" @findAll="findAll"></dialog-upload>

  <ConfirmDialog />
</template>

<script>
import { FilterMatchMode } from "primevue/api";
//models
import Driver from "../../models/internal/driver";
//Services
import DriverService from "../../service/driver/driver_service";
//components
import DialogForm from "./components/dialog-form.vue";
import DialogUpload from "./components/dialog-upload.vue";

export default {
  components: {
    DialogForm,
    DialogUpload,
  },
  data() {
    return {
      loading: false,
      list: [],
      obj: new Driver(),
      filters: {},
      service: new DriverService(),
    };
  },
  created() {
    if (sessionStorage.getItem("token")) {
      this.initFilters();
    } else {
      this.$toast.add({
        severity: "warn",
        summary: "Atenção!",
        detail: "Usuário desconectado! Você precisa fazer login novamente",
        life: 6000,
      });
      window.location.replace(this.$UrlIntranet);
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    showCreate() {
      this.obj = new Driver();
      this.$store.state.views.driver.dialogForm = true;
    },
    showUpdate(obj) {
      this.obj = obj;
      this.$store.state.views.driver.dialogForm = true;
    },
    showUpload(obj) {
      this.obj = obj;
      this.$store.state.views.driver.dialogUpload = true;
    },
    showRemove(obj) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.service
            .delete(obj.id)
            .then((data) => {
              this.$msgSuccess(data);
              this.findAll();
            })
            .catch((error) => {
              this.$msgErro(error);
            });
        },
      });
    },
    findAll() {
      this.loading = true;
      this.service.findAll().then((data) => {
        this.list = data;
        this.loading = false;
      });
    },
    changeStatus(obj) {
      this.service.changeStatus(obj.id).then((res) => {
        if (res.status === 204) {
          this.findAll();
        }
      });
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>
