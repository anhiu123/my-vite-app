<!-- ProductDetail.vue -->
<template>
  <Nav />
  <div>
    <h2>{{ product.name }}</h2>
    <div class="container mt-5 mb-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
                <div class="images p-3">
                  <div class="text-center p-4">
                    <img :src="product.img" :alt="product.name" width="250" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center">
                      <i class="fa fa-long-arrow-left"></i>
                      <span class="ml-1"> <a href="/">List Sản Phẩm</a></span>
                    </div>
                    <i class="fa fa-shopping-cart text-muted"></i>
                  </div>
                  <div class="mt-4 mb-3">
                    <span class="text-uppercase text-muted brand"
                      >{{ product.price }}VNĐ</span
                    >

                    <h5 class="text-uppercase">{{ product.name }}</h5>
                  </div>
                  <div>
                    <p>Stock: {{ product.stock }}</p>
                    <p>Category: {{ product.category }}</p>
                    <p>Brand: {{ product.brand }}</p>
                  </div>
                  <p class="about">
                    {{ product.description }}
                  </p>
                  <button
                    class="btn btn-danger text-uppercase mr-2 px-4"
                    @click="addToCart(product)"
                  >
                    Mua
                  </button>
                  <div class="cart mt-4 align-items-center">
                    <i class="fa fa-heart text-muted"></i>
                    <i class="fa fa-share-alt text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import Footer from "./footer.vue";
import Nav from "./nav.vue";
export default {
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      product: {},
    };
  },

  mounted() {
    // Lấy thông tin sản phẩm dựa trên ID từ API hoặc dữ liệu khác
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
  },

  methods: {
    async fetchProduct(productId) {
      try {
        // Thay đổi URL và endpoint của bạn theo cấu trúc API của bạn
        const response = await axios.get(
          `http://localhost:3000/product/${productId}`
        );
        console.log("Data:", response.data);
        this.product = response.data;
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      }
    },
  },
};
</script>

<style scoped>
.images {
  margin-right: 500px;
}
</style>
