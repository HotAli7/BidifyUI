<template>
  <div class="product product-counter product-auction">
    <NuxtLink class="card-image" :to="`/listing/${ item.listing_id }/${ item.platform }/${ item.token }`">
      <div class="product-counter-inner">
        <div
          class="countdown"
          data-time="2017/10/10 14:34:56"
          data-format="MM/DDHMS"
          data-type="until"
          data-layout="{dn} {dl} {hnn}{sep}{mnn}{sep}{snn}"
        >
          {{ time }}
        </div>
      </div>
      <div class="product-image">
        <img
          :src="item.image_preview_url"
          alt=""
          style="width: 331px; height: 245px; object-fit: cover;"
          width="331"
          height="245"
        >
      </div>
      <div class="product-title">
        <h5>
          {{ item.label }}
        </h5>
      </div>
      <div class="product-price-wrap">
        <div class="product-price">
          <h6>{{ item.nextBid }} ETH</h6>
        </div>
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
      time: 0
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
