
<template>
  <div>
    <!-- The modal component body -->
    <button @click="emits('confirm')">Confirm</button>
    <button @click="emits('cancel')">Cancel</button>
  </div>
</template>

<script setup>
  const emits = defineEmits(['confirm', 'cancel'])
</script>
