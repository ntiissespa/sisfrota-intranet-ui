export let FuelType = [
  {
    key: "DIESEL",
    name: "Diesel",
  },
  {
    key: "GASOLINE",
    name: "Gasolina",
  },
  {
    key: "FLEX",
    name: "Flex",
  },
];

export function convertFuel(fuelType) {
  const value = FuelType.find((type) => type.key == fuelType);
  return value.name;
}
