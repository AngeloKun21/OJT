<template>
    <div class="dashboard_style">
        <div class="parent_div">
            <!--rgb(179, 138, 88)-->
            <p class="pl-10 pt-4 pb-2 text-3xl font-mono font-bold flex items-center"><PicLeftOutlined class="pr-2"/>ADMIN DASHBOARD</p>
            <a-row class="flex justify-center font-bold gap-4">
                <a-col :span="7" class="flex justify-center items-center bg-yellow-200 rounded-full py-4 px-2">
                    <a-col :span="8" class="flex justify-center items-center"><TeamOutlined class="text-6xl"/></a-col>
                    <a-col :span="16">
                        <a-col :span="24" class=""> <p class="font-mono text-lg text-center">USER COUNT:</p></a-col>
                        <a-col :span="24" class=""> <p class="font-mono text-2xl text-center">{{userCount}}</p></a-col>
                    </a-col>
                </a-col>
                <a-col :span="7" class="flex justify-center items-center bg-yellow-200 rounded-full py-4 px-2">
                    <a-col :span="8" class="flex justify-center items-center"><FundProjectionScreenOutlined class="text-6xl"/></a-col>
                    <a-col :span="16">
                        <a-col :span="24" class=""> <p class="font-mono text-lg text-center">Current Task:</p></a-col>
                        <a-col :span="24" class=""> <p class="font-mono text-2xl text-center">25</p></a-col>
                    </a-col>
                </a-col>
                <a-col :span="7" class="flex justify-center items-center bg-yellow-200 rounded-full py-4 px-2">
                    <a-col :span="8" class="flex justify-center items-center"><SolutionOutlined class="text-6xl"/></a-col>
                    <a-col :span="16">
                        <a-col :span="24" class=""> <p class="font-mono text-lg text-center">Support Count:</p></a-col>
                        <a-col :span="24" class=""> <p class="font-mono text-2xl text-center">21</p></a-col>
                    </a-col>
                </a-col>
                <!--try lang-->
                <a-col :span="20" v-for="datas in userData" class="flex justify-center items-center bg-yellow-200 rounded-full py-2 px-2">
                    <a-col :span="2" class="flex justify-center items-center"><UserOutlined class="flex justify-center text-3xl"/></a-col>
                    <a-col :span="10" class="flex justify-start items-start"><p class="font-mono text-lg text-center">{{ datas.firstName }} {{ datas.middleName }} {{ datas.lastName }} </p></a-col>
                    <a-col :span="7" class="flex justify-start items-start"><p class="font-mono text-lg text-center">| {{ datas.email }}</p></a-col>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';

declare function definePageMeta(meta: any): void;
definePageMeta({
    layout: 'dashboard'
})
let userData = ref();
const userCount = ref();

onMounted( async () =>{
    const user = await fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
    }).then((res) => res.json());
    if(user){
        userCount.value = user.length
        userData.value = user
    }
    console.log("output 'userData' ==>>",userData)
})



</script>

<style scoped>
.dashboard_style {
    min-height: 100dvh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("~/assets/images/default-reverse.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
}

.parent_div{
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    align-items: center;
    overflow: auto;
    height: 40em;
    width: 60em;
}  
</style>
