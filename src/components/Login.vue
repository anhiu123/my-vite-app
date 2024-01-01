<template>
  <div class="signup-container">
    <img class="logo" src="../assets/bali, vietnam (2).png" alt="Logo" />
    <h1 class="h1">Login</h1>
    <div class="register">
      <input type="text" v-model="email" placeholder="Enter your Email" />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your Password"
      />
      <button class="signup-button" @click="logIn">Login</button>
      <p><router-link to="/signup">Sign Up</router-link></p>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <p v-if="isLoggedIn">Đăng nhập thành công!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isLoggedIn: false,
      loginError: "",
    };
  },
  methods: {
    async logIn() {
      // Kiểm tra email và mật khẩu không được để trống
      if (!this.email || !this.password) {
        this.loginError = "Vui lòng nhập đầy đủ email và mật khẩu.";
        return;
      }

      // Kiểm tra định dạng email sử dụng biểu thức chính quy
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.loginError = "Định dạng email không hợp lệ.";
        return;
      }

try {
  const response = await axios.get(
    `http://localhost:3000/users?email=${this.email}&password=${this.password}`
  );

  if (response.status === 200 && response.data.length > 0) {
    const user = response.data[0];

    // Lưu thông tin người dùng và quyền vào local storage
    localStorage.setItem("user-info", JSON.stringify(user));

    // Chuyển hướng người dùng đến trang tương ứng
    if (user.role === "admin") {
      this.$router.push({ name: "AdminDashboard" });
    } else {
      this.$router.push({ name: "UserDashboard" });
    }

    this.isLoggedIn = true;
    this.loginError = ""; // Đặt lại lỗi nếu có
  } else {
    this.isLoggedIn = false;
    this.loginError = "Tài khoản không tồn tại. Vui lòng kiểm tra lại thông tin đăng nhập.";
  }
} catch (error) {
  console.error("Error logging in:", error);
  this.isLoggedIn = false;
  this.loginError = "Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.";
}
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
.signup-container {
  text-align: center;
  margin-top: px;
}

.logo {
  width: 150px;
  border-radius: 50%;
}

.h1 {
  font-size: 36px;
  margin-top: 20px;
}

.register input {
  height: 40px;
  width: 300px;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 1px solid #3498db;
  border-radius: 4px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  transition: border-color 0.3s;
}

.register input:focus {
  outline: none;
  border-color: #2ecc71;
}

.signup-button {
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
</style>
