<template>
  <div class="page">
    <Nav />

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
  </div>
</template>

<script>
export default {
  name: 'Owned',
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

      await listings.getOwnedListings(this)
      await listings.getOwnedNFTs(this)

      this.$nuxt.$loading.finish()
    }
  }
}
</script>
