<template>
    <div>
        <a-flex align="center" class="flex_alignment justify-center">
            <a-col :span="9" class="mr-36">
                <a-col class="font-extrabold px-28 py-6 text-4xl text-gray-700 border-white bg-gradient-to-r from-gray-200 to-brown-400 border-8 rounded-full flex items-center justify-center">
                    <p class="flex items-center ml-4">CREATE AN ACCOUNT <CameraOutlined class="text-7xl text-white bg-gray-700 rounded-full p-2 flex items-center border-8 border-white"/> </p>
                </a-col>
            </a-col>
            <a-col :span="18" class="bg-white text-gray-600 justify-center rounded-md py-10">
                <a-col class="text-center mb-5">
                <p class="font-extrabold text-2xl font-sans">
                    What's your Credentials? <br>
                </p> 
                <p class="font-light text-lg font-sans">
                    Don't worry we won't tell anyone.
                </p>
                </a-col>           
            <a-row :gutter="[0, 20]" class="pb-8">
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="FirstName"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Email"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="MiddleName"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Password"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="LastName"/>
                </a-col>
                <a-col :span="12" class="justify-center flex items-center">
                    <a-switch class="bg-gray-400" v-model:checked="checked"/>
                    <h2 class="font-mono pl-2 text-lg">ADMIN</h2>
                </a-col>
            </a-row>
                <a-col :span="24" class="justify-center flex">
                    <a-button type="ghost" class="p-8 mb-4 rounded-3xl flex items-center border-2 border-gray-300">
                    <ArrowRightOutlined class="text-3xl text-gray-400"/>
                    </a-button>
                </a-col>
                <a-col :span="24" class="text-center">
                    <a-button @click="$router.push('../')" type="text" class="font-bold text-1xl font-sans">Already Have An Account?</a-button>
                </a-col>
            </a-col>
        </a-flex>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
const checked = ref<boolean>(false)

declare function definePageMeta(meta: any): void;
definePageMeta ({
    layout: 'signup'
})
</script>

<style scoped>
.flex_alignment{
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
</style>
