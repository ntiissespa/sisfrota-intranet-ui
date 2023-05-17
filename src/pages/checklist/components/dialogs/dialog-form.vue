<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '950px' }"
    header="Formulário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <Fieldset legend="BOLETIM DE TRÁFEGO">
      <div class="grid">
        <div class="col-12 md:col-4 field">
          <label for="">Motoristas</label>
          <Dropdown
            :options="drivers"
            optionLabel="name"
            optionValue="id"
            placeholder="Selecione um motorista"
            :filter="true"
            v-model="v$.obj.driver.id.$model"
            :class="{ 'p-invalid': submitted && v$.obj.driver.id.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.driver.id.$invalid"
            >Motorista é obrigatório.</small
          >
        </div>
        <div class="col-12 md:col-4 field">
          <label for="">Veículos</label>
          <Dropdown
            :options="vehicles"
            optionLabel="plate"
            placeholder="Selecione um veículo"
            filter="true"
            v-model="v$.obj.vehicle.$model"
            :class="{ 'p-invalid': submitted && v$.obj.vehicle.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.vehicle.$invalid"
            >Veículo é obrigatório.</small
          >
        </div>
        <div class="col-12 md:col-4 field">
          <label for="">Data</label>
          <InputText
            type="date"
            v-model="v$.obj.date.$model"
            :class="{ 'p-invalid': submitted && v$.obj.date.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.date.$invalid"
            >Data é obrigatória.</small
          >
        </div>
        <br />
        <Fieldset legend="Histórico da Revisão" class="col-12">
          <div class="grid" v-for="history in obj.historys" :key="history.id">
            <div class="col-12 md:col-4 field">
              <label for="origin">Local de Saída</label>
              <InputText
                id="origin"
                placeholder="Digite o Local de Saída"
                v-model="history.origin"
              />
            </div>
            <div class="col-12 md:col-4 field">
              <label for="origin">Local de Destino</label>
              <InputText
                id="origin"
                placeholder="Digite o Local de Destino"
                v-model="history.destiny"
              />
            </div>
            <div class="col-12 md:col-4 field">
              <label for="origin">Setor</label>
              <AutoComplete
                v-model="history.sector"
                :suggestions="sectors"
                @complete="searchSectors"
                :virtualScrollerOptions="{ itemSize: 38 }"
                field="name"
                value="id"
                placeholder="Digite nome ou sigla do setor"
                :class="{
                  'p-invalid': submitted && !history.sector,
                }"
                dropdown
              />
              <small class="p-error" v-if="submitted && !history.sector"
                >Setor é obrigatório.</small
              >
            </div>
            <div class="col-12 md:col-3 field">
              <label for="dtInit">Data e hora de saída</label>
              <InputText
                type="datetime-local"
                id="dtInit"
                v-model="history.dtInit"
                :class="{
                  'p-invalid': submitted && !history.dtInit,
                }"
              />
              <small class="p-error" v-if="submitted && !history.dtInit"
                >Data e hora de saída é obrigatório.</small
              >
            </div>
            <div class="col-12 md:col-3 field">
              <label for="dtFinish">Data e hora de retorno</label>
              <InputText
                type="datetime-local"
                id="dtFinish"
                v-model="history.dtFinish"
                :class="{
                  'p-invalid': submitted && !history.dtFinish,
                }"
              />
              <small class="p-error" v-if="submitted && !history.dtFinish"
                >Data e hora de retorno é obrigatório.</small
              >
            </div>
            <div class="col-12 md:col-3 field">
              <label for="kmInit">KM inicial</label>
              <InputText
                type="number"
                id="kmInit"
                placeholder="Digite o KM inicial"
                v-model="history.kmInit"
                :class="{
                  'p-invalid': submitted && !history.kmInit,
                }"
              />
              <small class="p-error" v-if="submitted && !history.kmInit"
                >KM inicial é obrigatório.</small
              >
            </div>
            <div class="col-12 md:col-3 field">
              <label for="kmFinish">KM Final</label>
              <InputText
                type="number"
                id="kmFinish"
                placeholder="Digite o KM final"
                v-model="history.kmFinish"
                :class="{
                  'p-invalid': submitted && !history.kmFinish,
                }"
              />
              <small class="p-error" v-if="submitted && !history.kmFinish"
                >KM final é obrigatório.</small
              >
            </div>
          </div>
        </Fieldset>
        <div class="col-2">
          <Button label="ADICIONAR" @click="addHistory"></Button>
        </div>
        <div class="col-2">
          <Button
            label="REMOVER"
            class="p-button-danger"
            @click="removeHistory"
          ></Button>
        </div>
      </div>
    </Fieldset>
    <br />
    <Fieldset legend="CHECKLIST DE SAÍDA">
      <div class="grid">
        <div class="col-12 md:col-6 field">
          <label for="">Documentos</label>
          <MultiSelect
            :options="documents"
            class="p-multiselect-car-token"
            filter="true"
            v-model="obj.documents"
            placeholder="Selecione os documentos"
          >
            <template #value="slotProps">
              <span v-if="!slotProps.value || slotProps.value.length === 0">
                Selecione os documentos
              </span>
              <div
                v-for="a in slotProps.value"
                :key="a.id"
                v-else
                class="p-multiselect-car-token"
              >
                {{ a.description }}
              </div>
            </template>
            <template #option="slotProps">
              {{ slotProps.option.description }}
            </template>
          </MultiSelect>
        </div>
        <div class="col-12 md:col-3 field">
          <label for="">Combustível Inicial</label>
          <Dropdown
            :options="QtdFuel"
            optionValue="key"
            optionLabel="name"
            placeholder="Selecione o combustível"
            filter="true"
            v-model="v$.obj.qtdFuelInit.$model"
            :class="{ 'p-invalid': submitted && v$.obj.qtdFuelInit.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.obj.qtdFuelInit.$invalid"
            >Combustível Inicial é obrigatório.</small
          >
        </div>
        <div class="col-12 md:col-3 field">
          <label for="">Combustível Final</label>
          <Dropdown
            :options="QtdFuel"
            optionValue="key"
            optionLabel="name"
            placeholder="Selecione o combustível"
            filter="true"
            v-model="v$.obj.qtdFuelFinish.$model"
            :class="{ 'p-invalid': submitted && v$.obj.qtdFuelFinish.$invalid }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.obj.qtdFuelFinish.$invalid"
            >Combustível Final é obrigatório.</small
          >
        </div>
        <div class="col-12 field">
          <label for="obs">Observação</label>
          <Textarea
            id="obs"
            v-model="obj.obs"
            placeholder="Digite a situação atual do veículo"
            rows="4"
          />
        </div>
        <div class="col-12 md:col-4 field">
          <label for="">Acessórios</label>
          <MultiSelect
            :options="accessories"
            optionLabel="description"
            placeholder="Selecione os accessórios"
            :filter="true"
            :showClear="true"
            v-model="obj.accessories"
          >
            <template #value="slotProps">
              <span v-if="!slotProps.value || slotProps.value.length === 0">
                Selecione os Acessórios
              </span>
              <div
                v-for="a in slotProps.value"
                :key="a.id"
                v-else
                class="p-multiselect-car-token"
              >
                {{ a.description }}
                <Badge
                  :value="convertCondition(a.condition).value"
                  :severity="convertCondition(a.condition).color"
                  class="mr-2"
                ></Badge>
              </div>
            </template>
            <template #option="slotProps">
              {{ slotProps.option.description }}:
              <Badge
                :value="convertCondition(slotProps.option.condition).value"
                :severity="convertCondition(slotProps.option.condition).color"
                class="mr-2"
              ></Badge>
            </template>
          </MultiSelect>
        </div>
        <div class="col-12 md:col-4 field">
          <label for="">Avarias</label>
          <MultiSelect
            :options="breakdowns"
            optionLabel="description"
            placeholder="Selecione as avarias"
            :filter="true"
            :showClear="true"
            v-model="obj.breakdowns"
          >
            <template #value="slotProps">
              <span v-if="!slotProps.value || slotProps.value.length === 0">
                Selecione as avarias
              </span>
              <div
                v-for="a in slotProps.value"
                :key="a.id"
                v-else
                class="p-multiselect-car-token"
              >
                {{ a.description }}
              </div>
            </template>
            <template #option="slotProps">
              {{ slotProps.option.description }}
            </template>
          </MultiSelect>
        </div>
        <div class="col-12 md:col-4 field">
          <label for="">Estado dos Pneus</label>
          <MultiSelect
            :options="tires"
            optionLabel="description"
            placeholder="Selecione os pneus"
            :filter="true"
            :showClear="true"
            v-model="obj.tireConditions"
          >
            <template #value="slotProps">
              <span v-if="!slotProps.value || slotProps.value.length === 0">
                Selecione os Pneus
              </span>
              <div
                v-for="a in slotProps.value"
                :key="a.id"
                v-else
                class="p-multiselect-car-token"
              >
                {{ a.description }}
                <Badge
                  :value="convertCondition(a.condition).value"
                  :severity="convertCondition(a.condition).color"
                  class="mr-2"
                ></Badge>
              </div>
            </template>
            <template #option="slotProps">
              {{ slotProps.option.description }}:
              <Badge
                :value="convertCondition(slotProps.option.condition).value"
                :severity="convertCondition(slotProps.option.condition).color"
                class="mr-2"
              ></Badge>
            </template>
          </MultiSelect>
        </div>
      </div>
    </Fieldset>
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
// import Vehicle from "../../../models/internal/vehicle";
import Revision from "../../../../models/internal/revision";
import History from "../../../../models/internal/history";
import { FuelType } from "../../../../models/enums/fuel_type";
import { QtdFuel } from "../../../../models/enums/qtd_fuel";
import { convertCondition } from "../../../../models/enums/condition";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
import DriverService from "../../../../service/driver/driver_service";

//Services
import VehicleService from "../../../../service/vehicle/vehicle_service";
import RevisionService from "../../../../service/revision/revision_service";
import DocumentService from "../../../../service/document/document_service";
import AccessoryService from "../../../../service/accessory/accessory_service";
import TireService from "../../../../service/tire/tire_service";
import BreakdownService from "../../../../service/breakdown/breakdown_service";
import SectorService from "../../../../service/sector/sector_service";

export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Revision(),
      submitted: false,
      service: new RevisionService(),
      FuelType,
      QtdFuel,
      vehicleService: new VehicleService(),
      vehicles: [],
      driverService: new DriverService(),
      drivers: [],
      documentService: new DocumentService(),
      documents: [],
      accessoryService: new AccessoryService(),
      accessories: [],
      tireService: new TireService(),
      tires: [],
      breakdownService: new BreakdownService(),
      breakdowns: [],
      convertCondition,
      sectorService: new SectorService(),
      sectorInput: "",
      sectors: [],
    };
  },
  mounted() {
    this.findVehicles();
    this.findDrivers();
    this.findDocuments();
    this.findAccessories();
    this.findTires();
    this.findBreakdowns();
  },
  validations() {
    return {
      obj: new Revision().validations(),
      history: new History().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.checklist.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.checklist.dialogForm = value;
      },
    },
  },
  methods: {
    findDocuments() {
      this.documentService.findAll().then((data) => (this.documents = data));
    },
    findAccessories() {
      this.accessoryService.findAll().then((data) => (this.accessories = data));
    },
    findTires() {
      this.tireService.findAll().then((data) => (this.tires = data));
    },
    findBreakdowns() {
      this.breakdownService.findAll().then((data) => (this.breakdowns = data));
    },
    findDrivers() {
      this.driverService.findAll().then((data) => (this.drivers = data));
    },
    findVehicles() {
      this.vehicleService.findAll().then((data) => (this.vehicles = data));
    },
    send(isFormValid) {
      this.submitted = true;

      //GET DRIVER
      this.obj.setDriverToJson();

      for (let i = 0; i < this.obj.historys.length; i++) {
        let h = this.obj.historys[i];
        if (h.sector.id) {
          h.sector = h.sector.id;
        }
      }

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
      this.submitted = false;
      this.obj = new Revision();
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;

      for (let i = 0; i < this.obj.historys.length; i++) {
        let h = this.obj.historys[i];
        if (h.sector) {
          if (!h.sector.id) {
            this.findSectorById(h.sector).then((s) => {
              h.sector = s;
            });
          }
        }
      }

      if (this.obj.historys.length <= 0) {
        this.addHistory();
      }
      this.obj.date = this.$DateTime.formatarDateInput(this.obj.date);
    },
    addHistory() {
      this.obj.historys.push(new History());
    },
    removeHistory() {
      this.obj.historys.pop();
    },
    findSectorById(sectorId) {
      return new Promise((resolve, reject) => {
        this.sectorService
          .findBySectorId(sectorId)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    },
    searchSectors(event) {
      this.lazyParams = {
        name: event.query,
        size: 100,
      };
      this.sectorService.findAllByFilter(this.lazyParams).then((data) => {
        if (data.content.length === 0) {
          this.lazyParams = {
            acronym: event.query,
            size: 100,
          };
          this.sectorService.findAllByFilter(this.lazyParams).then((data2) => {
            this.sectors = data2.content;
          });
        } else {
          this.sectors = data.content;
        }
      });
    },
  },
};
</script>
<style scoped>
.p-multiselect-car-token {
  -webkit-transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    -webkit-box-shadow 0.2s;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    -webkit-box-shadow 0.2s;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s, -webkit-box-shadow 0.2s;
}
</style>
