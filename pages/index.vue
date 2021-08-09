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
                <a
                  class="button button-secondary"
                  href="registration-page.html"
                >register now</a>
              </div>
            </div>
          </div>
          <div class="cell-lg-5 cell-xl-4">
            <div class="box-auction-wrap">
              <div v-for="item in list.slice(0, 1)" :key="item.index" class="box-auction-minimal-left bg-gray-darker" :class="(item.index == 0)?'box-auction-minimal-left bg-gray-darker':'box-auction-minimal-right bg-secondary-2'">
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
              <div v-for="item in list.slice(1, 2)" :key="item.index" class="box-auction-minimal-right bg-secondary-2">
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
      <section class="section section-lg text-center">
        <div class="shell-wide">
          <h3>how it works</h3>
          <div class="divider divider-default" />
          <div class="range range-xs-center range-50">
            <div class="cell-sm-9 cell-md-6 cell-lg-3">
              <div
                class="thumbnail-classic unit unit-sm-horizontal unit-md-vertical unit-md-horizontal unit-lg-vertical"
              >
                <div class="thumbnail-classic-icon unit-left">
                  <span class="icon">01</span>
                </div>
                <div class="thumbnail-classic-caption unit-body">
                  <h6 class="thumbnail-classic-title">
                    register
                  </h6>
                  <hr class="divider divider-default divider-sm">
                  <p class="thumbnail-classic-text">
                    To start using our auction, you’ll need to register. It’s
                    completely free!
                  </p>
                </div>
              </div>
            </div>
            <div class="cell-sm-9 cell-md-6 cell-lg-3">
              <div
                class="thumbnail-classic unit unit-sm-horizontal unit-md-vertical unit-md-horizontal unit-lg-vertical"
              >
                <div class="thumbnail-classic-icon unit-left">
                  <span class="icon">02</span>
                </div>
                <div class="thumbnail-classic-caption unit-body">
                  <h6 class="thumbnail-classic-title">
                    Buy or Bid
                  </h6>
                  <hr class="divider divider-default divider-sm">
                  <p class="thumbnail-classic-text">
                    You can instantly buy or place a bid on a desired product
                    right after registration.
                  </p>
                </div>
              </div>
            </div>
            <div class="cell-sm-9 cell-md-6 cell-lg-3">
              <div
                class="thumbnail-classic unit unit-sm-horizontal unit-md-vertical unit-md-horizontal unit-lg-vertical"
              >
                <div class="thumbnail-classic-icon unit-left">
                  <span class="icon">03</span>
                </div>
                <div class="thumbnail-classic-caption unit-body">
                  <h6 class="thumbnail-classic-title">
                    Submit a Bid
                  </h6>
                  <hr class="divider divider-default divider-sm">
                  <p class="thumbnail-classic-text">
                    Submitting a bid is fast and easy. The process takes
                    approximately 5 minutes.
                  </p>
                </div>
              </div>
            </div>
            <div class="cell-sm-9 cell-md-6 cell-lg-3">
              <div
                class="thumbnail-classic unit unit-sm-horizontal unit-md-vertical unit-md-horizontal unit-lg-vertical"
              >
                <div class="thumbnail-classic-icon unit-left">
                  <span class="icon">04</span>
                </div>
                <div class="thumbnail-classic-caption unit-body">
                  <h6 class="thumbnail-classic-title">
                    Win
                  </h6>
                  <hr class="divider divider-default divider-sm">
                  <p class="thumbnail-classic-text">
                    Easily win at our auction and enjoy owning the product you
                    dream of.
                  </p>
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
          >view all auctions</nuxt-link>
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

      await listings.get(this)

      this.loading = false
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
