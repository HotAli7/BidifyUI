<template>
  <div class="auction-item">
    <NuxtLink class="card-link" :to="`/listing/${ item.listing_id }/${ item.platform }/${ item.token }`">
      <div class="nft-image">
        <img
          :src="item.image_preview_url"
          alt=""
        >
      </div>
      <div class="auction-meta pt-2">
        <h5 class="auction-title">
          {{ item.label }}
        </h5>
      </div>
      <div class="auction-balance pb-3">
        <span>Price:</span>
        <span class="auction-price">{{ item.nextBid }} ETH</span>
      </div>
      <div class="auction-limit border-bottom pb-3">
        <div class="auction-limit-time">
          <span>{{ days }}</span>
          <span>{{ hours }}</span>
          <span>{{ minutes }}</span>
          <span>{{ seconds }}</span>
        </div>
        <div class="auction-limit-label">
          <span>Days</span>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
      <div class="auction-action mt-3">
        <button type="button" class="btn btn-block bidify-button bid-button">
          place a bid
        </button>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import RealtimeCountdown from 'realtime-countdown'

export default {
  name: 'CardB',
  props: {
    item: Object,
    type: String
  },
  data () {
    return {
      time: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  mounted () {
    this.timeLeft()
  },
  methods: {
    setTimeLeft (t) {
      if (t.days === '0') {
        this.time = `${t.hours}h ${t.minutes}m ${t.seconds}s`
        return
      }

      if (t.hours === '0') {
        this.time = `${t.minutes}m ${t.seconds}s`
        return
      }

      if (t.minutes === '0') {
        this.time = `${t.seconds}s`
        return
      }
      this.days = t.days
      this.hours = t.hours
      this.minutes = t.minutes
      this.seconds = t.seconds
      this.time = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`
    },
    timeLeft () {
      const timeStamp = this.item.endTime * 1000

      const onCountInitialized = t => this.setTimeLeft(t)

      const onCount = t => this.setTimeLeft(t)

      const onCountEnd = (t) => {
        this.time = 'Ended'
      }

      return new RealtimeCountdown({ timeStamp, onCountInitialized, onCount, onCountEnd })
    }
  }
}
</script>
