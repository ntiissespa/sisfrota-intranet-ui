<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '680px' }"
    header="Enviar imagens"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <FileUpload
      name="demo[]"
      accept="image/**"
      url="./upload.php"
      invalidFileTypeMessage="Tipo de arquivo inválido, tipos de arquivo permitidos: PNG, JPEG"
      invalidFileSizeMessage="Tamanho de arquivo inválido, o tamanho do arquivo deve ser no máximo 2 MB."
      :chooseLabel="'Escolher'"
      :maxFileSize="2000000"
      @select="onSelect"
      :fileLimit="1"
      :showUploadButton="false"
      @clear="onCancel"
    >
      <template #empty>
        <p class="p-text-center">Nenhum arquivo selecionado</p>
      </template>
    </FileUpload>
    <div v-if="file !== null">
      <div class="grid">
        <div class="col-12 md:col-6">
          <VueCropper
            ref="cropper"
            :src="file.base64"
            alt="FOTO"
            :aspect-ratio="50 / 35"
            style="background-color: #ddd; overflow: hidden"
          />
        </div>
        <div class="col-12 md:col-6">
          <img v-if="cropImg" :src="cropImg" class="img-fluid" />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Cortar"
        class="p-button-raised p-button-success"
        icon="pi pi-pencil"
        @click="cropImage"
        v-if="file"
      />

      <Button
        icon="pi pi-check"
        label="Salvar"
        type="button"
        @click="onUpload"
        :disabled="file === null"
      />
    </template>
  </Dialog>
</template>

<script>
//Models
import Image from "../../../../models/internal/image";

//Services
import ImageService from "../../../../service/image/image_service";

//Components
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: { VueCropper },
  props: ["revision"],
  data() {
    return {
      obj: new Image(),
      file: null,
      service: new ImageService(),

      cropImg: null,
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.checklist.dialogUpload;
        return value;
      },
      set(value) {
        this.$store.state.views.checklist.dialogUpload = value;
      },
    },
  },
  methods: {
    onCancel() {
      this.obj.url = null;
      this.file = null;
      this.cropImg = "";
    },
    onSelect(obj) {
      this.file = obj.files[0];

      let fileReader = new FileReader();

      fileReader.onload = () => {
        this.file.base64 = fileReader.result;
        this.cropImg = this.file.base64;
        this.$refs.cropper.replace(this.file.base64);
      };

      fileReader.readAsDataURL(this.file);
    },
    onUpload() {
      this.service
        .upload(this.file, this.revision.id)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro cadastrado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
          }
        })
        .catch((err) => {
          console.error(err);
          this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: "Não foi possivel enviar a imagem",
            life: 6000,
          });
        });
    },
    hideDialog() {
      this.obj = new Image();
      this.cropImg = "";
      this.file = null;
      this.visibleDialog = false;
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.file.base64 = this.cropImg;

      this.$ImageCropper.urlToFile(this.file).then((res) => {
        this.file = res;
      });
    },
  },
};
</script>

<style></style>
