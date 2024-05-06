<template>
    <div class="profile_style">
        <a-flex class="flex-center">
            <div class="profile_div">
                <a-row :gutter="[0, 8]" class="pt-4 flex justify-center align-center">
                    <a-col :span="10" class="flex justify-center bg-yellow-200 border-2 border-yellow-900 rounded-full">
                        <p class="flex items-center font-mono text-yellow-900 text-3xl ">
                            <UserOutlined class="text-5xl p-2 text-yellow-900 bg-yellow-200 rounded-full"/>PROFILE
                        </p>
                    </a-col>
                    <a-col :span="18" class="flex justify-start items-center">
                        <p class="font-mono font-bold">FIRSTNAME: </p>
                    </a-col>
                    <a-col :span="24" class="flex justify-center items-center">
                        <a-input class="text-black bg-yellow-200 border-gray-300 p-3 w-9/12"
                            v-model:value="firstname_typed" placeholder="FirstName" />
                    </a-col>

                    <a-col :span="18" class="flex justify-start items-center">
                        <p class="font-mono font-bold">MIDDLENAME: </p>
                    </a-col>
                    <a-col :span="24" class="flex justify-center items-center">
                        <a-input class="text-black bg-yellow-200 border-gray-300 p-3 w-9/12"
                            v-model:value="middlename_typed" placeholder="MiddleName" />
                    </a-col>
                    
                    <a-col :span="18" class="flex justify-start items-center">
                        <p class="font-mono font-bold">LASTNAME: </p>
                    </a-col>
                    <a-col :span="24" class="flex justify-center items-center">
                        <a-input class="text-black bg-yellow-200 border-gray-300 p-3 w-9/12"
                            v-model:value="lastname_typed" placeholder="LastName" />
                    </a-col>

                    <a-col :span="18" class="flex justify-start items-center">
                        <p class="font-mono font-bold">EMAIL: </p>
                    </a-col>
                    <a-col :span="24" class="flex justify-center items-center">
                        <a-input class="text-black bg-yellow-200 border-gray-300 p-3 w-9/12"
                        v-model:value="email_typed"
                            placeholder="email" />
                    </a-col>

                    <a-col :span="18" class="flex justify-start items-center">
                        <p class="font-mono font-bold">PASSWORD: </p>
                    </a-col>
                    <a-col :span="24" class="flex justify-center items-center">
                        <a-input class="text-black bg-yellow-200 border-gray-300 p-3 w-9/12"
                            v-model:value="password_typed" placeholder="password" type="password" disabled/>
                    </a-col>

                    <a-col :span="2" class="pt-2 flex justify-center">
                        <a-button type="ghost" class="p-6 mb-2 rounded-3xl border-2 bg-yellow-200 border-yellow-900 flex items-center"
                            @click="updated">
                            <FormOutlined class="text-3xl text-yellow-900" />
                        </a-button>
                    </a-col>
                </a-row>
            </div>
        </a-flex>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue';

declare function definePageMeta(meta: any): void;
definePageMeta({
    layout: 'usersidebar'
})

const email_typed = ref('');
const password_typed = ref('');
const firstname_typed = ref('');
const middlename_typed = ref('');
const lastname_typed = ref('');
const userId = ref();

onMounted( async () => {
    const storedId = sessionStorage.getItem('targetedID');
    console.log("Stored ID:", storedId); // Check the value retrieved from sessionStorage
    userId.value = storedId ? JSON.parse(storedId) : null;
    console.log("User ID:", userId.value); // Check the value after parsing
    
    const user = await fetch("http://localhost:5000/users/" + userId.value, {
        method: "GET",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
        },
    }).then((res) => res.json());
    console.log(user)
    console.log("TEST USER ==>>")

    if (user) {
        firstname_typed.value = user.firstName
        middlename_typed.value = user.middleName
        lastname_typed.value = user.lastName
        email_typed.value = user.email
        password_typed.value = user.password
    }
    console.log(firstname_typed.value)
});

const updated = async () => { 

    const validate_firstname = firstname_typed.value;
    const validate_middlename = middlename_typed.value;
    const validate_lastname = lastname_typed.value;
    const regex = /^[a-zA-Z]+$/; // Only allow letters
    // FIRSTNAME
    if (!regex.test(validate_firstname)) {
        message.error(`Invalid input for FirstName`);
    }
    // MIDDLENAME
    else if (!regex.test(validate_middlename)) {
        message.error(`Invalid input for MiddleName`);
    }
    // LASTNAME
    else if (!regex.test(validate_lastname)) {
        message.error(`Invalid input for LastName`);
    }
    // proceed to update
    else {
        const gotcha = {
        firstName: firstname_typed.value,
        middleName: middlename_typed.value,
        lastName: lastname_typed.value,
        email: email_typed.value,
        password: password_typed.value
    }

    const data_to_put = await fetch("http://localhost:5000/users/" + userId.value, {
    method: "PUT",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
    },
    body: JSON.stringify(gotcha),
    }).then((res) => res.json());
    message.success("Update Successful!")
    console.log(data_to_put)
    }
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
    height: 45em;
    width: 40em;
}
</style>
