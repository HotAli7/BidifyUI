<template>
  <!-- Page Header-->
  <header class="section page-header">
    <!-- RD Navbar-->
    <div class="rd-navbar-wrap rd-navbar-shop-header">
      <nav
        class="rd-navbar rd-navbar-original rd-navbar-static"
        data-layout="rd-navbar-fixed"
        data-sm-layout="rd-navbar-fixed"
        data-md-layout="rd-navbar-fullwidth"
        data-md-device-layout="rd-navbar-fixed"
        data-lg-layout="rd-navbar-static"
        data-lg-device-layout="rd-navbar-static"
        data-md-stick-up-offset="100px"
        data-lg-stick-up-offset="150px"
        data-stick-up="true"
        data-sm-stick-up="true"
        data-md-stick-up="true"
        data-lg-stick-up="true"
      >
        <div class="rd-navbar-top-panel">
          <div class="rd-navbar-nav-wrap">
            <!-- RD Navbar Nav-->
            <ul class="rd-navbar-nav">
              <li :class="$router.history.current.path == '/'?'active':''">
                <NuxtLink to="/">
                  Home
                </NuxtLink>
              </li>
              <li :class="$router.history.current.path == '/about'?'active':''">
                <NuxtLink to="/about">
                  About Us
                </NuxtLink>
              </li>
              <li :class="$router.history.current.path == '/listing'?'active':''">
                <NuxtLink to="/listing">
                  Explore
                </NuxtLink>
              </li>
              <li :class="$router.history.current.path == '/owned'?'active':''">
                <NuxtLink to="/owned">
                  My Auctions
                </NuxtLink>
              </li>
              <li>
                <el-dropdown v-if="connected" trigger="click" @command="handleCommand">
                  <el-button type="default" class="is-themed" :circle="true">
                    <i class="el-icon-user" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown" style="width: 280px;">
                    <div class="balance">
                      <div class="simple-list">
                        <h5>
                          Wallet

                          <span class="truncate">
                            {{ address }}
                          </span>
                        </h5>

                        <div class="simple-list-item">
                          <div class="label">
                            <small>Balance</small>

                            <span>{{ balances.ether }} ETH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <el-dropdown-item divided command="disconnect">
                      Disconnect
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <el-button v-else type="info" :round="true" @click="connect()">
                  Connect
                </el-button>
              </li>
            </ul>
          </div>
        </div>
        <div class="rd-navbar-inner">
          <!-- RD Navbar Panel-->
          <div class="rd-navbar-panel">
            <!-- RD Navbar Toggle-->
            <button
              class="rd-navbar-toggle"
              data-rd-navbar-toggle=".rd-navbar-nav-wrap"
            >
              <span />
            </button>
            <!-- RD Navbar Brand-->
            <div class="rd-navbar-brand">
              <NuxtLink class="brand-name" to="/">
                <BidifyIcon class="logo-svg" />
              </NuxtLink>
            </div>
          </div>
          <div class="rd-navbar-aside-center">
            <!-- RD Navbar Search-->
            <div class="rd-navbar-search">
              <a
                class="rd-navbar-search-toggle"
                data-rd-navbar-toggle=".rd-navbar-search"
                href="#"
              ><span /></a>
              <form
                class="rd-search"
                action="/listing"
                data-search-live="rd-search-results-live"
                method="GET"
              >
                <div
                  class="rd-mailform-inline rd-mailform-sm rd-mailform-inline-modern"
                >
                  <div class="rd-mailform-inline-inner">
                    <div class="form-wrap form-wrap-icon mdi-magnify">
                      <input
                        id="rd-navbar-search-form-input"
                        class="rd-navbar-search-form-input form-input"
                        type="text"
                        name="s"
                        autocomplete="off"
                        placeholder="Search..."
                        :value="$router.history.current.query.s"
                        @input="inputSearchKey($event)"
                      >
                      <div class="rd-search-results-live" />
                    </div>
                    <button
                      class="rd-search-form-submit rd-search-form-submit-icon mdi mdi-magnify"
                    />
                    <button
                      class="rd-search-form-submit button form-button button-sm button-secondary"
                    > search </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="rd-navbar-aside-right" />
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import BidifyIcon from '~/assets/logos/Bidify.svg?inline'

export default {
  name: 'Connected',
  components: {
    BidifyIcon
  },
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    balances (type) {
      const balances = Object.assign({}, this.$store.state.wallets.balances)

      if (!balances) {
        return
      }

      Object.keys(balances).forEach((b) => {
        balances[b] = Number.parseFloat(balances[b]).toFixed(3)
      })

      return balances
    },
    connected () {
      return this.$store.state.wallets.connected
    },
    address () {
      return this.$store.state.wallets.account
    }
  },
  methods: {
    connect () {
      const wallets = require('~/plugins/wallets.js')

      // clicking connect resets any trickery with app display
      this.$store.commit('localStorage/resetDisconnect')

      wallets.requestAccounts({
        $store: this.$store,
        type: 'browser'
      })
    },
    disconnect () {
      const wallets = require('~/plugins/wallets.js')

      wallets.manualDisconnect({ $store: this.$store, $notify: this.$notify })
    },
    inputSearchKey (e) {
      this.searchKey = e.target.value
    },
    dark () {
      this.$colorMode.preference = 'dark'
    },
    light () {
      this.$colorMode.preference = 'light'
    },
    handleNavCommand (command) {
      this.$router.push(command)
    },
    handleCommand (command) {
      this[command]()
    },
    toggleColorMode () {
      this.$colorMode.preference = 'white'
    }
  }
}
</script>

<style lang="stylus" scoped>

  .simple-list
    padding $space-s $space-m
    border-bottom none

    h5
      font-size 18px

  .simple-list-item
    border-bottom none

  h5
    margin-bottom $space-m

    span
      font-weight normal
      text-transform none

  .balance
    padding 0

    span
      font-size 12px
      color $grey

  .el-dropdown
    margin-left $space-m

    +for_breakpoint(xs sm)
      margin-left $space-xs

  .el-dropdown-menu
    .el-dropdown-menu__item
      position relative

    .el-badge__content
      position absolute
      right $space-m
      top $space-s

  .nav
    background-color $dark
    width 100%
    display flex
    justify-content space-between
    align-items center
    position relative
    z-index 1000
    overflow hidden

    .el-button
      font-family objektiv-mk1, sans-serif
      text-decoration none

    .el-button.el-button--text
      margin-left 0

    .el-button.is-profile
      margin-left 16px

  .nav-logo-wrap
    padding $space-s $space-m
    display block

  .logo-svg
    width auto
    height 50px
    position relative
    top 3px

  .nav-actions
    padding 0 16px
</style>
