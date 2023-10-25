<template>
   <div class="text-2xl md:text-4xl font-bold mb-2 shadow-lg py-5">
        <span class="relative">
            <span class="bg-gradient-to-r from-blue-600 via-slate-600 to-purple-950 bg-clip-text text-transparent">
                <slot name="default" />
            </span>
            <span class="absolute inset-0 bg-purple-800 bg-clip-text text-transparent hover:bg-transparent hover:text-blue-600 transition duration-300">
                <slot name="gradient" />
            </span>
        </span>

       
    </div>
</template>

<script setup>

</script>