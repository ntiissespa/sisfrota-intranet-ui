<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '850px' }"
    header="Detalhes da Solicitação"
    :modal="true"
    :closeOnEscape="false"
    class="p-fluid"
    @hide="hideDialog"
  >
    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionTab header="Solicitação">
        <text-details :objSelected="obj" />
      </AccordionTab>
      <AccordionTab header="Histórico">
        <OrderList v-model="historys" listStyle="height:auto" dataKey="id">
          <template #header> Histórico da Solicitação </template>
          <template #item="slotProps">
            <div class="solicitacao-list-detail">
              <h5 class="mb-2">{{ slotProps.item.description }}</h5>
              <i class="pi pi-clock solicitacao-category-icon mr-2"></i>
              <span class="solicitacao-clock">{{
                $DateTime.formatarDateTime24hours(slotProps.item.date)
              }}</span>
            </div>
          </template>
        </OrderList>
      </AccordionTab>
    </Accordion>
  </Dialog>
</template>
<script>
//Service
import HistoryService from "../../service/history/history_service";

// components
//import ImageUser from "./image-user.vue";
import TextDetails from "./text-details.vue";

export default {
  props: ["objSelected"],
  components: { TextDetails },
  data() {
    return {
      obj: null,
      historyService: new HistoryService(),
      historys: [],
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.solicitation.consult.dialogDetails;
        if (value) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.solicitation.consult.dialogDetails = value;
      },
    },
  },
  methods: {
    getData() {
      this.obj = this.objSelected;
      this.findHistorys();
    },
    findHistorys() {
      if (this.historys.length <= 0) {
        this.historyService.findById(this.obj.id).then((res) => {
          this.historys = res;
        });
      }
    },
    hideDialog() {
      this.obj = null;
      this.historys = [];
    },
  },
};
</script>
