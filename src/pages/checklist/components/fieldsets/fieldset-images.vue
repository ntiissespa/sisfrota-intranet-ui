<template>
  <Fieldset legend="IMAGENS">
    <DataTable ref="dt" dataKey="id" :value="images">
      <template #empty>
        <div class="p-text-center">Nenhum resultado encontrado...</div>
      </template>
      <Column header="Imagem">
        <template #body="slotProps">
          <img
            :src="slotProps.data.url"
            :alt="slotProps.data.url"
            class="w-7rem h-5rem shadow-2 border-round"
          />
        </template>
      </Column>
      <Column field="id" header="Ações">
        <template #body="slotProps">
          <Button
            icon="pi pi-download"
            class="p-button-rounded p-button-success mr-2"
            @click="onDownload(slotProps.data)"
            v-tooltip.top="'CLIQUE PARA BAIXAR'"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning mr-2"
            @click="onRemove(slotProps.data)"
            v-tooltip.top="'CLIQUE PARA DELETAR'"
          />
        </template>
      </Column>
    </DataTable>
  </Fieldset>
</template>

<script>
import ImageService from "../../../../service/image/image_service";

export default {
  props: ["obj"],
  data() {
    return {
      imageService: new ImageService(),
      images: [],
    };
  },
  mounted() {
    this.findImages();
  },
  methods: {
    findImages() {
      this.imageService.findById(this.obj.id).then((data) => {
        this.images = data;
      });
    },
    onDownload(image) {
      if (image.url.includes("https://firebasestorage")) {
        window.open(image.url);
      } else {
        this.imageService.download(image.id);
      }
    },
    onRemove(image) {
      this.imageService
        .delete(image.id)
        .then(() => {
          this.findImages();
        })
        .catch((err) => this.$msgErro(err));
    },
  },
};
</script>

<style></style>
