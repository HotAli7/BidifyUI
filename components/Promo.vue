<template>
  <div class="card-wrap is-promo">
    <el-carousel trigger="click" height="360px" indicator-position="outside" :autoplay="false">
      <el-carousel-item v-for="group in grouped" :key="group.id">
        <el-row class="carousel-row" :gutter="8">
          <el-col
            v-for="item in group.items"
            :key="item.id"
            :xs="4"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="11">
            <div class="grid-content bg-purple-light">
              <NuxtLink :to="`/token/${item.address}:${item.token}/${item.creator}`" class="card-link">
                <el-card :body-style="{ padding: '0px' }">
                  <el-image
                    style="width: 100%; height: 200px"
                    class="image"
                    :src="item.thumbnail"
                    fit="cover"></el-image>
                  <div style="padding: 14px;">
                    <span>{{item.title}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{item.price}} {{item.units}}</time>
                    </div>
                  </div>
                </el-card>
              </NuxtLink>
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
const chunk = (arr, size) => {
  const groups = {}

  for (let i = 0; i < arr.length; i += size) {
    groups[i] = {
      items: arr.slice(i, i + size),
      id: i
    }
  }

  return groups
}

export default {
  name: 'Slides',
  components: {

  },
  props: ['items'],
  computed: {
    grouped () {
      if (!this.items) {
        return []
      }

      return chunk(this.items, 4)
    }
  }
}
</script>

<style lang="stylus">
  .card-wrap
    .image
      max-width 100%

    .carousel-row
      padding $space-l

    .card-link
      text-decoration none

    .el-carousel__item h3
      color #475669
      font-size 14px
      opacity 0.75
      line-height 150px
      margin 0

    .el-carousel__item:nth-child(2n)
      background-color #99a9bf

    .el-carousel__item:nth-child(2n+1)
      background-color #d3dce6

</style>
