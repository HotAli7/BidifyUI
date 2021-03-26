import detectEthereumProvider from '@metamask/detect-provider'
import * as constants from '@/utils/constants'
import * as browser from '@/plugins/browser.js'
// import * as walletlink from '~/plugins/walletlink.js'
// import * as walletconnect from '~/plugins/walletconnect.js'

let contract
let activeProvider

// @TODO as users can connect to different wallets, sometimes window.ethereum is different or not there.
// can probably find a library that normalizes this ...
export const Bidify = () => {
  return contract
}

export const Provider = () => {
  return activeProvider
}

// anytime an account change is detected
export const onAccountChange = ({ $store, type, accounts, web3 }) => {
  const account = accounts[0]
  const keepDisconnect = $store.state.localStorage.wallet.keepDisconnect

  // no account, trigger a disconnect (this will fire on startup)
  if (!account || keepDisconnect) {
    $store.commit('wallets/disconnect')
    $store.commit('localStorage/disconnect')
    return
  }

  contract = new web3.eth.Contract(constants.BIDIFY_JSON, constants.BIDIFY_ADDRESS)
  activeProvider = web3

  // connect wallet
  $store.commit('wallets/connected', { account, type })

  // save provider
  $store.commit('localStorage/provider', type)
}

// anytime an account change is detected
export const onChainChange = ({ $store, chainId }) => {
  $store.commit('wallets/chain', chainId)
}

// anytime an account is disconnected
export const onDisconnect = ({ $store }) => {
  disconnect({ $store })
}

// anytime an account change is detected
export const onChainError = ({ $store }) => {
  $store.commit('wallets/chainError')
}

// when user cancels wallet connection
export const onCancel = ({ type, $store }) => {
  $store.commit('wallets/cancel', { type })
}

// error on wallet connection
export const onError = ({ type, $store, err }) => {
  if (err.code === 4001) {
    onCancel({ $store, type })
  }

  $store.commit('wallets/error', err.message)
}

// check wallet connection
export async function checkProvider ({ $store }) {
  const provider = await detectEthereumProvider()

  if (provider.isMetaMask) {
    $store.commit('wallets/hasMetaMask')
  }
}

// check wallet connection
export async function checkConnection ({ $store }) {
  checkProvider({ $store })

  const connections = {}

  connections.browser = await browser.connected()
  // connections.walletconnect = await walletconnect.connected()
  // connections.walletlink = await walletlink.connected()

  let type
  let tick = 0

  if (connections.walletconnect) {
    type = 'walletconnect'
    tick++
  }

  if (connections.walletlink) {
    type = 'walletlink'
    tick++
  }

  if (connections.browser) {
    type = 'browser'
    tick++
  }

  if (type) {
    requestAccounts({ $store, type })
  }

  $store.commit('wallets/connections', tick)
  $store.commit('app/open')
}

// ask for wallet connection
export const requestAccounts = ({ $store, type }) => {
  $store.commit('wallets/pending', type)

  const args = { type, $store, onAccountChange, onChainChange, onChainError, onDisconnect, onError }

  return new Promise((resolve, reject) => {
    if (type === 'browser') {
      browser.request(args)
    } else if (type === 'walletlink') {
      // walletlink.request(args)
    } else if (type === 'walletconnect') {
      // walletconnect.request(args)
    }

    resolve()
  })
}

// disconnect of wallet account, also destroy localStorage
export const disconnect = ({ $store }) => {
  let provider = $store.state.localStorage.wallet.provider

  if (!provider) {
    provider = 'browser'
  }

  return new Promise((resolve, reject) => {
    if (provider === 'browser') {
      browser.close()
    }

    if (provider === 'walletlink') {
      // walletlink.close()
    }

    if (provider === 'walletconnect') {
      // walletconnect.close()
    }

    $store.commit('wallets/disconnect')
    $store.commit('localStorage/disconnect')

    resolve()
  })
}

// manual click of disconnect button ... we remember in LS
export const manualDisconnect = ({ $store, $notify }) => {
  const provider = $store.state.localStorage.wallet.provider
  const hasMetaMask = $store.state.wallets.hasMetaMask

  disconnect({ $store })
    .then(() => {
      // if browser and user has metamask installed, fake the disconnect
      if (hasMetaMask && provider === 'browser') {
        $store.commit('localStorage/keepDisconnect')

        $notify({
          title: 'Disconnected',
          message: 'If you are using MetaMask, you may need to also disconnect from your wallet.',
          type: 'success'
        })
      }
    })
}
