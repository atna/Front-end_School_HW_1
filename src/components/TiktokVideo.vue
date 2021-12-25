<template>
  <div class="tiktok-video">
    <div class="tiktok-video__container">
      <video
        :poster="poster"
        :class="['tiktok-video__player', {'is-loaded': loaded}]"
        @click="togglePlay"
        ref="videoRef"
        loop
        playsinline
      >
      </video>
      <div class="tiktok-video__loader placeholder-shimmer"></div>
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        @click="togglePlay"
        v-show="!playing"
        class="tiktok-video__control"
      >
        <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#fff" />
      </svg>
    </div>
    <img
        v-if="muted"
        @click="toggleMute"
        class="tiktok-video__mute-control"
        src="../assets/volume_off_black_24dp.svg"
        alt="Mute"
        width="24"
        height="24"
        role="button"
      >
      <img
        v-else
        @click="toggleMute"
        class="tiktok-video__mute-control"
        src="../assets/volume_mute_black_24dp.svg"
        alt="Unmute"
        width="24"
        height="24"
        role="button"
      >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'TiktokVideo',
  props: {
    url: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const videoRef = ref<null | HTMLVideoElement>(null)
    const loaded = ref(false)
    const playing = ref(false)
    const muted = ref(false)
    const play = () => {
      if (videoRef.value) {
        const videoEl = videoRef.value

        videoEl.play().catch(() => {
          videoEl.muted = true
          muted.value = true
          videoEl.play()
        }).finally(() => {
          playing.value = true
        })
      }
    }
    const pause = () => {
      if (videoRef.value) {
        videoRef.value.pause()
        playing.value = false
      }
    }
    const togglePlay = () => {
      if (playing.value) {
        pause()
      } else {
        play()
      }
    }
    const toggleMute = () => {
      if (!videoRef.value) {
        return
      }

      muted.value = !muted.value
      videoRef.value.muted = muted.value
    }
    const loadAndPlay = () => {
      if (!videoRef.value) {
        return
      }

      videoRef.value.setAttribute('src', props.url)
      videoRef.value.addEventListener('loadeddata', () => {
        loaded.value = true
        play()
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          pause()
          return
        }

        if (loaded.value) {
          play()
        } else {
          loadAndPlay()
        }
      }, {
        root: null,
        rootMargin: '60px',
        threshold: 0.99
      }
    )

    onMounted(() => {
      nextTick(() => {
        if (videoRef.value) {
          observer.observe(videoRef.value)
        }
      })
    })
    return {
      videoRef,
      togglePlay,
      loaded,
      playing,
      muted,
      toggleMute
    }
  }
})
</script>

<style lang="scss" scoped>
.tiktok-video {
    position: relative;
    height: calc(450px + (100vw - 768px) / 1152 * 100);
    aspect-ratio: 9 / 16;

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  &__player {
    height: 100%;
    width: 100%;
    object-fit: cover;

    &.is-loaded ~ {
      .tiktok-video__loader {
        display: none;
      }

      .tiktok-video__control {
        display: block;
      }
    }
  }

  &__control {
    display: none;
    position: absolute;
    top: calc(50% - 35px);
    left: calc(50% - 35px);
    width: 90px;
    height: 90px;
    z-index: 10;
  }

  &__mute-control {
    position: absolute;
    bottom: 0;
    right: 100%;
    margin-right: 8px;
    cursor: pointer;
  }
}
</style>
