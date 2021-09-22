<template>
  <el-dialog
    :visible.sync="showModal"
    label-width="0px"
    class="success-modal"
  >
    <div class="container">
      <el-button class="btn-close" type="default" circle @click="cancel()">
        <i class="el-icon-close icon" />
      </el-button>
      <section v-if="form.auction" class="success-container">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h4 class="success-title text-center">Thanks For Your {{ form.type === 'bid' ? "Bid" : form.type === 'finish' ? "Finish" : "List" }}</h4>
            </div>
            <div class="col-12">
              <div class="auction-image">
                <img
                  :src="form.auction.image_preview_url"
                  alt=""
                >
              </div>
            </div>
            <div class="col-12">
              <div class="auction-content">
                <div class="auction-meta mb-0">
                  <div class="auction-info">
                    <h5 class="collection-name">
                      {{ form.auction.collection && form.auction.collection.name }}
                    </h5>
                    <h5 class="auction-name">
                      {{ form.auction.name }}
                    </h5>
                    <p>Before you leave, We'd love to hear your feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogSuccess',
  data () {
    return {
      auction: null
    }
  },
  computed: {
    bidAction () {
      return this.$store.state.bidify.bidding
    },
    showModal () {
      return this.$store.state.bidify.successModal ? true : null
    },
    form () {
      const auction = this.$store.state.bidify.successModal

      if (!auction) {
        return {}
      }
      return auction
    }
  },
  methods: {
    cancel () {
      this.$store.commit('bidify/successModal', false)
      this.refetchListing()
    },
    refetchListing () {
      this.$router.go()
    }
  }
}
</script>

<style lang="stylus">
</style>
