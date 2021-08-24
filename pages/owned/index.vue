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
    <div v-if="owned" class="page">
      <Nav />

      <!-- Breadcrumbs-->
      <section class="breadcrumbs-custom breadcrumbs-custom-svg bg-gradient breadcrumbs-background-01">
        <div class="shell">
          <p class="breadcrumbs-custom-subtitle">
            Auction Catalog
          </p>
          <p class="heading-1 breadcrumbs-custom-title">
            Explore
          </p>
          <ul class="breadcrumbs-custom-path">
            <li>Home</li>
            <li class="active">
              Explore
            </li>
          </ul>
        </div>
      </section>

      <!-- product catalog-->
      <section class="section section-lg text-center">
        <div class="shell-wide">
          <h3>your nft auctions</h3>
          <div class="divider divider-default" />

          <Listings :list="owned" type="listing" />
        </div>
      </section>
      <section class="section section-lg text-center">
        <div class="shell-wide">
          <h3>not listed</h3>
          <div class="divider divider-default" />

          <Listings :list="nfts" type="nft" />
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
  name: 'Owned',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    owned () {
      return this.$store.state.localStorage.listings.owned
    },
    nfts () {
      return this.$store.state.localStorage.listings.nfts
    }
  },
  mounted () {
    setTimeout(() => {
      this.fetchListings()
    })
  },
  methods: {
    async fetchListings () {
      const listings = require('~/plugins/listings.js')

      this.$nuxt.$loading.start()
      this.loading = true
      
      try {
        await listings.getOwnedListings(this)
        await listings.getOwnedNFTs(this)
      } catch (error) {
        console.log('error - ', error)
      }

      this.loading = false
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
