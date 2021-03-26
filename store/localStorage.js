export const state = () => ({
  wallet: {
    provider: null, // if this exists, app will use it try to reconnect and ignore other connections
    keepDisconnect: false, // metamask doesn't really disconnect ... this prevents loading the app as connected, even though it is
    expire: 2 // hours
  }
})

export const mutations = {
  provider (state, provider) {
    state.wallet.provider = provider
  },
  disconnect (state) {
    state.wallet.provider = null
  },
  keepDisconnect (state) {
    state.wallet.keepDisconnect = true
  },
  resetDisconnect (state) {
    state.wallet.keepDisconnect = false
  }
}
