<template>
    <!-- Your HTML template goes here -->
    <div>
      <h2>Ứng Dụng Bán Quần Áo</h2>
  
      <div class="addd"><a class="add" href="/admin/add">Thêm Sản Phẩm</a></div>
      <br />
      <a href="/">List Home Sản Phẩm</a>

      <table>
        <thead>
          <tr class="bg-body-secondary">
            <th>ID</th>
  
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Cổ phần</th>
            <th>Loại</th>
            <th>thương hiệu</th>
            <th>Xóa</th>
            <th>Sửa</th>
            <!-- <th>Giỏ Hàng</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>
              <img
                style="width: 100px; height: 100px"
                :src="product.img"
                alt=""
              />
            </td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.brand }}</td>
            <!-- <td>
  <button @click="addToCart(product)">Thêm vào giỏ hàng</button>
  </td> -->
            <td>
              <Button class="xoa" @click="deleteProduct(product.id)"
                ><i class="bi bi-trash"></i
              ></Button>
            </td>
            <td>
              <Button class="btn-warning">
                <router-link :to="`/admin/${product.id}/edit`">
                  <i class="bi bi-pencil"></i>
                </router-link>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    cartTotalQuantity() {
      return this.cartList.reduce((total, item) => total + item.quantity, 0);
    },
  },

  data() {
    return {
      isopen: false,
      products: [],
      cart: [],
      cartList: [],
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

    formatPrice(value) {
      // Sử dụng toFixed(2) để giới hạn số lượng chữ số sau dấu thập phân thành 2
      return (value || 0).toFixed(2);
    },

    closeCartModal() {
      this.isopen = false;
    },

    open() {
      // Lưu lại todo đang được sửa để cập nhật sau khi người dùng thay đổi thông tin
      this.isopen = true;
    },

    async updateProductInCart(products) {
      try {
        // Sử dụng axios.put để cập nhật thông tin cho sản phẩm cụ thể
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
        };
        const response = await axios.post("http://localhost:3000/cart",
          newProduct
        );
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

    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/product");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        const userConfirmed = window.confirm("Bạn có muốn xoá không ?");

        if (userConfirmed) {
          await axios.delete(`http://localhost:3000/product/${productId}`);

          this.products = this.products.filter(
            (product) => product.id !== productId
          );

          console.log("Sản phẩm đã được xóa");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
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