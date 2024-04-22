<template>
    <div>
        <a-flex align="center" class="flex_alignment justify-center">
            <a-col :span="9" class="mr-40">
                <a-col class="font-extrabold p-5 text-4xl text-gray-700 border-white bg-gradient-to-r from-gray-200 to-brown-400 border-8 rounded-full flex items-center">
                    <p class="flex items-center">CREATE AN ACCOUNT <CameraOutlined class="text-7xl text-white bg-gray-700 rounded-full p-2 flex items-center"/> </p>
                </a-col>
            </a-col>
            <a-col :span="14" class="bg-white text-gray-600 justify-center rounded-md py-20">
                <a-col class="text-center mb-5">
                <p class="font-extrabold text-2xl font-sans">
                    What's your Credentials? <br>
                </p> 
                <p class="font-light text-lg font-sans">
                    Don't worry we won't tell anyone.
                </p>
                </a-col>
                <a-row :gutter="[0, 20]" >
                    <a-col :span="24" class="flex justify-center">
                        <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Email"/>
                    </a-col>
                    <a-col :span="24" class="flex justify-center">
                        <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Username"/>
                    </a-col>
                    <a-col :span="24" class="flex justify-center">
                        <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Password"/>
                    </a-col>
                    <a-col :span="9" class="justify-center flex items-center pl-6">
                        <a-checkbox class="rounded-2xl bg-gray-50 p-2 text-sm">
                        ADMIN
                        </a-checkbox>
                    </a-col>
                    <a-col :span="24" class="justify-center flex">
                        <a-button type="ghost" class="p-8 rounded-3xl flex items-center border-2 border-gray-300">
                        <ArrowRightOutlined class="text-3xl text-gray-400"/>
                        </a-button>
                    </a-col>
                    <a-col :span="24" class="text-center">
                        <a-button @click="$router.push('../')" type="text" class="font-bold text-1xl font-sans">Already Have An Account?</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-flex>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.flex_alignment{
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
</style>
