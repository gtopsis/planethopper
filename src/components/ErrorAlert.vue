<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  error: string | null
}
const props = defineProps<Props>()

const message = computed(() => props.error || 'Something wrong happened. Please try again!')
</script>

<template>
  <div class="border-error text-error border-l-4 bg-orange-100 p-4" role="alert">
    <h3 class="text-lg font-bold">An error occurred</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style lang="css" scoped></style>
