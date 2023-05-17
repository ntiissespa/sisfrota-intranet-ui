export default function msgInfo(message) {
    this.$toast.add({
        severity: "info",
        summary: "Informativo.",
        detail: message,
        life: 3000,
    });
}