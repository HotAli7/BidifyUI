<template>
  <div class="page">
    <Promo :items="items" />

    <div class="fomo">

      <h3>Tests</h3>

      <br/>
      <br/>

      <!-- Investigating plugin breakdown here -->
      <a class="el-button" @click="getETHBalance">Check Eth Balance</a>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  async asyncData ({ $content, params }) {
    const items = await $content('fpo/promoted').fetch()

    return { items }
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    wallet () {
      return this.$store.state.wallets
    }
  },
  methods: {
    getETHBalance () {
      const Bidify = require('~/plugins/bidify.js')

      const account = this.$store.state.wallets.account

      Bidify.getETHBalance(account)
        .then((resp) => {
          console.log(resp)
        })
    }
  }
}
</script>

<style scoped lang="stylus">
  .fomo
    margin 32px auto
    padding 32px
    background-color #f4f4f4

</style>
