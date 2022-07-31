require();
const navItems = document.querySelector(".nav-links");
const navBtn = document.querySelector(".nav-toggle");
const cartBtn = document.querySelector(".cart-btn");
const cardContainer = document.querySelector(".section-content");
const navLinks = document.querySelector(".nav-links");
const pages = document.querySelector(".pages");
const prodContainer = document.querySelector(".product-content");

// navLinks.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

class App {
  constructor() {
    this.getAllProducts();
    this.getLimitedProducts(4);
  }

  loadSpinner(isLoad) {
    const html = `
      <div class = "loading">
      </div>
    `;
    if (isLoad === true) cardContainer.insertAdjacentHTML("afterbegin", html);
  }

  toggleNavbar() {
    navItems.classList.toggle("show-links");
  }

  async getLimitedProducts(product) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${product}`
      );
      const data = await response.json();
      this.renderCard(data, cardContainer);
    } catch (err) {
      console.error(err);
    }
  }

  async getAllProducts() {
    try {
      console.log(prodContainer);
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      this.renderCard(data, prodContainer);
    } catch (err) {
      console.error(err);
    }
  }

  setItems(id) {
    console.log(id);
  }

  renderCard(products, container) {
    products.map((product) => {
      return (product.price = new Intl.NumberFormat(navigator.languages[0], {
        style: "currency",
        currency: "inr",
      }).format(product.price));
    });
    console.log(products);

    products.forEach((product) => {
      const html = `
    <div class="card">
      <article class="img-container">
        <img src="${product.image}" alt="" class="card-image" />
      </article>
      <article class="card-content">
        <h2 class="product-name">${product.title}</h2>
        <h3 class="product-price">${product.price}</h3>
        <a href="#" data-id = ${product.id} class="btn-cart">add to cart</a>
        </article>
    </div>
    `;
      container.insertAdjacentHTML("beforeend", html);
    });

    document
      .querySelector(".product-content")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let cnt = 1;
        if (localStorage.getItem("cart")) {
          cnt = cnt + 1;
          localStorage.setItem("cart", cnt);
        } else {
          localStorage.setItem("cart", cnt);
        }
      });
  }
}

const options = {
  root: null,
  threshold: 0.2,
};
const observerCallBack = function (entries, observer) {
  console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section-hidden");
  }
  observer.unobserve(entry.target);
};
const observer = new IntersectionObserver(observerCallBack, options);

document.querySelectorAll(".section-center").forEach((section) => {
  section.classList.add("section-hidden");
  observer.observe(section);
});

const app = new App();
navBtn.addEventListener("click", app.toggleNavbar.bind(this));
pages.addEventListener("click", function () {
  app.getAllProducts();
});

const instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});
console.log(instance);

// instance.orders.create({
//   amount: 50000,
//   currency: "INR",
//   receipt: "receipt#1",
//   notes: {
//     key1: "value3",
//     key2: "value2",
//   },
// });
