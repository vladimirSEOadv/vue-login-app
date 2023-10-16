<script lang="ts">
import Vue from "vue";
import axios from "axios";
import userStore from "../stores/userStore";

export default Vue.extend({
  data() {
    return {
      inputName: "Bret",
      inputPhone: "1-770-736-8031 x56442",
      invalidInputName: false,
      invalidInputPhone: false,
      errors: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const usersResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!usersResponse.data.length) {
          throw new Error("empty response");
        }
        console.log("users", usersResponse);
        return usersResponse.data;
      } catch (error) {
        console.log("error", error);
        return [];
      }
    },
    validateName() {
      if (this.inputName === "") {
        this.invalidInputName = false;
      } else {
        const regex = /^[a-zA-Z\s]+$/; // Буквы и символ пробела
        this.invalidInputName = !regex.test(this.inputName);
      }
    },
    validatePhone() {
      if (this.inputPhone === "") {
        this.invalidInputPhone = false;
      } else {
        // TODO исправить регулярку для валидных значений вроде 1-770-736-8031 x56442
        const regex = /^[0-9-+x\s]+$/;
        this.invalidInputPhone = !regex.test(this.inputPhone);
      }
    },
    async submitForm() {
      try {
        const res = await this.fetchUsers();
        // Поиск пользователя с заданным именем и номером
        const foundUser = res.find(
          (user: { username: string; phone: string }) =>
            user.username === this.inputName && user.phone === this.inputPhone
        );
        console.log("foundUser", foundUser);
        if (foundUser) {
          // Сохранение данных в Vuex-хранилище
          userStore.commit("setUser", foundUser);
          // TODO Отправка данных на сервер
          this.$router.push("/profile");
        } else {
          console.log("not found user");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
</script>

<template>
  <div class="form">
    <div class="form__title">description</div>
    <form @submit.prevent="submitForm" class="form__content">
      <div class="form__description">description</div>
      <div class="form__inputs">
        <input
          v-model="inputName"
          @input="validateName"
          :class="{ 'invalid-input': invalidInputName }"
          class="form__input"
          type="text"
          placeholder="Username"
        />
        <input
          v-model="inputPhone"
          @input="validatePhone"
          :class="{ 'invalid-input': invalidInputPhone }"
          class="form__input"
          type="tel"
          placeholder="Phone Number"
        />
      </div>
      <button @click.prevent="submitForm" class="form__button" type="submit">
        Login
      </button>
    </form>
    <div v-if="errors.length">
      <ul>
        <li :key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <details class="hint">
      <summary></summary>
      <p>Bret</p>
      <p>1-770-736-8031 x56442</p>
    </details>
  </div>
</template>

<style scoped>
.invalid-input {
  background-color: red;
}

.form {
  width: 447px;
  margin: 0 auto;
  align-items: center;
  background-color: #c3c3c3;
  border-radius: 5px;
  overflow: hidden;
}
.form__content {
  padding: 0 25px 30px 25px;
}
.form__title {
  padding: 15px 0;
  background-color: #a5a5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f5f5f;
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.425px;
}
.form__description {
  height: 50px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  color: #5f5f5f;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 140% */
  letter-spacing: -0.375px;
}
.form__inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}
.form__input {
  padding: 10px;
  border-radius: 5px;
  color: #353535;
  font-family: Roboto;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.425px;
  border: none;
}
.form__button {
  width: 100%;
  padding: 10px 30px;
  background-color: #519945;
  border-radius: 5px;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.425px;
  border: none;
  transition: color 0.1s ease-in-out, box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;
}
.form__button:hover {
  color: #000000;
  box-shadow: 2px 4px 8px 1px #181818;
  transform: translateY(-1px);
  transform: scale(1.03);
}
.form__button:active {
  color: #000000;
  transform: translateY(0);
}

.hint {
  position: absolute;
  top: -12px;
  left: 0;
}
</style>
