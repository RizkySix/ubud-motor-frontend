<template>
    <span :class="textClass">
      <slot />
    </span>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    variant: String
  })
  
  const textClass = computed(() => {
    switch (props.variant) {
      case 'variant1':
        return 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-red-600 bg-clip-text text-transparent'
      case 'variant2':
        return 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-red-600 to-gray-500 bg-clip-text text-transparent'
      default:
        return 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-red-600 bg-clip-text text-transparent'
    }
  });
  </script>
  