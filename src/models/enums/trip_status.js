export let TripStatus = [
  {
    key: "PENDING",
    name: "Pendente",
  },
  {
    key: "CALLED",
    name: "Cancelado",
  },
  {
    key: "APROVED",
    name: "Aprovado",
  },
];

export function convertStatus(tripStatus) {
  const value = TripStatus.find((type) => type.key == tripStatus);
  return value.name;
}
