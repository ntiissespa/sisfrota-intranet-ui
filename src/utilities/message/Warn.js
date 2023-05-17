import Token from "../jwt/Token.js"

export default function msgWarn(message) {

    if (new Token.checkExpiredToken()) {
        message = "Secção expirada, efetue login novamente."
        this.$toast.add({
            severity: "warn",
            summary: "Atenção.",
            detail: message,
            life: 6000,
        });
    }
}