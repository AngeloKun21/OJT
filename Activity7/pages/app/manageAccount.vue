<template>
    <div class="profile_style">
        <a-flex class="flex-center">
            <div class="profile_div">
                <!---->
                <a-row :gutter="[0, 8]" class="pt-4 flex justify-start align-center">
                    <a-col :span="24" class="flex justify-start pl-4 mb-4">
                        <p class="flex items-center font-mono text-yellow-900 text-xl p-2 rounded-xl bg-yellow-200 border-yellow-900">
                            <SmileOutlined class="text-3xl text-yellow-900 bg-yellow-200 rounded-full pr-2"/>Hello, {{ firstname }} {{ middlename }} {{ lastname }}</p>        
                    </a-col>
                    <a-col :span="20" class="flex justify-center pl-20 items-center">
                        <SearchOutlined class="text-xl pr-2"/>
                        <a-input type="ghost" v-model:value="searchValue" class="font-mono font-bold" placeholder="Enter Email"></a-input>
                    </a-col>    
                    <a-col :span="11" class="flex justify-end pt-4  ">
                        <p class="font-mono font-bold text-base p-1 rounded-lg">FIRSTNAME:</p>
                    </a-col>
                    <a-col :span="13" class="flex justify-start pt-4 pl-2 ">
                        <p class="font-mono font-bold text-base underline">{{ firstname }}</p>
                    </a-col>

                    <a-col :span="11" class="flex justify-end">
                        <p class="font-mono font-bold text-base p-1 rounded-lg">MIDDLENAME:</p>
                    </a-col>
                    <a-col :span="13" class="flex justify-start pl-2">
                        <p class="font-mono font-bold text-base underline">{{ middlename }}</p>
                    </a-col>
                    
                    <a-col :span="11" class="flex justify-end">
                        <p class="font-mono font-bold text-base p-1 rounded-lg">LASTNAME:</p>
                    </a-col>
                    <a-col :span="13" class="flex justify-start pl-2">
                        <p class="font-mono font-bold text-base underline">{{ lastname }}</p>
                    </a-col>

                    <a-col :span="11" class="flex justify-end">
                        <p class="font-mono font-bold text-base p-1 rounded-lg">EMAIL:</p>
                    </a-col>
                    <a-col :span="13" class="flex justify-start pl-2">
                        <p class="font-mono font-bold text-base underline">{{ email }}</p>
                    </a-col>

                    <a-col :span="11" class="flex justify-end">
                        <p class="font-mono font-bold text-base p-1 rounded-lg">PASSWORD:</p>
                    </a-col>
                    <a-col :span="13" class="flex justify-start pl-2">
                        <p class="font-mono font-bold text-base  underline">{{ password }}</p>
                    </a-col>

                    <a-col :span="23" class="flex justify-end align-center pt-2 gap-3.5">
                        <a-button type="ghost" class="p-4 rounded-lg border-2 bg-yellow-200 border-yellow-900 flex items-center"
                        @click="check_user">
                            <CheckSquareOutlined class="text-xl text-yellow-900"/>
                        </a-button>
                        <a-button type="ghost" class="p-4 rounded-lg border-2 bg-yellow-200 border-yellow-900 flex items-center"
                        @click="delete_user">
                            <DeleteOutlined class="text-xl text-yellow-900"/>   
                        </a-button>
                    </a-col>
                </a-row>
            </div>
        </a-flex>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';

declare function definePageMeta(meta: any): void;
definePageMeta({
    layout: 'dashboard'
})

const searchValue = ref('');
let firstname = ref();
let middlename = ref();
let lastname = ref();
let email = ref();
let password = ref();
let id = ref();

const check_user = async() => {
    
    if(searchValue.value == ''){
        message.error("Please input your Email")
    }

    console.log("search value ==>>",searchValue.value)
    const data_to_get = await fetch("http://localhost:5000/users/search/" + searchValue.value, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
    
    }).then((res) => res.json());
    console.log("data to get ==>>",data_to_get)
    if(data_to_get){
        message.success("Verified Successful!")
        firstname.value = (data_to_get.firstName)
        middlename.value = (data_to_get.middleName)
        lastname.value = (data_to_get.lastName)
        email.value = (data_to_get.email)
        password.value = (data_to_get.password)
        id.value = (data_to_get.id)
    }else{
        message.error("No Email Found!")
    }
    console.log("data_to_get ==>>",data_to_get )
}
const delete_user = async() => {
    const data_to_check = await fetch("http://localhost:5000/users/" + id.value, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
    }).then((res) => res.json());
    message.success("Delete Successful!")
    console.log(data_to_check)
}
</script>

<style scoped>
.profile_style {
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("~/assets/images/default-reverse.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex-center {
    justify-content: center;
    align-items: center;
}
.profile_div {
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    height: 40em;
    width: 80em;

}
</style>