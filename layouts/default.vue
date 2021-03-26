<template>
  <div class="layout is-white is-min-height">
    <Nav />

    <Nuxt v-if="waiting === false" />

    <!-- <el-dialog
      title="Wrong Network"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="40%"
    >
      <span>Change network to Mainnet and refresh the page.</span>
    </el-dialog> -->

    <client-only>
      <CheckConnection />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  computed: {
    waiting () {
      if (process.server) {
        return false
      }

      // show content only if app is done waiting and localstorage is instantiated
      return this.$store.state.app.waiting && !this.$store.state.localStorage.status
    },
    pending () {
      return this.$store.state.wallets.pending
    },
    error () {
      return this.$store.state.wallets.error
    },
    dialogVisible () {
      return this.$store.state.wallets.chainInvalid
    }
  },
  watch: {
    error (newError, oldError) {
      if (newError) {
        this.$notify({
          title: 'Error',
          message: newError,
          type: 'error'
        })

        this.$store.commit('wallets/error', false)
      }
    }
  }
}
</script>
