<template>
    <div class="frame">
        <a-flex class="bg-gradient-to-r from-gray-200 to-brown-400 border-4 flex flex-col items-center p-40 rounded-full">
            <p class="text-xl text-center font-mono font-bold">
                Unhashed Password: {{ normal_password }}
            </p>
            <p class="text-xl text-center font-mono font-bold">
                Hashed Password: {{ hashed_password }}
            </p>
            <p class="text-xl text-center font-mono font-bold">
                {{ simple_text }}
            </p>
            <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="user_type" placeholder="password"></a-input>
            <a-button class="mt-4 text-xl font-mono font-bold border-2 border-black bg-gray-100 flex items-center" 
                type="ghost" @click="hash_now"
                >
                Hash
            </a-button>
            <a-button class="mt-4 text-xl font-mono font-bold border-2 border-black bg-gray-100 flex items-center" 
                type="ghost" @click="comparePasswords"
                >
                Compare
            </a-button>
            <a-button class="mt-4 text-xl font-mono font-bold border-2 border-black bg-gray-100 flex items-center" 
                type="ghost"
                @click="$router.push('../')"
                >
                Back to login
            </a-button>
        </a-flex>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import bcrypt from 'bcryptjs';

let user_type = ref('');
let normal_password = ref('');
let hashed_password = ref('');
let simple_text = ref('');

const hash_now = async () => {
    normal_password.value = user_type.value;
    const hashedpassword = bcrypt.hashSync(user_type.value, 10);
    hashed_password.value = hashedpassword;
};

const comparePasswords = async () => {
    const hashedPasswordToCompare = hashed_password.value;

    const match = bcrypt.compareSync(user_type.value, hashedPasswordToCompare);
    if (match) {
        simple_text.value = 'Passwords match!';
    } else {
        simple_text.value = 'Passwords do not match!';
    }
};
</script>

<style scoped>
.frame{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>