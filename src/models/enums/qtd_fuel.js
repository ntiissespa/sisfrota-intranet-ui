export let QtdFuel = [
  {
    key: "ONE_FOUR",
    name: "1/4",
  },
  {
    key: "TWO_FOUR",
    name: "2/4",
  },
  {
    key: "THREE_FOUR",
    name: "3/4",
  },
  {
    key: "FOUR_FOUR",
    name: "CHEIO",
  },
];

export function convertQtdFuel(qtdFuel) {
  const value = QtdFuel.find((type) => type.key == qtdFuel);
  return value.name;
}
