<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import PlanetDestinationList from '@/components/PlanetDestinationList.vue'
import { planetDestinationService } from '@/services/planetDestinationService'
import type { PlanetDestinationAPIResponse, PlanetDestinationExtended } from '@/types'
import { isValidUrl } from '@/utils'
import { useFetch, type AfterFetchContext } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const { createPaginatedApiUrlString: createPaginatedApiUrl, populatePlanetDestinations } =
  planetDestinationService()

const planetDestinationApiUrl = ref(createPaginatedApiUrl())

const {
  isFetching,
  error,
  data: currentPageDestinations,
} = useFetch<PlanetDestinationAPIResponse>(planetDestinationApiUrl, {
  refetch: true,
  afterFetch(ctx: AfterFetchContext<PlanetDestinationAPIResponse>) {
    if (ctx.data) {
      ctx.data.results = populatePlanetDestinations(ctx.data.results || [])
    }

    return ctx
  },
})
  .get()
  .json<PlanetDestinationAPIResponse>()

const allPlanetDestinations = ref<PlanetDestinationExtended[] | null>(null)
watch(currentPageDestinations, (v) => {
  allPlanetDestinations.value = (allPlanetDestinations.value || []).concat(v?.results || [])
})

const onSelectPlanetDestination = (id: PlanetDestinationExtended['id']) => {
  const found = allPlanetDestinations.value?.find((pd) => pd.id === id)
  if (!found) return

  found.isSelected = true
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

  // TODO: handle error case
}
</script>

<template>
  <div class="flex w-full flex-col space-y-2">
    <PlanetDestinationList
      v-if="allPlanetDestinations !== null"
      class="w-full"
      :planetDestinationsWithState="allPlanetDestinations"
      @selectPlanetDestination="onSelectPlanetDestination"
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
