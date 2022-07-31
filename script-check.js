const products = [
  {
    name: "Camisole",
    price: 800,
  },
  {
    name: "Black Tee",
    price: 550,
  },
  {
    name: "Full Sleeves",
    price: 700,
  },
  {
    name: "Half Sleeves",
    price: 1050,
  },
];

console.log(products);
// console.log(navigator.language);
const inr = products.map((product) => {
  const options = {
    style: "currency",
    currency: "inr",
  };
  return (product.price = new Intl.NumberFormat("en-us", options).format(
    product.price
  ));
});
console.log(products);
console.log(inr);
