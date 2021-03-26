import { VALID_CHAINS } from '@/utils/constants'

export const state = () => ({
  connecting: false, // user is viewing connect wallet overlay
  connected: false, // user wallet was successfully connected
  connections: 0, // a count of active connections ... not used in UI yet
  account: null, // walletId string
  provider: null, // provider ... browser, walletlink, walletconnect
  chainId: null, // chainId (network) string or integer
  chainInvalid: false, // chainId (network) is mainnet
  chainError: false, // something went wrong with network
  pending: false, // pending wallet confirmation through dapp, browser, etc
  error: false, // wallet connection went bad (usually means they canceled)
  hasMetaMask: false // boolean to show metamask button if theys got it
})

export const mutations = {
  connecting (state, account) {
    state.connecting = true
    state.error = false
  },
  connected (state, { account, type }) {
    state.account = account
    state.provider = type

    state.connecting = false
    state.pending = false
    state.error = false
    state.connected = true
  },
  connections (state, connections) {
    state.connections = connections
  },
  pending (state, type) {
    state.pending = type
  },
  cancel (state) {
    state.pending = false
  },
  hasMetaMask (state) {
    state.hasMetaMask = true
  },
  error (state, error) {
    state.pending = false
    state.error = error
  },
  disconnect (state) {
    state.connecting = false
    state.validating = false
    state.connected = false
    state.account = null
    state.chainId = null
    state.chainInvalid = false
    state.chainError = false
    state.pending = false
    state.error = false
  },
  chain (state, chainId) {
    state.chainInvalid = !['0x1', 'main', 1].includes(chainId)

    state.chainId = chainId
  },
  chainError (state) {
    state.chainError = true
  }
}
