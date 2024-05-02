<template>
    <div class="dashboard_style">
        <div class="parent_div">
            <!--rgb(179, 138, 88)-->
            <p class="pl-10 pt-4 pb-12 text-3xl font-mono font-bold flex items-center"><PicLeftOutlined class="pr-2"/>USER DASHBOARD</p>
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
                        <a-col :span="24" class=""> <p class="font-mono text-2xl text-center">404</p></a-col>
                    </a-col>
                </a-col>
                <a-col :span="7" class="flex justify-center items-center bg-yellow-200 rounded-full py-4 px-2">
                    <a-col :span="8" class="flex justify-center items-center"><BugOutlined  class="text-6xl"/></a-col>
                    <a-col :span="16">
                        <a-col :span="24" class=""> <p class="font-mono text-lg text-center">Support Count:</p></a-col>
                        <a-col :span="24" class=""> <p class="font-mono text-2xl text-center">201</p></a-col>
                    </a-col>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang='ts' setup>
declare function definePageMeta(meta: any): void;
definePageMeta({
    layout: 'usersidebar'
})

const user = await fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
    }).then((res) => res.json());
    const userCount = user.length
    console.log("output 'dashboard' ==>>",user)
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
    height: 20em;
    width: 60em;
}  
</style>
