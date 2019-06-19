<template>
  <transition name="slide">
    <section class="singer-detail">
      <div class="container">
        <div class="hide-on-med-and-down">
          <div class="header">
            <img v-lazy="artistDesc.img1v1Url" class="avatar">
            <div class="info">
              <div class="name">
                <span class="label">歌手</span>
                {{artistDesc.name}}
                <small class="alias">{{alias}}</small>
              </div>
              <div class="num">单曲数：{{artistDesc.musicSize}}</div>
              <div class="num">专辑数：{{artistDesc.albumSize}}</div>
              <div class="num">MV数：{{artistDesc.mvSize}}</div>
            </div>
            <button
              class="btn waves-effect waves-light"
              @click="goback"
              type="submit"
              name="action"
              style="background-color:#4169E1;margin-left:220px"
            >后退</button>
          </div>
        </div>
        <div class="hide-on-large-only">
          <div class="header1">
            <div class="top1">
              <img
                v-lazy="artistDesc.img1v1Url"
                class="avatar1"
                style="width:25%;height:70px;border-radius:50%;margin-top:3%;margin-bottom:3%"
              >
            </div>
            <Collapse accordion>
              <Panel>
                {{artistDesc.name}}
                <div slot="content">
                  {{alias}}
                  <Collapse accordion>
                    <Panel>
                      单曲数
                      <p
                        slot="content"
                      >{{artistDesc.musicSize}}</p>
                    </Panel>
                    <Panel>
                      专辑数
                      <p
                        slot="content"
                      >{{artistDesc.albumSize}}</p>
                    </Panel>
                    <Panel>
                      MV数
                      <p
                        slot="content"
                      >{{artistDesc.mvSize}}</p>
                    </Panel>
                  </Collapse>
                </div>
              </Panel>
            </Collapse>
            
          </div>
        </div>
        <div class="hide-on-med-and-down">
        <div class="tab">
          <div class="tab-header">
            <ul class="left">
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/album'" class="item" >专辑</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/mv'" class="item" >MV</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/desc'" class="item" >歌手详情</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/relate'" class="item" >相似歌手</router-link>
            </ul>
            <div class="right"></div>
          </div>
          <div class="tab-body">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
        </div>
        <div class="hide-on-large-only">
          <div class="tab" style="margin-top:5%;font-size:11px">
          <div class="tab-header">
            <ul class="left" style="width:100%">
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/album'" class="item" style="width:15%">专辑</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/mv'" class="item" style="width:15%">MV</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/desc'" class="item" style="width:15%">详情</router-link>
              <router-link tag="li" :to="'/home/singer/'+artistDesc.id+'/relate'" class="item" style="width:30%">相似歌手</router-link>
            </ul>
            <div class="right"></div>
          </div>
          <div class="tab-body">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { CODE } from "api/config";
import { getArtistSongs } from "api/singer";
import { mapGetters } from "vuex";
export default {
  name: "singer-detail",
  data() {
    return {
      title: "歌手详情",
      artistDesc: "",
      hotSongs: []
    };
  },
  computed: {
    ...mapGetters(["singer"]),
    alias() {
      if (this.artistDesc) {
        return this.artistDesc.alias.join(" /");
      } else {
        return "";
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$route.params.id) {
        vm.$router.push("/home/singer");
        return;
      }
      vm._getArtistSongs(vm.$route.params.id);
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    _getArtistSongs(id) {
      getArtistSongs(id).then(res => {
        if (res.code === CODE) {
          this.artistDesc = res.artist;
          this.hotSongs = res.hotSongs;
          console.log(this.hotSongs);
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.singer-detail {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0px;
  background: #fff;
  overflow: auto;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    display: flex;
    padding: 20px;

    .avatar {
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        font-size: 18px;

        .label {
          display: inline-block;
          width: 40px;
          line-height: 20px;
          text-align: center;
          background: $color-theme;
          color: #fff;
          border-radius: 2px;
          margin-right: 10px;
          font-size: 14px;
        }

        .alias {
          margin-left: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .header1 {
    width: 100%;
    height: 30%;

    .top1 {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar1 {
        display: block;
      }
    }

  }

  .tab {
    .tab-header {
      height: 30px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $color-theme;
      padding: 0 20px;
      background: #fff;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;

      .left {
        .item {
          display: inline-block;
          width: 83px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;

          &.router-link-exact-active {
            background: $color-theme;
            color: #fff;
          }
        }
      }
    }

    .tab-body {
      padding: 20px;
    }
  }
}
</style>
