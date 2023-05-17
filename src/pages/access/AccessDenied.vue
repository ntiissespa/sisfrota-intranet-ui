<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden fullScreen"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(0, 200, 255, 0.4) 10%,
            rgba(247, 149, 48, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
          style="border-radius: 53px"
        >
          <div class="grid flex flex-column align-items-center">
            <div
              class="flex justify-content-center align-items-center bg-blue-400 border-circle"
              style="width: 3.2rem; height: 3.2rem"
            >
              <i class="text-50 pi pi-fw pi-lock text-2xl"></i>
            </div>
            <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">
              Acesso Negado
            </h1>
            <span class="text-600 mb-5"
              >Você não tem permissão para acessar esta página. Entre em contato
              com o Administrador do sistema!</span
            >
            <div class="col-12 mt-5 text-center">
              <a :href="$UrlIntranet" class="link-custom hvr-backward">
                <span
                  ><i class="pi pi-arrow-circle-left" style="font-size: 1.6rem"
                /></span>
                Voltar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.fullScreen {
  background-image: url("../../../public/images/sespa/fundo2.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  // font-family: "Roboto Slab", serif;
}
.formIntra {
  padding: 50px;
  background-color: #0288d1;
  background-image: linear-gradient(
    to bottom right,
    rgb(81, 203, 255),
    #0288d1
  );
  color: #fff;
  border-radius: 20px;
}
label {
  font-size: 24px;
  font-weight: bold;
}

.card-container {
  .card {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    user-select: none;
    padding: 0;
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    margin-bottom: 2rem;
    cursor: pointer;

    &.primary-box {
      background-color: var(--primary-color);
      padding: 0;
      color: var(--primary-color-text);
    }

    &.success-box {
      background-color: #4caf50;
      padding: 0;
      color: white;
    }

    &.secondary-box {
      background-color: #56717d;
      padding: 0;
      color: white;
    }

    &.styled-box-green {
      .p-ink {
        background: rgba(#4baf50, 0.3);
      }
    }

    &.styled-box-orange {
      .p-ink {
        background: rgba(#ffc106, 0.3);
      }
    }

    &.styled-box-purple {
      .p-ink {
        background: rgba(#9c27b0, 0.3);
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.link-text {
  cursor: pointer;
}
</style>
