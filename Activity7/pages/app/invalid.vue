<template>
    <div class="frame">
        <a-flex class="bg-gradient-to-r from-gray-200 to-brown-400 border-4 flex flex-col items-center p-4 rounded-full">
            <p class="text-xl text-center font-mono font-bold">
                "Access Denied! If you need assistance or believe this is a mistake, please contact support. Thanks for your understanding!"
            </p>
            <a-button class="mt-4 text-xl font-mono font-bold border-2 border-black bg-gray-100 flex items-center" 
                type="ghost"
                @click="$router.push('../')"
                >
                Back to login
            </a-button>
        </a-flex>
    </div>
</template>

<script>
</script>

<style scoped>
.frame{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>