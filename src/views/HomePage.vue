<script setup lang="ts">
import PlanetDestinationManager from '@/components/PlanetDestinationManager.vue'
import TripPlanManager from '@/components/TripPlanManager.vue'

const appName = 'Planet Hopper'
</script>

<template>
  <div class="font-primary bg-background flex h-screen flex-col overflow-y-auto">
    <header
      class="bg-background sticky top-0 z-10 h-[50px] w-full shrink-0 p-3 text-left md:h-[70px] md:p-4 md:text-center"
      aria-label="Application header"
    >
      <h1 class="prose lg:prose-xl text-text-primary text-lg font-bold md:text-3xl">
        {{ appName }}
      </h1>
    </header>

    <div class="container mx-auto md:px-4">
      <div class="grid h-full gap-2 rounded-2xl md:grid-cols-12">
        <main
          class="order-2 h-full overflow-y-auto rounded-2xl p-2 md:order-1 md:col-span-8 md:rounded-lg md:shadow lg:col-span-9"
        >
          <PlanetDestinationManager />
        </main>

        <aside
          class="bg-secondary sticky top-12 order-1 max-h-[400px] px-3 pb-2 md:top-10 md:order-2 md:col-span-4 md:h-[calc(100vh-85px)] md:rounded-lg md:p-4 md:shadow lg:col-span-3"
        >
          <TripPlanManager />
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
