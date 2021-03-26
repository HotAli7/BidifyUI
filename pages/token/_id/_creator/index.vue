<template>
  <div v-if="item" class="contents">
    <el-row :gutter="32">
      <el-col :span="18">
        <div class="drop-contents">

            <div v-if="item.type === 'video'" class="media is-video">
              <video
                autoplay=""
                class="AssetMedia--video"
                controlslist="nodownload"
                loop=""
                preload="auto"
                :src="item.media">
                </video>
            </div>

            <div v-else class="media is-image">
              <el-image
                style="width: 100%; height: 100%"
                class="image"
                :src="item.media"
                fit="scale-down">
                </el-image>
            </div>

        </div>
      </el-col>

      <el-col :span="6" class="drop-details">
        <article>
          <h3>{{item.title}}</h3>

          <p>
            {{item.description}}
          </p>
        </article>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Token',
  components: {

  },
  async asyncData ({ $content, params }) {
    const address = params.id.split(':')[0]
    // const token = params.id.split(':')[1]

    const data = await $content('fpo/promoted').where({ address }).fetch()

    const item = data.length ? data[0] : null

    return { item, params }
  },
  data () {
    return {
      item: {}
    }
  }
}
</script>

<style scoped lang="stylus">
  .contents
    position relative
    z-index 2000

  .el-row
    height 100vh
    max-height -webkit-fill-available

  .el-col,
  .drop-details
    height 100%

  .drop-contents
    max-width 800px
    margin auto
    height 80vh
    padding 64px 0

  .drop-details
    border-left 1px rgba(0,0,0,0.1) solid
    padding 32px
    padding-left 32px !important
    padding-right 32px !important

  .media
    width 100%
    height 100%

    img, video
      max-width 100%

  article
    p
      margin 8px 0

</style>
