<template>
  <div>
    <a-flex align="center" class="boxbox justify-center">
      <a-col :span="15" class="bg-white text-gray-600 justify-center rounded-md py-16">
        <a-col class="text-center mb-5">
          <p class="font-extrabold text-2xl font-sans">Sign In</p> 
        </a-col>
        <a-row :gutter="[0, 20]" >
          <a-col :span="24" class="flex justify-center">
            <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Username"/>
          </a-col>
          <a-col :span="24" class="flex justify-center">
            <a-input class="text-black bg-gray-50 p-3 w-9/12" placeholder="Password"/>
          </a-col>
          <a-col :span="11" class="justify-center flex items-center">
            <a-checkbox class="rounded-2xl bg-gray-50 p-2 text-xl">
              ADMIN
            </a-checkbox>
          </a-col>
          <a-col :span="24" class="justify-center flex">
            <a-button type="ghost" class="p-8 rounded-3xl flex items-center border-2 border-gray-300">
              <ArrowRightOutlined class="text-3xl text-gray-400"/>
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

</script>

<style scoped>
.boxbox{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
