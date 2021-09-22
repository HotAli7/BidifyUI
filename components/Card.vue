<template>
  <div class="auction-item">
    <NuxtLink class="card-link" :to="`/listing/${ item.listing_id }/${ item.platform }/${ item.token }`">
      <div class="nft-image">
        <img
          :src="item.image_preview_url"
          alt=""
        >
      </div>
      <div class="nft-meta">
        <span>
          Fluf World
        </span>
        <span>
          <img
            src="~/assets/icons/auction-hammer.svg"
            alt=""
          >
          {{ hours }} hrs left
        </span>
      </div>
      <div class="auction-meta border-bottom pt-3">
        <h5 class="auction-title">
          {{ item.label }}
        </h5>
        <span>
          <img
            src="~/assets/icons/ethereum-icon.svg"
            alt=""
          >
          {{ item.nextBid }} ETH
        </span>
      </div>
      <div class="auction-balance pt-3">
        <p><span>Top Bidding Price:</span><span>0</span></p>
        <p><span>Last Bidding Price:</span><span>0</span></p>
      </div>
      <div class="auction-action mt-3">
        <button v-if="time !== 'Ended'" type="button" class="btn btn-block bidify-button bid-button">
          place a bid
        </button>
        <span v-else class="btn btn-block ended-button">
          {{ time }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import RealtimeCountdown from 'realtime-countdown'

export default {
  name: 'Card',
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
      this.days = t.days
      this.hours = t.hours
      this.minutes = t.minutes
      this.seconds = t.seconds
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
