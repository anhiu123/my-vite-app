<template>
  <div class="signup-container">
    <img class="logo" src="../assets/bali, vietnam (2).png" alt="Logo" />
    <h1 class="h1">Sign Up</h1>
    <div class="register">
      <input type="text" v-model="name" placeholder="Enter your Name" />
      <input type="text" v-model="email" placeholder="Enter your Email" />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your Password"
      />
      <button class="signup-button" v-on:click="signup">Sign Up</button>
      <p><router-link to="/login">Login</router-link></p>
      <p v-if="signupSuccess" class="success-message">{{ signupSuccess }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      signupSuccess: "",
    };
  },
  methods: {
    async signup() {
      // Kiểm tra tên, email và mật khẩu không được để trống
      if (!this.name || !this.email || !this.password) {
        this.signupSuccess = "Vui lòng nhập đầy đủ thông tin.";
        return;
      }

      // Kiểm tra định dạng email sử dụng biểu thức chính quy
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.signupSuccess = "Định dạng email không hợp lệ.";
        return;
      }

      try {
        let result = await axios.post("http://localhost:3000/users", {
          email: this.email,
          password: this.password,
          name: this.name,
        });

        console.warn(result);
        if (result.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.signupSuccess = "Đăng ký thành công!";
          // Chuyển hướng đến trang Home
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        console.error("Error signing up:", error);
        this.signupSuccess = "Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.";
      }
    },
  },
  
};
</script>

<style scoped>
.success-message {
  color: green;
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
