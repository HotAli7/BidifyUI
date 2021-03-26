<template>
  <div class="nav">
    <div class="app-nav">
      <NuxtLink class="nav-logo" to="/">
        <span class="logo">
          <Bidify class="logo-svg" />
        </span>
      </NuxtLink>

      <div class="search-input">
        <el-input v-model="searchInput" placeholder="Search by creator, collection, or keyword">
          <el-button slot="prepend" icon="el-icon-search" class="is-round" />
        </el-input>
      </div>
    </div>

    <div class="nav-actions">
      <button class="nav-profile el-button el-button--link is-round">
        <span>Explore</span>
      </button>

      <button class="nav-profile el-button el-button--link is-round">
        <span>My Items</span>
      </button>

      <NuxtLink v-if="!wallet.connected" tag="button" class="nav-profile el-button el-button--info is-round" to="/connect">
        <span>Connect</span>
      </NuxtLink>

      <el-popover
        v-else
        placement="bottom"
        title="Title"
        width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <el-button slot="reference" class="is-round" type="info">
          Connected
        </el-button>

        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item @click="disconnect()">
          Disconnect
        </el-dropdown-item>
      </el-popover>
    </div>
  </div>
</template>

<script>
import Bidify from '~/assets/logos/Bidify.svg?inline'

export default {
  name: 'Connected',
  components: {
    Bidify
  },
  data () {
    return {
      searchInput: ''
    }
  },
  computed: {
    wallet () {
      return this.$store.state.wallets
    }
  },
  methods: {
    disconnect () {
      const wallets = require('~/plugins/wallets.js')

      wallets.manualDisconnect({ $store: this.$store, $notify: this.$notify })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .nav
    background-color $white
    width 100%
    display flex
    justify-content space-between
    align-items center
    position relative
    z-index 1000
    border-bottom 1px rgba(0,0,0,0.1) solid

  .app-nav
    display flex
    justify-content flex-start
    align-items center

  .logo
    padding $space-xs 24px
    display block
    fill $dark

  .logo-svg
    width auto
    height 60px
    position relative
    top 3px
    fill $dark

  .search-input
    width 450px

  .nav-actions
    padding 0 16px

  .el-button+.el-button
    margin-left 0
</style>
