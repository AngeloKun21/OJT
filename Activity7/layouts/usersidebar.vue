<template>
    <a-layout>
        <a-layout-sider class="side_style" style="background-image: linear-gradient(to bottom, #905c30, #a57240, #b98951, #cea162, #e2b975);">
            <ul class="flex flex-col justify-center gap-4">
                <li class="flex justify-center pt-4 pb-2">
                    <VideoCameraOutlined class="text-5xl p-2 text-center text-yellow-900 bg-yellow-200 border-yellow-900 rounded-full px-4 border-2"/>
                </li>
                <li class="flex justify-center align-center">
                    <a-button @click="$router.push('/app/userdashboard')" type="text" class="button-style"><FundOutlined/> DASHBOARD </a-button>
                </li>
                <li class="flex justify-center align-center">
                    <a-button @click="$router.push('/app/userprofile')" type="text" class="button-style"><UserOutlined /> PROFILE </a-button>
                </li>
                <li class="flex justify-center align-center">
                    <a-button @click="$router.push('../')" type="text" class="button-style" ><LogoutOutlined /> LOGOUT </a-button>
                </li>
            </ul>
        </a-layout-sider>
        <a-layout-content> 
            <slot/>
        </a-layout-content>
    </a-layout>
</template> 

<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router = useRouter;
</script>
<style>
.button-style {
    font-size: 1rem;
    padding-left: 1.5em;
    display: flex;
    text-align: start;
    align-items: center;
    background-image: linear-gradient(to bottom, #905c30, #a57240, #b98951, #cea162, #e2b975);
    color: white;
    border: none;
    width: 100%;
}
.side_style{
    height: 100vh;
}
</style>
