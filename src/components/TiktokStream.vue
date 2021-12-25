<template>
  <div class="tiktok-stream">
    <div
      v-if="data.length > 0"
      class="tiktok-stream__list"
    >
      <tiktok-post
        v-for="(item) in data"
        :post="item"
        :key="item.id"
      />
    </div>
    <div
      v-else
      class="tiktok-stream__warning"
    >
      Failed to load data :( <br>
      Please <a href="/">reload</a> the page
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue'
import TiktokPost from './TiktokPost.vue'
import { FeedItem } from '@/types/FeedItem.interface'

export default defineComponent({
  name: 'TiktokStream',
  props: {
    data: {
      type: Array as PropType<FeedItem[]>,
      required: true
    }
  },
  components: {
    TiktokPost
  }
})
</script>

<style lang="scss" scoped>
.tiktok-stream {
  &__list {
    display: grid;
    row-gap: 64px;
    max-width: 600px;
    margin: auto;
  }

  &__warning {
    padding: 36vh 32px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
