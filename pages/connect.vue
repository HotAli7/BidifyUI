<template>
  <div class="container is-full-screen is-narrow">

    <div class="wrap">

      <div class="heading">
        <h2>
          Connect Your Wallet
        </h2>

        <p>
          Connect with available wallet providers or create a new wallet.
        </p>
      </div>

      <div class="button-list">
        <el-button v-if="hasMetaMask" type="primary" @click="connect('browser')">
          <i v-if="pending === 'browser'" class="el-icon-loading icon" />
          <span v-else class="icon" v-html="iconMetamask" />
          Metamask
        </el-button>

        <el-button type="primary" @click="connect('walletconnect')">
          <i v-if="pending === 'walletconnect'" class="el-icon-loading icon" />
          <span v-else class="icon" v-html="iconWalletconnect" /> WalletConnect
        </el-button>

        <el-button type="primary" @click="connect('walletlink')">
          <i v-if="pending === 'walletlink'" class="el-icon-loading icon" />
          <span v-else class="icon" v-html="iconCoinbase" /> Coinbase Wallet
        </el-button>

        <el-button type="primary" @click="disconnect()">
          Later
        </el-button>
      </div>

      <div class="foot">
        <p>
          Connecting your wallet allows us to verify your tokens. We do not own your private keys and cannot access your funds without permission.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import iconMetamask from '~/assets/icons/metamask.svg?raw'
import iconWalletconnect from '~/assets/icons/walletconnect.svg?raw'
import iconCoinbase from '~/assets/icons/coinbase.svg?raw'

export default {
  name: 'Connect',
  components: {

  },
  data () {
    return { iconMetamask, iconWalletconnect, iconCoinbase }
  },
  computed: {
    pending () {
      return this.$store.state.wallets.pending
    },
    hasMetaMask () {
      return this.$store.state.wallets.hasMetaMask
    }
  },
  methods: {
    connect (type) {
      const wallets = require('~/plugins/wallets.js')

      // clicking connect resets any trickery with app display
      this.$store.commit('localStorage/resetDisconnect')

      if (type === 'walletlink' && this.$device.isMobile) {
        window.location = 'https://go.cb-w.com/FbK5uGRIIeb'
        return
      }

      wallets.requestAccounts({
        $store: this.$store,
        type
      })
    },
    disconnect () {
      this.$store.commit('wallets/disconnect')
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    height 80vh

  .heading
    h2
      font-size 26px
      margin-bottom 0px

    p
      margin-bottom 24px

  .foot
    font-size 14px
    color rgba(0,0,0,0.65)

    a
      color rgba(0,0,0,0.65)

      &:hover
        color $white

</style>
