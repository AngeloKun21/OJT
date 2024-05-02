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
                    <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="firstname_typed" placeholder="FirstName"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="email_typed" placeholder="Email"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="middlename_typed" placeholder="MiddleName"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="password_typed" placeholder="Password" type="password"/>
                </a-col>
                <a-col :span="12" class="flex justify-center">
                    <a-input class="text-black bg-gray-100 border-gray-300 p-3 w-9/12" v-model:value="lastname_typed" placeholder="LastName"/>
                </a-col>
                <a-col :span="12" class="justify-center flex items-center">
                    <a-switch class="bg-gray-400" v-model:checked="checked"/>
                    <h2 class="font-mono pl-2 text-lg">ADMIN</h2>
                </a-col>
            </a-row>
                <a-col :span="24" class="justify-center flex">
                    <a-button :class="{ 'complete_input': email_typed.trim() !== '' && password_typed.trim() !== '' && firstname_typed.trim() !== '' && middlename_typed.trim() !== ''&& lastname_typed.trim() !== ''}"
                    type="ghost" class="p-8 mb-4 rounded-3xl flex items-center border-2 border-gray-300" @click="signup">
                    <ArrowRightOutlined :class="{ 'button_arrow': email_typed.trim() !== '' && password_typed.trim() !== '' && firstname_typed.trim() !== '' && middlename_typed.trim() !== ''&& lastname_typed.trim() !== ''}"
                    class="text-3xl text-gray-400"/>
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
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs';


const router = useRouter();
const email_typed = ref('');
let password_typed = ref('');
const firstname_typed = ref('');
const middlename_typed = ref('');
const lastname_typed = ref('');
const checked = ref<boolean>(false)

declare function definePageMeta(meta: any): void;
definePageMeta ({
    layout: 'signup'
})

const hashing = async() => {
    const hashedpassword = bcrypt.hashSync(password_typed.value, 10)
    password_typed.value = hashedpassword;
    console.log("password hashed ==>>", hashedpassword);
}
 
const email_check_dupe = async() => {
    const user = await fetch("http://localhost:5000/users/search/"+email_typed.value, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
      },
    }).then((res) => res.json());
    console.log("Email fetched ==>>",user)
    if(user != null){
        message.error(`Email is already registered.`);
    }
}

const signup = async () => {
    email_check_dupe()
    const validate_firstname = firstname_typed.value;
    const validate_middlename = middlename_typed.value;
    const validate_lastname = lastname_typed.value;
    const regex = /^[a-zA-Z]+$/; // Only allow letters
    const passwordFormat = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

    if(email_typed.value.trim() !== '' && password_typed.value.trim() !== '' && firstname_typed.value.trim() !== '' && middlename_typed.value.trim() !== ''&& lastname_typed.value.trim() !== ''){
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailFormat.test(email_typed.value)) {
            message.error("Please enter a valid email address");
            return;
        } else if (!passwordFormat.test(password_typed.value)) {
            message.error("Password must be 8 to 15 characters long and contain at least one special character");
            return;
        } else if (!regex.test(validate_firstname)) { // FIRSTNAME
            message.error(`Invalid input for FirstName`);
        } else if (!regex.test(validate_middlename)) { // MIDDLENAME
            message.error(`Invalid input for MiddleName`);
        } else if (!regex.test(validate_lastname)) { // LASTNAME
            message.error(`Invalid input for LastName`);
        }
         else {
            //HASHING
            hashing()

            const data = {
                firstName: firstname_typed.value,
                middleName: middlename_typed.value,
                lastName: lastname_typed.value,
                email: email_typed.value,
                password: password_typed.value,
                usertypeadmin: checked.value
            };

            console.log("ETO UNG DATA ==>>",data)
            const user = await fetch("http://localhost:5000/users/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
                },
                body: JSON.stringify(data),
            }).then((res) => res.json());

            console.log("ETO UNG USER ==>>",user)

            if (user) {
                console.log("Sign Up Successful!")
                message.success("Sign Up Successful!")
                router.push("../")
            } else {
                console.log("Wrong Credentials")
                message.error("Invalid credentials. Please verify and try again.")
            }
        }
    } else {
        console.log("Wrong Credentials")
        message.error("Credentials Incomplete, Please ensure that all fields are filled up!")
    }
}


</script>

<style scoped>
.flex_alignment{
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
