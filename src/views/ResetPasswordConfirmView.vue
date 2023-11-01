<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    <a class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <img class="w-14 h-14 mr-2" src="@/assets/logo.png" alt="logo">
          Lavista    
      </a>
    <div class="rounded-lg border border-dotted p-5 text-center bg-slate-200 shadow-lg w-full md:w-1/2">
        <Suspense>
            <template #default>
                <ConfirmReset />
            </template>
            <template #fallback>
                <TextLineSkeleton />
            </template>
        </Suspense>
    </div>
  </div>
</section>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { defineAsyncComponent } from 'vue';
import TextLineSkeleton from '@/components/skeleton/TextLineSkeleton.vue'

const ConfirmReset = defineAsyncComponent(() =>
    import ("@/components/Admin/HitConfirmReset.vue")
)

useHead({
    title: 'Reset Password Confirmation',
    meta: [
        {
            name: 'description',
            content: 'Reset password confirmation for admin not for you :!!!!!'
        }
    ]
})

</script>