<template>
  <div>
    <a-flex align="center" class="boxbox justify-center">
      <a-col :span="15" class="bg-white text-gray-600 justify-center rounded-md py-12">
        <a-col class="text-center mb-5">
          <p class="font-extrabold text-2xl font-sans">Sign In</p> 
        </a-col>
        <a-row :gutter="[0, 20]" >
          <a-col :span="24" class="flex justify-center">
            <a-input class="text-black bg-gray-100 p-3 w-9/12 border-gray-300" v-model:value="email_typed" placeholder="Email" required/>
          </a-col>
          <a-col :span="24" class="flex justify-center">
            <a-input class="text-black bg-gray-100 p-3 w-9/12 border-gray-300" v-model:value="password_typed" type="password" placeholder="Password" required/>
          </a-col>
          <a-col :span="24" class="flex justify-center items-center">
              <a-switch class="bg-gray-400" v-model:checked="checked"/>
              <h2 class="font-mono pl-2 text-lg">ADMIN</h2>
          </a-col>
          <a-col :span="24" class="justify-center flex">
            <a-button :class="{ 'complete_input': email_typed.trim() !== '' && password_typed.trim() !== '' }" type="ghost" class="p-8 rounded-3xl flex items-center border-2 border-gray-300" @click="login">
              <ArrowRightOutlined :class="{ 'button_arrow': email_typed.trim() !== '' && password_typed.trim() !== '' }" class="text-3xl text-gray-400"/>
            </a-button>
          </a-col>
          <a-col :span="24" class="text-center">
            <a-button  type="text" class="font-bold text-1xl font-sans">Can't Sign In?</a-button>
          </a-col>
          <a-col :span="24" class="text-center">
            <a-button @click="$router.push('/app/SignUp')" type="text" class="font-bold text-1xl font-sans">Create An Account</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-flex>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const email_typed = ref('');
const password_typed = ref('');
const router = useRouter();
const checked = ref<boolean>(false)

const login = async () => {
  if(email_typed.value.trim() !== '' && password_typed.value.trim() !== ''){
    const data = {
      email: email_typed.value,
      password: password_typed.value,
      usertypeadmin: checked.value
    }
    console.log(data)
    const user = await fetch("http://localhost:5000/users/email", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(user)
    if (user) {
      console.log("Login Successful!")
      router.push("/app/dashboard")
    } else {
      console.log("Wrong Credentials")
      message.error("Wrong Credentials")
    }
  } else {
    message.error("Please input Credentials")
  }
}


</script>

<style scoped>
.boxbox{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.complete_input {
  background-color: rgb(255, 50, 50);
}

.button_arrow {
  color: white;
}
</style>
