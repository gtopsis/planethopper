<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import PlanetDestinationList from '@/components/PlanetDestinationList.vue'
import {
  createPaginatedApiUrlString,
  populatePlanetDestinations,
} from '@/services/planetDestinationService'
import { usePlanetHopperStore } from '@/stores/planetHopperStore'
import type { PlanetDestinationAPIResponse, PlanetDestinationExtended } from '@/types'
import { areUrlsSimilar } from '@/utils/shared'
import { useFetch, type AfterFetchContext } from '@vueuse/core'
import { computed, onMounted, watch } from 'vue'

const planetDestinationStore = usePlanetHopperStore()

const nextPageUrl = computed(() => planetDestinationStore.planetDestinationApiNextPageUrl)
const {
  isFetching,
  error,
  data: currentPageDestinations,
  execute,
} = useFetch<PlanetDestinationAPIResponse>(nextPageUrl, {
  immediate: false,
  afterFetch(ctx: AfterFetchContext<PlanetDestinationAPIResponse>) {
    if (ctx.data) {
      const resultsWithValidDestinations = (ctx.data.results || []).filter(
        (pd) => pd.name !== 'unknown',
      )
      ctx.data.results = populatePlanetDestinations(resultsWithValidDestinations)
    }

    return ctx
  },
})
  .get()
  .json<PlanetDestinationAPIResponse>()

watch(currentPageDestinations, (v) => {
  planetDestinationStore.addPlanetDestinations(v?.results || [])
  planetDestinationStore.setPlanetDestinationApiNextPageUrl(v?.next)
})

const onSelectPlanetDestination = (id: PlanetDestinationExtended['id']) => {
  planetDestinationStore.selectPlanetDestinationWithId(id)
}

const fetchMorePlanetDestinations = () => {
  // THA (greek): continue building the alternative way of handling manually the pagination (playing with curr/next page numbers)
  if (
    nextPageUrl.value &&
    typeof nextPageUrl.value === 'string' &&
    areUrlsSimilar(nextPageUrl.value, createPaginatedApiUrlString())
  ) {
    execute()
  }
}

onMounted(() => {
  if (planetDestinationStore.totalPlanetDestinations.length === 0) {
    execute()
  }
})
</script>

<template>
  <div class="prose lg:prose-xl flex w-full flex-col space-y-2">
    <p
      v-if="planetDestinationStore.totalPlanetDestinations.length > 0"
      class="px-2 py-1 text-center"
    >
      <small class="text-tertiary"
        >Choose up to 5 destinations among
        {{ planetDestinationStore.totalPlanetDestinations.length }} for you trip plan</small
      >
    </p>

    <PlanetDestinationList
      v-if="planetDestinationStore.totalPlanetDestinations !== null"
      class="w-full"
      :planet-destinations-with-state="planetDestinationStore.totalPlanetDestinations"
      @select-planet-destination="onSelectPlanetDestination"
    />

    <ErrorAlert v-if="error" :error="error" />

    <div v-else class="flex w-full justify-center py-2">
      <BaseButton
        v-if="!isFetching"
        theme="primary"
        aria-label="Load more destinations to planets"
        :disabled="nextPageUrl === ''"
        @click="fetchMorePlanetDestinations"
      >
        <IconDownload class="mr-2" size="sm" />
        <span>Fetch more planets</span>
      </BaseButton>

      <div v-else-if="!error" class="flex items-center justify-center space-x-2">
        <BaseSpinner size="sm" />
        <span> fetching planets </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
