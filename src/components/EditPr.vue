<template>
  <div>
    <a href="/">List Sản Phẩm</a>
    <div class="product-form">
      <h2>{{ isUpdating ? "Cập Nhật" : "Thêm" }} Sản Phẩm</h2>
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
            <a class="text-light" href="/admin/products">List Sản Phẩm</a>
          </button>
          <button type="submit" class="btn btn-success">
            Cập nhật Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isUpdating: false, // Dùng để xác định xem đang cập nhật hay thêm mới
      productIdToUpdate: null, // ID của sản phẩm cần cập nhật
      productName: "",
      productImage: "",
      productDescription: "",
      productPrice: 0,
      productStock: "",
      productCategory: "",
      productBrand: "",
    };
  },
  created() {
    // Nếu có ID sản phẩm được chuyển vào (đang cập nhật)
    const productId = this.$route.params.id;
    if (productId) {
      this.isUpdating = true;
      this.productIdToUpdate = productId;
      this.loadProductData();
    }
  },
  methods: {
    async loadProductData() {
      try {
        // Gửi GET request để lấy dữ liệu sản phẩm cần cập nhật
        const response = await axios.get(
          `http://localhost:3000/product/${this.productIdToUpdate}`
        );

        // Gán dữ liệu từ response vào biến data
        const productData = response.data;

        // Gán dữ liệu từ response vào các trường dữ liệu để hiển thị trên form
        this.productName = productData.name;
        this.productPrice = productData.price;
        this.productDescription = productData.description;
        this.productImage = productData.img;
        this.productStock = productData.stock;
        this.productCategory = productData.category;
        this.productBrand = productData.brand;
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    },
    async submitForm() {
      // Dữ liệu sản phẩm từ form
      const productData = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        img: this.productImage,
        stock: this.productStock,
        category: this.productCategory,
        brand: this.productBrand,
      };

      try {
        // Gửi request dựa vào việc đang cập nhật hay thêm mới
        const response = this.isUpdating
          ? await axios.patch(
              `http://localhost:3000/product/${this.productIdToUpdate}`,
              productData
            )
          : await axios.post("http://localhost:3000/product", productData);

        // Xử lý response nếu cần

        // Reset form sau khi thêm/cập nhật sản phẩm thành công
        this.productName = "";
        this.productPrice = null;
        this.productDescription = "";
        this.productImage = "";
        this.productStock = "";
        this.productCategory = "";
        this.productBrand = "";
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(
          `Lỗi khi ${this.isUpdating ? "cập nhật" : "thêm"} sản phẩm:`,
          error
        );
      }
    },
  },
};
</script>

<style>
/* CSS styles */
</style>
