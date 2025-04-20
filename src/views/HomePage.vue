<script setup lang="ts">
const appName = 'Planet Hopper'
</script>

<template>
  <div class="prose lg:prose-xl font-primary bg-background grid min-h-screen grid-rows-[auto_1fr]">
    <header class="bg-background sticky top-0 p-4 text-left md:text-center">
      <h1 class="text-text-primary text-2xl font-bold">{{ appName }}</h1>
    </header>

    <div class="main-container container mx-auto md:px-4">
      <div class="grid gap-2 md:grid-cols-12">
        <main
          class="bg-surface order-2 p-4 md:order-1 md:col-span-8 md:rounded-lg md:shadow"
        ></main>

        <aside
          class="bg-surface sticky top-0 order-1 p-4 md:order-2 md:col-span-4 md:rounded-lg md:shadow"
        ></aside>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.main-container {
  margin: 0 auto;
}
</style>
