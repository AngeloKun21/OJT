<template>
    <a-layout class="signup-div" >
      <a-layout-content>
        <slot />
      </a-layout-content>
      <a-layout-footer style="background: transparent;">
        <a-col class="tracking-wide font-sans text-xs flex justify-start mb-2 ml-36 font-bold text-white text-center">
          THIS SITE IS CREATED BY DENIEL ANGELO C. BARE.
          <br><br>
          コーディング方法をまだ学習中の意欲的な開発者
        </a-col>
      </a-layout-footer>
    </a-layout>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .signup-div{
    min-height: 100dvh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("~/assets/images/loginpagebg.jpg");
  }
  </style>