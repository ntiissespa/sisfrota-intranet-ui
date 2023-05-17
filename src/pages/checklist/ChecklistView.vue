<template>
  <Toast />
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Checklist Veicular">
        <Toolbar class="p-mb-4">
          <template #start>
            <Button label="Novo" icon="pi pi-plus" @click="showCreate()" />
            <Button
              label="Exportar"
              class="ml-2 p-button-success"
              icon="pi pi-download"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>
        <DataTable
          :value="list"
          :lazy="true"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100, 500, 1000]"
          v-model:filters="filters"
          ref="dt"
          class="p-datatable-sm"
          dataKey="id"
          :totalRecords="totalRecords"
          :loading="loading"
          :filters="filters"
          @page="onPage($event)"
          @filter="onFilter($event)"
          filterDisplay="row"
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Exibindo de {first} a {last} no total de {totalRecords} registros."
        >
          <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>
          <Column header="#" field="id" filterMatchMode="startsWith" ref="id">
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="number"
                placeholder="Digite o protocolo"
                v-model="filterModel.value"
                @change="filterCallback()"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column
            header="Veículo"
            field="vehicleId"
            filterMatchMode="startsWith"
            ref="vehicleId"
          >
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                placeholder="Selecionte um veículo"
                :options="vehicles"
                optionLabel="plate"
                optionValue="id"
                v-model="filterModel.value"
                @change="filterCallback()"
              />
            </template>
            
          </Column>
          <Column
            header="Data"
            field="date"
            filterMatchMode="startsWith"
            ref="date"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="date"
                v-model="filterModel.value"
                @change="filterCallback()"
              />
            </template>
            <template #body="slotProps">
              {{ $DateTime.formatarDate(slotProps.data.date) }}
            </template>
          </Column>
          <Column header="Combustível Inicial" field="qtdFuelInit">
            <template #body="slotProps">
              {{ convertQtdFuel(slotProps.data.qtdFuelInit) }}
            </template>
          </Column>
          <Column header="Combustível Final" field="qtdFuelFinish">
            <template #body="slotProps">
              {{ convertQtdFuel(slotProps.data.qtdFuelFinish) }}
            </template>
          </Column>
          <Column header="Observação" field="obs">
            <template #body="slotProps">
              {{ slotProps.data.obs }}
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
                icon="pi pi-upload"
                class="p-button-rounded p-button-info mr-2"
                @click="showUpload(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA ENVIAR FOTOS'"
              />
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-secondary mr-2"
                @click="showDetails(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA VER DETALHES'"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mr-2"
                @click="showRemove(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA DELETAR'"
              />
            </template>
          </Column>
        </DataTable>
      </Panel>
    </div>
  </div>

  <dialog-form :objSelected="obj" />
  <dialog-details :objSelected="obj" />
  <dialog-upload :revision="obj" />

  <ConfirmDialog />
</template>

<script>
//models

import { convertQtdFuel } from "../../models/enums/qtd_fuel";
//Services
import VehicleService from "../../service/vehicle/vehicle_service";
import RevisionService from "../../service/revision/revision_service";
//components
import DialogForm from "./components/dialogs/dialog-form.vue";
import DialogDetails from "./components/dialogs/dialog-details.vue";
import DialogUpload from "./components/dialogs/dialog-upload.vue";
import Revision from "../../models/internal/revision";

export default {
  components: {
    DialogForm,
    DialogDetails,
    DialogUpload,
  },
  data() {
    return {
      loading: false,
      list: [],
      obj: new Revision(),
      vehicleService: new VehicleService(),
      vehicles: [],
      vehicleSelected: null,
      service: new RevisionService(),
      lazyParams: {},
      filters: {
        id: { value: "", matchMode: "contains" },
        vehicleId: { value: "", matchMode: "contains" },
        date: { value: "", matchMode: "contains" },
      },
      totalRecords: null,
      convertQtdFuel,
      filterId: null,
    };
  },
  created() {
    if (!sessionStorage.getItem("token")) {
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
    this.lazyParams = {
      first: 0,
      rows: this.$refs.dt.rows,
      sortField: null,
      sortOrder: null,
      id: "",
      status: "",
    };
    this.findVehicles();
  },
  methods: {
    findVehicles() {
      this.vehicleService.findAll().then((data) => (this.vehicles = data));
    },
    findById() {
      if (this.filterId) {
        this.service
          .findById(this.filterId)
          .then((data) => (this.list = [data]))
          .catch((err) => {
            console.error(err);
            this.list = [];
          });
      } else {
        this.list = [];
      }
    },
    loadLazyData() {
      this.loading = true;
      this.service.findByVehicleId(this.lazyParams).then((data) => {
        this.list = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    },
    showCreate() {
      this.obj = new Revision();
      this.$store.state.views.checklist.dialogForm = true;
    },
    showUpload(obj) {
      this.obj = new Revision();
      this.obj.fromJson(obj);
      this.$store.state.views.checklist.dialogUpload = true;
    },
    showUpdate(obj) {
      this.obj = new Revision();
      this.obj.fromJson(obj);
      this.$store.state.views.checklist.dialogForm = true;
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
              this.loadLazyData();
            })
            .catch((error) => {
              this.$msgErro(error);
            });
        },
      });
    },

    onPage(event) {
      this.lazyParams.rows = event.rows;
      this.lazyParams.page = event.page;
      this.loadLazyData();
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    showDetails(obj) {
      this.obj = obj;
      this.$store.state.views.checklist.dialogDetails = true;
    },
    onFilter() {
      this.lazyParams.page = 0;
      this.lazyParams.id =
        this.filters.id.value != null ? this.filters.id.value : "";
      this.lazyParams.vehicleId =
        this.filters.vehicleId.value != null
          ? this.filters.vehicleId.value
          : "";
      this.lazyParams.date =
        this.filters.date.value != null ? this.filters.date.value : "";
      this.loadLazyData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>
