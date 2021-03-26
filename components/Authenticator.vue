<template>
  <span />
</template>

<script>
export default {
  name: 'Authenticator',
  components: {

  },
  computed: {
    validated () {
      return this.$store.state.localStorage.wallet.balance
    }
  },
  watch: {
    validated (newConnected, oldConnected) {
      if (!newConnected) {
        this.$router.push({ path: '/' })
      }
    }
  },
  mounted () {
    if (!this.validated) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
