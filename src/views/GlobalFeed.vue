<template>
  <div class="home-page">
    <McvBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeed :api-url="apiUrl"/>
        </div>
        <div class="col-md-3">
          <McvPopularTags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvPopularTags from '@/components/PopularTags'
import McvBanner from '@/components/Banner'

  export default {
    name: 'McvGlobalFeed',
    components: {
      McvFeed,
      McvPopularTags,
      McvBanner,
    },
    data () {
      return {
        apiUrl: '/articles',
      }
    }
  }
</script>
