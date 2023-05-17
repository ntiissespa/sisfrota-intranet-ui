export let Condition = [
  {
    key: true,
    name: "Bom",
  },
  {
    key: false,
    name: "Ruim",
  },
];

export function convertCondition(condition) {
  if (condition) {
    return { value: "BOM", color: "success" };
  } else {
    return { value: "RUIM", color: "danger" };
  }
}
