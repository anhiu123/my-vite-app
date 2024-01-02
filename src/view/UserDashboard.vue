<template>
  <nav
    class="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm"
  >
    <div class="container">
      <a class="navbar-brand" href="#"
        ><i class="fa-solid fa-shop me-2" href="/"></i> <strong>GEAR SHOP</strong></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
        <div class="input-group">
          <span class="border-warning input-group-text bg-warning text-white"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></span>
          <input
            type="text"
            class="form-control border-warning"
            style="color: #7a7a7a"
            v-model="searchKeyword"
            @input="handleSearch"
          />
          <button
            class="btn btn-warning text-white"
            @click="performSearch(searchKeyword)"
          >
            Search
          </button>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="ms-auto d-none d-lg-block">
          <div class="input-group">
            <span class="border-warning input-group-text bg-warning text-white"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
            <input
              type="text"
              class="form-control border-warning"
              style="color: #7a7a7a"
              v-model="searchKeyword"
              @input="handleSearch"
            />
            <button
              class="btn btn-warning text-white"
              @click="performSearch(searchKeyword)"
            >
              Search
            </button>
          </div>
        </div>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              class="nav-link mx-2 text-uppercase active"
              aria-current="page"
              href="#"
              >Offers</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link mx-2 text-uppercase" href="#">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-2 text-uppercase" href="#">Catalog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-2 text-uppercase" href="#">About</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link mx-2 text-uppercase"
              v-on:click="logout"
              href="login"
              >Logout</a
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <div>
              <br />
              <button class="mb-5" @click="open()">
                <i class="bi bi-cart"></i>{{ cartTotalQuantity }}
              </button>
              <h2 style="margin-top: -40px; margin-left: 80px"></h2>
            </div>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-center">
            <a class="nav-link mx-2 text-uppercase" href="/login"
              ><i class="bi bi-person"></i>Account</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
    v-if="isopen"
    class="cart1 z-1 position-absolute start-50 translate-middle sticky-top"
  >
    <section class="cart vh-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col bg-warning">
            <p>
              <span class="h2">Shopping Cart </span
              ><span class="h4"
                >({{ cartTotalQuantity }} item in your cart)</span
              >
            </p>

            <div class="card mb-4">
              <div class="card-body p-4">
                <div
                  class="row align-items-center"
                  v-for="item in cartList"
                  :key="item.id"
                >
                  <div class="col-md-2">
                    <img
                      :src="item.img"
                      alt="Image"
                      style="max-width: 100%; height: auto"
                    />
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Name</p>
                      <p class="lead fw-normal mb-0">{{ item.name }}</p>
                    </div>
                  </div>

                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Quantity</p>
                      <p class="lead fw-normal mb-0">{{ item.quantity }}</p>
                      <button @click="decreaseQuantity(item)">-</button>
                      <button @click="increaseQuantity(item)">+</button>
                    </div>
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Price</p>
                      <p class="lead fw-normal mb-0">
                        {{ formatPriceVND(item.price) }}
                      </p>
                    </div>
                  </div>

                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <p class="small text-muted mb-4 pb-2">Total</p>
                      <p class="lead fw-normal mb-0">
                        {{ formatPriceVND(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-2 d-flex justify-content-center">
                    <div>
                      <button @click="deleteCart(item.id)">Xóa</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-5">
              <div class="card-body p-4">
                <div class="float-end">
                  <p class="mb-0 me-5 d-flex align-items-center">
                    <span class="small text-muted me-2">Order total:</span>
                    <span class="lead fw-normal">{{
                      formatPriceVND(orderTotal)
                    }}</span>
                  </p>
                  <br />
                  <div class="d-flex justify-content-end">
                    <button
                      @click="closeCartModal"
                      type="button"
                      class="btn btn-danger me-2"
                    >
                      Đóng
                    </button>
                    <button type="button" class="btn btn-primary btn-lg">
                      Mua
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <h2>Sản Phẩm</h2>
  <div class="d-flex flex-wrap">
    <div
      class="d-flex flex-row mb-3 p-1"
      v-for="product in filteredProducts"
      :key="product.id"
    ></div>
  </div>
  <div class="d-flex flex-wrap">
    <div
      class="d-flex flex-row mb-3 p-1"
      v-for="product in products"
      :key="product.id"
    >
      <!-- <router-link :to="'/product/:id'"> -->
      <div class="card" style="width: 18rem">
        <img
          :src="product.img"
          alt=" Image"
          @click="handleProductClick(product)"
        />

        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            {{ formatPriceVND(product.price) }}
          </p>
          <!-- <a href="#" class="btn btn-primary">Add to card</a> -->
        </div>
        <button
          class="btn btn-danger text-uppercase mr-2 px-4"
          @click="addToCart(product)"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";

import Footer from "../components/footer.vue";
import _ from "lodash";
export default {
  name: "UserDashboard",
  methods: {
    logout() {
      console.log("Đã gọi hàm logout");
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
  components: {
    Footer,
  },
  computed: {
    orderTotal() {
      return this.cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    cartTotalQuantity() {
      return this.cartList.reduce((total, item) => total + item.quantity, 0);
    },
    filteredProducts() {
      return this.products.filter((product) => {
        const match = product.name
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
        console.log(
          `Product: ${product.name}, Search Keyword: ${this.searchKeyword}, Match: ${match}`
        );
        return match;
      });
    },
  },

  data() {
    return {
      products: [],
      isopen: false,
      cart: [],
      cartList: [],
      searchKeyword: "",
      debouncedSearch: _.debounce(this.performSearch, 300),
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCart();
  },
  methods: {
    async deleteCart(cartID) {
      try {
        const userConfirmed = window.confirm("Bạn có muốn xoá không ?");

        if (userConfirmed) {
          await axios.delete(`http://localhost:3000/cart/${cartID}`);

          this.cartList = this.cartList.filter(
            (product) => product.id !== cartID
          );

          console.log("Sản phẩm đã được xóa");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    },
    formatPriceVND(price) {
      // Sử dụng Intl.NumberFormat để định dạng số và thêm đơn vị tiền tệ VNĐ
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      return formatter.format(price);
    },
    formatPrice(value) {
      return (value || 0).toFixed(2);
    },
    increaseQuantity(item) {
      item.quantity++;
      this.updateProductInCart(item);
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateProductInCart(item);
      }
    },
    formatPrice(value) {
      return (value || 0).toFixed(2);
    },

    closeCartModal() {
      this.isopen = false;
    },

    open() {
      this.isopen = true;
    },
    handleSearch() {
      this.debouncedSearch();
    },

    performSearch() {
      if (this.searchKeyword.trim() !== "") {
        const filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
        this.products = filteredProducts;
      } else {
        this.fetchProducts();
      }
    },

    async updateProductInCart(products) {
      try {
        await axios.put(`http://localhost:3000/cart/${products.id}`, products);

        console.log("Sản phẩm đã được cập nhật trong giỏ hàng:", products);
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
      }
    },

    async updateSoLuongCart(products) {
      products.quantity--;

      if (products.quantity == 0) {
        this.deleteCart(products.id);
      }

      try {
        // Sử dụng axios.put để cập nhật thông tin cho sản phẩm cụ thể
        await axios.put(`http://localhost:3000/cart/${products.id}`, products);

        console.log("Sản phẩm đã được cập nhật trong giỏ hàng:", products);
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
      }
    },

    // giỏ hàng
    async addToCart(products) {
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProduct = this.cartList.find(
        (item) => item.id === products.id
      );

      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingProduct.quantity++;
        await this.updateProductInCart(existingProduct);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng

        const newProduct = {
          id: products.id,
          name: products.name,
          price: products.price,
          quantity: 1,
          img: products.img,
        };
        const response = await axios.post(
          "http://localhost:3000/cart",
          newProduct
        );
        this.fetchCart();
      }
    },
    // giỏ hàng

    async fetchCart() {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        this.cartList = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    async fetchProducts(searchKeyword = "") {
      try {
        const response = await axios.get("http://localhost:3000/product", {
          params: { q: searchKeyword },
        });
        console.log("Data:", response.data);
        this.products = response.data; // Lưu ý sự thay đổi ở đây
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    },
    handleProductClick(product) {
      this.$router.push({ path: `/product/${product.id}` });
    },
  },
};
</script>
<style scoped>
table {
  margin-top: 20px;
  border-collapse: collapse;
  overflow: hidden;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd; /* Để giữ cấu trúc của bảng */
}
.add {
  margin: 10px;
  background-color: aqua;
  padding: 10px;
  border-radius: 4px;
  color: black;
}
.cart {
  width: 1000px;
}
.cart1 {
  top: 540px;
}
.xoa {
  background-color: red;
}
.btn-warning {
  background-color: green;
}
.bi-pencil {
  color: white;
}
th:first-child,
td:first-child {
  border-top-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}

th:last-child,
td:last-child {
  border-top-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}
/* Your component-specific styles go here */
</style>
