<template>
  <div>
    <!-- Page preloader-->
    <div v-if="loading" class="page-loader">
      <div class="page-loader-body">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
          <div class="spinner-layer spinner-red">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
          <div class="spinner-layer spinner-yellow">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
          <div class="spinner-layer spinner-green">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page-->
    <div v-if="list" class="page">
      <Nav />
      <section class="section">
        <div class="range range-condensed">
          <div class="cell-lg-7 cell-xl-8 reveal-lg-flex">
            <div class="box-auction-large-left bg-primary">
              <div class="box-auction-large-inner">
                <div class="heading-group">
                  <p class="heading-3 text-elight">
                    online
                  </p>
                  <h1>auction</h1>
                  <p class="heading-3 text-elight">
                    for the whole family
                  </p>
                </div>
                <p class="heading-5">
                  Online Auction is where everyone goes to shop, sell,
                  <br class="veil reveal-sm-inline">
                  and give, while discovering variety and affordability.
                </p>
              </div>
            </div>
          </div>
          <div class="cell-lg-5 cell-xl-4">
            <div class="box-auction-wrap">
              <p class="heading-4 text-elight text-center">
                Latest Listed Auctions
              </p>
              <div v-for="item in list.slice(list.length - 1, list.length)" :key="item.index" class="box-auction-minimal-left bg-gray-darker" :class="(item.index == 0)?'box-auction-minimal-left bg-gray-darker':'box-auction-minimal-right bg-secondary-2'">
                <div class="box-auction-inner">
                  <img
                    :src="item.image_preview_url"
                    alt=""
                  >
                </div>
                <div class="box-auction-inner box-auction-inner-content">
                  <div class="box-auction-title">
                    <NuxtLink :to="`/listing/${ item.listing_id }/${ item.platform }/${ item.token }`">
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                  <div class="divider divider-secondary divider-sm" />
                  <div class="product-price">
                    <p>Current Price</p>
                    <h6>{{ item.nextBid }} ETH</h6>
                  </div>
                </div>
              </div>
              <div v-for="item in list.slice(list.length - 2, list.length - 1)" :key="item.index" class="box-auction-minimal-right bg-secondary-2">
                <div class="box-auction-inner">
                  <img
                    :src="item.image_preview_url"
                    alt=""
                  >
                </div>
                <div class="box-auction-inner box-auction-inner-content">
                  <div class="box-auction-title">
                    <NuxtLink :to="`/listing/${ item.listing_id }/${ item.platform }/${ item.token }`">
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                  <div class="divider divider-secondary divider-sm" />
                  <div class="product-price">
                    <p>Current Price</p>
                    <h6>{{ item.nextBid }} ETH</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-lg bg-gray-lighter text-center">
        <div class="shell shell-wide">
          <h3>Current Auctions</h3>
          <div class="divider divider-default" />
          <Listings :list="list" type="listing" />
          <nuxt-link
            class="button button-secondary"
            to="listing"
          > view all auctions </nuxt-link>
        </div>
      </section>
      <!-- Page Footer-->
      <Footer />
    </div>
    <!-- PANEL-->
    <!-- END PANEL-->
    <!-- Global Mailform Output-->
    <div id="form-output-global" class="snackbars" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    list () {
      return this.$store.state.localStorage.listings.list
    }
  },
  mounted () {
    setTimeout(() => {
      this.fetchListings()
    }, 500)
  },
  methods: {
    async fetchListings () {
      const listings = require('~/plugins/listings.js')

      this.$nuxt.$loading.start()
      this.loading = true
      try {
        await listings.get(this)
      } catch (error) {
        console.log('error - ', error)
      }

      this.loading = false
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
