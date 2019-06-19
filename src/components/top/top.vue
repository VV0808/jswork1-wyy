<template>
  <section class="top">
    <div class="row">
      <div class="col s2">
        <div class="logo-wrapper">
          <span class="icon-logo" @click="value2 = true" type="primary"></span>
          <Drawer placement="left" :closable="false" v-model="value2">
            <navigation></navigation>
          </Drawer>
          <!-- <router-link tag="span" to="/home" class="lin">
            <span class="icon-logo"></span>
          </router-link>-->
        </div>
      </div>
      <div class="col s8">
        <div class="search-wrapper">
          <search-box :placeholder="placeholder" @query="search"></search-box>
        </div>
      </div>
      <div class="col s2">
        <div class="right">
          <div class="user" v-if="!userInfo">
            <i class="icon-people" @click="login"></i>
          </div>
          <div class="user" v-else>
            <router-link tag="span" to="/profile" class="lin">
              <img class="touxiang" :src="userInfo.profile.avatarUrl" alt>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SearchBox from "base/search-box/search-box";
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import Navigation from "components/navigation/navigation";
export default {
  name: "test",
  data() {
    return {
      title: "顶部导航",
      placeholder: "搜索音乐,歌手,歌词,用户",
      value2: false,
      nav: {
        推荐: [
          {
            icon: "icon-music",
            title: "发现音乐",
            link: "/home"
          },
          {
            icon: "icon-FM",
            title: "私人FM",
            link: "/fm"
          }
        ],
        我的音乐: [
          {
            icon: "icon-fav",
            title: "我的歌单",
            link: "/cloud"
          },
          {
            icon: "icon-fav",
            title: "我的电台",
            link: "/cloud"
          },
          {
            icon: "icon-fav",
            title: "我的关注列表",
            link: "/cloud"
          },
          {
            icon: "icon-fav",
            title: "我的粉丝列表",
            link: "/cloud"
          },
          {
            icon: "icon-fav",
            title: "我的动态",
            link: "/cloud"
          },
          {
            icon: "icon-fav",
            title: "播放记录",
            link: "/cloud"
          },
          {
            icon: "icon-cloud",
            title: "我的音乐云盘",
            link: "/cloud"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {},
  methods: {
    ...mapMutations({
      showLogin: "SHOW_LOGIN",
      setKeyword: "SET_KEYWORD"
    }),
    login() {
      this.showLogin(true);
    },
    search(query) {
      this.setKeyword(query);
      this.$router.push({ path: "/search" });
    }
  },
  components: {
    SearchBox,
    Navigation
  },
  mounted() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.top {
  height: 9%;
  width: 100%;
  background: $color-theme;
  color: #fff;

  .row {
    height: 100%;
    margin-bottom: 0px;

    .col {
      height: 100%;

      &.s2 {
        height: 100%;
        position: relative;

        .right {
          position: absolute;
          top: 5%;
          height: 100%;
          width: 100%;
          color: $color-background-ll;

          .user {
            height: 100%;
            width: 100%;
            position: relative;

            .icon-people {
              position: absolute;
              top: 20%;
              left: 20%;
              font-size: 180%;
              // line-height: 150%;
            }

            .touxiang {
              position: absolute;
              top: 10%;
              left: 20%;
              background: #eee;
              border-radius: 50%;
              height: 30px;
              width: 30px;
            }
          }
        }

        .logo-wrapper {
          .icon-logo {
            position: absolute;
            top: 10%;
            font-size: 250%;
          }
          
        }
      }

      &.s8 {
        height: 100%;
        position: relative;

        .search-wrapper {
          position: absolute;
          top: 25%;
          width: 100%;
          height: 50%;
          flex: 1;
        }
      }
    }
  }
}
</style>
