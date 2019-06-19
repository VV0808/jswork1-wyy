<template>
  <section class="index">
    <div class="container">
      <nav>
        <div class="nav-wrapper">
          <ul id="nav-mobile" class="left hide-on-med-and-down" style="width:100%;">
            <router-link
              tag="li"
              class="item"
              v-for="(item,index) in nav"
              :key="index"
              :to="item.link"
            >
              <span class="title">{{item.title}}</span>
            </router-link>
          </ul>
          <ul id="nav-mobile" class="left hide-on-large-only" style="width:100%;">
            <router-link
              tag="li"
              class="item1"
              v-for="(item,index) in nav1"
              :key="index"
              :to="item.link"
            >
              <span class="title1" style="font-size:100%">{{item.title}}</span>
            </router-link>
          </ul>
        </div>
      </nav>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      
    </div>
    <div class="hide-on-med-and-down">
    <footerr></footerr>
    </div>
  </section>
</template>

<script>
  import Footerr from 'components/footer/footerr'
export default {
  name: "test",
  data() {
    return {
      title: "网易云音乐-听见好时光",
      nav: [
        {
          title: "个性推荐",
          link: "/home/recommend"
        },
        {
          title: "歌单",
          link: "/home/playlist"
        },
        {
          title: "主播电台",
          link: "/home/dj"
        },
        {
          title: "排行榜",
          link: "/home/rank"
        },
        {
          title: "歌手",
          link: "/home/singer"
        },
        {
          title: "最新音乐",
          link: "/home/newSong"
        }
      ],
      nav1: [
        {
          title: "推荐",
          link: "/home/recommend"
        },
        {
          title: "歌单",
          link: "/home/playlist"
        },
        {
          title: "电台",
          link: "/home/dj"
        },
        {
          title: "排行",
          link: "/home/rank"
        },
        {
          title: "歌手",
          link: "/home/singer"
        },
        {
          title: "最新",
          link: "/home/newSong"
        }
      ]
    };
  },
  created() {},
  methods: {},
  components: {
     Footerr,
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.index {
  height: 91%;
  position: absolute;
  left: 0px;
  right: 0;
  top: 9%;
  bottom: 0;
  overflow-y: auto;
  // padding: 0 20px;

  .container {
    .nav-wrapper {
      height: 100%;
      background-color: #ffffff;
      color: #4169E1;
      line-height: 60px;
      border-bottom: 1px solid #eee;

      .item {
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;

        .title {
          display: inline-block;
          font-size: 100%;
          height: 100%;
        }

        &.router-link-exact-active, &.router-link-active {
          .title {
            border-bottom: 1px solid $color-theme;
          }
        }
      }

      .item1 {
        display: inline-block;
        padding: 0 1%;
        cursor: pointer;

        &.router-link-exact-active, &.router-link-active {
          .title1 {
            border-bottom: 1px solid $color-theme;
          }
        }
      }
    }
  }
}
</style>
