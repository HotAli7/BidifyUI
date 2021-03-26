/* eslint-disable */

import { Bidify, Provider } from './wallets'
import * as constants from '@/utils/constants'

// Convert to a usable value
function atomic(value, decimals) {
  let quantity = decimals
  if (value.indexOf('.') !== -1) {
    quantity -= value.length - value.indexOf('.') - 1
  }
  let atomicized = value.replace('.', '')
  for (let i = 0; i < quantity; i++) {
    atomicized += '0'
  }
  while (atomicized[0] === '0') {
    atomicized = atomicized.substr(1)
  }
  return atomicized
}

// Convert to a human readable value
function unatomic(value, decimals) {
  value = value.padStart(decimals + 1, '0')
  let temp = (
    value.substr(0, value.length - decimals) +
    '.' +
    value.substr(value.length - decimals)
  )
  while (temp[0] === '0') {
    temp = temp.substr(1)
  }
  while (temp.endsWith('0')) {
    temp = temp.slice(0, -1)
  }
  if (temp.endsWith('.')) {
    temp = temp.slice(0, -1)
  }
  if (temp == '') {
    return '0'
  }
  return temp
}

// When currency is null, it's ETH

// Get the decimals of an ERC20
async function getDecimals(currency) {
  if (!currency) {
    return 18
  }

  return await (new Provider().eth.Contract(constants.ERC20JSON, currency)).methods.decimals().call()
}

// Get how many decimals Bidify uses with an ERC20
async function getDecimalAccuracy(currency) {
  return Math.min(await getDecimals(currency), 4)
}


// Get the 'price unit' of an ERC20
// An ERC20 which Bidify uses 4 decimals of has a price unit of 0.0001
// Every price value will be a multiple of this
export async function getPriceUnit(currency) {
  let decimals = await getDecimals(currency)
  if (!currency) {
    currency = '0x0000000000000000000000000000000000000000'
  }
  return unatomic(await Bidify().methods.getPriceUnit(currency).call(), decimals)
}

// Get the minimum price Bidify will use in relation to an ERC20
export async function getMinimumPrice(currency) {
  let decimals = await getDecimals(currency)
  if (!currency) {
    currency = '0x0000000000000000000000000000000000000000'
  }
  return unatomic(
    (new Provider().utils.BN(await Bidify().methods.getPriceUnit(currency).call()))
      .mul(new Provider().utils.BN(20)).toString(),
    decimals
  )
}

// List an ERC71. Returns the auction ID
// string, string, string, string, 0 < int <= 30
export async function list(currency, platform, token, price, days, allowMarketplace) {
  let decimals = await getDecimals(currency)
  if (!currency) {
    currency = '0x0000000000000000000000000000000000000000'
  }

  await (new Provider().eth.Contract(ERC721JSON, platform)).methods.approve(BidifyAddress, token).send({ from })
  return (await Bidify().methods.list(
    currency, platform, token, atomic(price, decimals), days,
    '0x0000000000000000000000000000000000000000', allowMarketplace
  ).send({ from })).events.ListingCreated.returnValues[0]
}

export async function getListing(id) {
  function nullIfZeroAddress(value) {
    if (value === '0x0000000000000000000000000000000000000000') {
      return null
    }
    return value
  }

  let raw = await Bidify().methods.getListing(id).call()
  let currency = nullIfZeroAddress(raw.currency)

  let highBidder = nullIfZeroAddress(raw.highBidder)
  let currentBid = raw.price
  let nextBid = await Bidify().methods.getNextBid(id).call()
  let decimals = await getDecimals(currency)
  if (currentBid === nextBid) {
    currentBid = null
  } else {
    currentBid = unatomic(currentBid, decimals)
  }

  let referrer = nullIfZeroAddress(raw.referrer)
  let marketplace = nullIfZeroAddress(raw.marketplace)

  let bids = []
  for (let bid of await Provider().eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: BidifyAddress,
    topics: [
      '0xdbf5dea084c6b3ed344cc0976b2643f2c9a3400350e04162ea3f7302c16ee914',
      '0x' + (new Provider().utils.BN(id)).toString('hex').padStart(64, '0')
    ]
  })) {
    bids.push({
      bidder: '0x' + bid.topics[2].substr(-40),
      price: unatomic((new Provider().utils.BN(bid.data.substr(2), 'hex')).toString(), decimals)
    })
  }

  return {
    id,
    creator: raw.creator,
    currency,
    platform: raw.platform,
    token: raw.token,

    highBidder,
    currentBid,
    nextBid: unatomic(nextBid, decimals),

    referrer,
    allowMarketplace: raw.allowMarketplace,
    marketplace,

    endTime: raw.endTime,
    paidOut: raw.paidOut,

    bids
  }
}

export async function bid(id) {
  if ((await getListing(id)).currency === null) {
    await Bidify().methods.bid(id, '0x0000000000000000000000000000000000000000').send({ from, value: await Bidify().methods.getNextBid(id).call() })
  } else {
    await (
      new Provider().eth.Contract(ERC20JSON, (await getListing(id)).currency)
    ).methods.approve(BidifyAddress, await Bidify().methods.getNextBid(id).call()).send({ from })
    await Bidify().methods.bid(id, '0x0000000000000000000000000000000000000000').send({ from })
  }
}

export async function getListings(creator, platform) {
  let creatorTopic = null
  if (creator) {
    creatorTopic = '0x' + creator.substr(2).toLowerCase().padStart(64, '0')
  }

  let platformTopic = null
  if (platform) {
    platformTopic = '0x' + platform.substr(2).toLowerCase().padStart(64, '0')
  }

  let res = []
  for (let listing of await Provider().eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: BidifyAddress,
    topics: [
      '0xb8160cd5a5d5f01ed9352faa7324b9df403f9c15c1ed9ba8cb8ee8ddbd50b748',
      null,
      creatorTopic,
      platformTopic
    ]
  })) {
    res.push((new Provider().utils.BN(listing.topics[1].substr(2), 'hex')).toString())
  }
  return res
}

export async function finish(id) {
  await Bidify().methods.finish(id).send({ from })
}

export async function getETHBalance(from) {
  return unatomic((await Bidify().methods.balanceOf(from).call()) || '0', 18)
}

export async function withdraw() {
  await Bidify().methods.withdraw(from).send({ from })
}
