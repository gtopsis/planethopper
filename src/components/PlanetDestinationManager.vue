<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import PlanetDestinationList from '@/components/PlanetDestinationList.vue'
import { planetDestinationService } from '@/services/planetDestinationService'
import { usePlanetHopperStore } from '@/stores/planetHopperStore'
import type { PlanetDestinationAPIResponse, PlanetDestinationExtended } from '@/types'
import { isValidUrl } from '@/utils/shared'
import { useFetch, type AfterFetchContext } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

const { createPaginatedApiUrlString: createPaginatedApiUrl, populatePlanetDestinations } =
  planetDestinationService()
const planetDestinationStore = usePlanetHopperStore()

const planetDestinationApiUrl = ref(createPaginatedApiUrl())

const {
  isFetching,
  error,
  data: currentPageDestinations,
  execute,
} = useFetch<PlanetDestinationAPIResponse>(planetDestinationApiUrl, {
  immediate: false,
  refetch: true,
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
})

const onSelectPlanetDestination = (id: PlanetDestinationExtended['id']) => {
  planetDestinationStore.selectPlanetDestinationWithId(id)
}

const paginationNextPageUrlString = computed(() => currentPageDestinations.value?.next)
const fetchMorePlanetDestinations = () => {
  if (
    paginationNextPageUrlString.value &&
    typeof paginationNextPageUrlString.value === 'string' &&
    isValidUrl(paginationNextPageUrlString.value, createPaginatedApiUrl())
  ) {
    planetDestinationApiUrl.value = paginationNextPageUrlString.value
  }
}

onMounted(() => {
  if (planetDestinationStore.totalPlanetDestinations.length === 0) {
    execute()
  }
})
</script>

<template>
  <div class="flex w-full flex-col space-y-2">
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
        :disabled="paginationNextPageUrlString === null"
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
