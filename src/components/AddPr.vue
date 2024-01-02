<template>

  <div class="product-form">
    <h2>Thêm Sản Phẩm</h2>
    <form class="border p-5 bg-secondary" @submit.prevent="submitForm">
      <div class="mb-3">
        <label
          for="exampleFormControlInput1"
          class="form-label text-white fw-bold"
          >Tên sản phẩm</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productName"
          id="productName"
          required
          placeholder="Tên sản phẩm"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Ảnh sản phẩm</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productImage"
          id="productImage"
          required
          placeholder="Ảnh sản phẩm"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Mô Tả Sản Phẩm:</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productDescription"
          id="productDescription"
          required
          placeholder="Mô Tả Sản Phẩm:"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Giá:</label
        >
        <input
          type="number"
          class="form-control"
          v-model="productPrice"
          id="productPrice"
          required
          placeholder="Giá"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Cổ phần:</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productStock"
          id="productStock"
          required
          placeholder="Cổ phần"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Loại vải:</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productCategory"
          id="productCategory"
          required
          placeholder="Loại vải"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-white"
          >Thương hiệu:</label
        >
        <input
          type="text"
          class="form-control"
          v-model="productBrand"
          id="productBrand"
          required
          placeholder="Thương hiệu"
        />
      </div>

      <div class="">
        <button class="btn btn-primary me-5">
          <a class="text-light" href="/">List Sản Phẩm</a>
        </button>
        <button type="submit" class="btn btn-success">Thêm Sản Phẩm</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      productName: "",
      productImage: "",
      productDescription: "",
      productPrice: 0,
      productStock: "",
      productCategory: "",
      productBrand: "",
    };
  },
  methods: {
    async submitForm() {
      const newProduct = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        img: this.productImage,
        stock: this.productStock,
        category: this.productCategory,
        brand: this.productBrand,
      };

      try {

        // Gửi POST request đến API Server

        const response = await axios.post(
          "http://localhost:3000/product",
          newProduct
        );


        // Xử lý response nếu cần
        console.log("Sản phẩm đã được thêm:", response.data);

        // Reset form sau khi thêm sản phẩm thành công
        this.productName = "";
        this.productPrice = null;
        this.productDescription = "";
        this.productImage = "";
        this.productStock = "";
        this.productCategory = "";
        this.productBrand = "";
        this.$router.push("/");
      } catch (error) {
        // Xử lý lỗi nếu có

        console.error("Lỗi khi thêm sản phẩm:", error);
      }
    },
    resetForm() {
      this.productName = "";
      this.productPrice = null;
      this.productDescription = "";
      this.productImage = "";
      this.productStock = "";
      this.productCategory = "";
      this.productBrand = "";
    },
  },
};
</script>
