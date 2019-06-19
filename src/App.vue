<template>
 
  <div id="app">
    <top></top>
    <!-- <navigation></navigation> -->
    <keep-alive>
      <router-view ref="container"></router-view>
    </keep-alive>
    <login v-show="loginFlag"></login>
  </div>
  
</template>
<script>
  import Top from 'components/top/top'
  import Navigation from 'components/navigation/navigation'
  import Login from 'components/login/login'

  import {mapGetters, mapMutations} from 'vuex'
  import {getStore, removeStore} from 'common/js/common'
  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'loginFlag',
        'playingLyric',
        'lyricFlag',
        'mv',
      ]),
    },
    created(){
      if (document.cookie) {
        this.setUserInfo(JSON.parse(getStore('userInfo')))
      } else {
        removeStore('userInfo')
      }

    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO',
        setMv: 'SET_MV'
      }),
      closeVideo(){
        this.setMv('')
      },
    },
    components: {
      Top,
      Navigation,
      Login,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    height 100%
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow hidden
    background #fff
</style>
