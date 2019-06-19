<template>
  <section class="recommend">
    <div class="hide-on-med-and-down">
      <div class="carousel-wrapper">
        <carousel :autoplay="false" type="card" height="220px">
          <carousel-item class="el-carousel__item" v-for="item in list">
            <img v-bind:src="item.name" class="banner-img">
            <span class="title" :style="'background: '+item.titleColor">{{item.typeTitle}}</span>
          </carousel-item>
        </carousel>
      </div>
    </div>
    <div class="hide-on-large-only">
      <div class="swiper-container" style="width:100%;height:40%;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in list">
            <img :src="item.name" alt width="100%">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="channel">
      <h5 class="title">
        <span>推荐歌单</span>
        <span class="loadMore">
          更多
          <i class="icon-right"></i>
        </span>
      </h5>
      <div class="hide-on-med-and-down">
        <ul class="list">
          <router-link
            tag="li"
            :to="'/songListDetail?id='+item.id"
            class="item"
            v-for="(item,index) in personalizedList"
            :key="index"
          >
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="icon">
              <img class="avatar" v-lazy="item.picUrl">
              <div class="playCount">
                <span class="icon-play"></span>
                {{item.playCount | numToWan}}
              </div>
            </div>
            <div class="name">{{item.name}}</div>
          </router-link>
        </ul>
      </div>
      <div class="hide-on-large-only">
        <ul class="list1">
          <router-link
            tag="li"
            :to="'/songListDetail?id='+item.id"
            class="item"
            v-for="(item,index) in personalizedList"
            :key="index"
            v-if="index<3"
          >
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="icon">
              <img class="avatar" v-lazy="item.picUrl">
              <div class="playCount">
                <span class="icon-play"></span>
                {{item.playCount | numToWan}}
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>

    <div class="channel private">
      <h5 class="title">
        <span>独家放送</span>
        <span class="loadMore">
          更多
          <i class="icon-right"></i>
        </span>
      </h5>
      <div class="hide-on-med-and-down">
        <ul class="list">
          <li class="item" v-for="(item,index) in privateContentList" :key="index">
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="icon">
              <img class="avatar" v-lazy="item.picUrl">
            </div>
            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="hide-on-large-only">
        <ul class="list2">
          <li class="item1" v-for="(item,index) in privateContentList" :key="index" v-if="index>0">
            <div class="item">
              <div class="copywriter">{{item.copywriter}}</div>
              <div class="icon">
                <img class="avatar" v-lazy="item.picUrl">
              </div>
            </div>
            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="channel newSong">
      <h5 class="title">
        <span>最新音乐</span>
        <span class="loadMore">
          更多
          <i class="icon-right"></i>
        </span>
      </h5>
      <div class="hide-on-med-and-down">
        <ul class="list">
          <li class="item" v-for="(item,index) in newSongList" @click="selectSong(item,index)">
            <div class="num">{{index+1}}</div>
            <div class="icon">
              <img class="avatar" v-lazy="item.image">
              <span class="icon-play"></span>
            </div>
            <div class="name">
              <div class>{{item.name}}</div>
              <div class="singer">
                <!-- <router-link
                  @click.stop.prevent
                  tag="span"
                  to="/mvDetail"
                  v-if="item.mv"
                  class="icon-play label"
                ></router-link> -->
                {{item.singer}}
              </div>
            </div>
            <!-- <loading v-if="item.id==currentSong.id"></loading> -->
          </li>
        </ul>
      </div>
      <div class="hide-on-large-only">
        <ul class="list1">
          <li
            class="item"
            v-for="(item,index) in newSongList"
            :key="index"
            v-if="index<4"
            @click="selectSong(item,index)"
          >
            <div class="num">{{index+1}}</div>
            <div class="icon">
              <img class="avatar" v-lazy="item.image">
              <span class="icon-play"></span>
            </div>
            <div class="name">
              <div class>{{item.name}}</div>
              <div class="singer">
                <router-link
                  @click.stop.prevent
                  tag="span"
                  to="/mvDetail"
                  v-if="item.mv"
                  class="icon-play label"
                ></router-link>
                {{item.singer}}
              </div>
            </div>
            <!-- <loading v-if="item.id==currentSong.id"></loading> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="channel mv">
      <h5 class="title">
        <span>推荐MV</span>
        <span class="loadMore">
          更多
          <i class="icon-right"></i>
        </span>
      </h5>
      <div class="hide-on-med-and-down">
        <ul class="list">
          <li class="item" v-for="item in mvList">
            <div class="copywriter">{{item.copywriter}}</div>
            <div class="icon" @click="selectMv(item)">
              <img class="avatar" v-lazy="item.picUrl">
              <div class="playCount">
                <span class="icon-play"></span>
                {{item.playCount | numToWan}}
              </div>
            </div>
            <div class="name">
              <div class>{{item.name}}</div>
              <div class="singer">
                <span v-for="artist in item.artists" @click="selectArtist(artist)">{{artist.name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hide-on-large-only">
        <ul class="list" style="height:60px">
          <li
            class="item"
            v-for="(item,index) in mvList"
            :key="index"
            v-if="index<3"
            style="width:30%"
          >
            <div class="copywriter" style="font-size: 9px;line-height: 9px;">{{item.copywriter}}</div>
            <div class="icon" @click="selectMv(item)" style="height:100%">
              <img class="avatar" v-lazy="item.picUrl" style="height:100%">
              <div class="playCount">
                <span class="icon-play"></span>
                {{item.playCount | numToWan}}
              </div>
            </div>
            <!-- <div class="name">
              <div class>{{item.name}}</div>
              <div class="singer">
                <span v-for="artist in item.artists" @click="selectArtist(artist)">{{artist.name}}</span>
              </div>
            </div>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="channel dj">
      <h5 class="title">
        <span>主播电台</span>
        <span class="loadMore">
          更多
          <i class="icon-right"></i>
        </span>
      </h5>
      <div class="hide-on-med-and-down">
        <ul class="list">
          <li class="item" v-for="(item,index) in djList" @click="selectDJ(item,index)">
            <div class="icon">
              <img class="avatar" v-lazy="item.image">
              <span class="icon-play"></span>
            </div>
            <div class="name">
              <div class="text">{{item.name}}</div>
              <div class="desc">{{item.album}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hide-on-large-only">
        <ul class="list">
          <li
            class="item"
            v-for="(item,index) in djList"
            :key="index"
            v-if="index<2"
            @click="selectDJ(item,index)"
          >
            <div class="icon">
              <img class="avatar" v-lazy="item.image">
              <span class="icon-play"></span>
            </div>
            <!-- <div class="name">
            <div class="text">{{item.name}}</div>
            <div class="desc">{{item.album}}</div>
            </div>-->
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "base/carousel/carousel";
import CarouselItem from "base/carousel-item/carousel-item";
import Loading from "base/aniPlaying/aniPlaying";
import { CODE } from "api/config";
import {
  getPersonalized,
  getPrivateContent,
  getNewSong,
  getPersonalizedMV,
  getDJ
} from "api/index";
import { getSongURL } from "api/detail";
import { createNewSong, createDJ } from "common/js/song";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import scrollReveal from "scrollreveal";
export default {
  name: "recommend",
  data() {
    return {
      title: "个性推荐",
      banner: [],
      personalizedList: [], //推荐歌单
      privateContentList: [],
      newSongList: [],
      mvList: [],
      djList: [],
      list: [
        {
          name:
            "https://p1.music.126.net/s4LSylwIdEyURj_8LruNtA==/109951164120088055.jpg"
        },
        {
          name:
            "https://p1.music.126.net/b9lCexiqERmUVUHWUJVQ7A==/109951164118169359.jpg"
        },
        {
          name:
            "https://p1.music.126.net/rXN6bXqgkBWCngxOLdwQ2A==/109951164118154923.jpg"
        },
        {
          name:
            "https://p1.music.126.net/BI6D0luP6s7rbGr2792KNg==/109951164120088598.jpg"
        },
        {
          name:
            "https://p1.music.126.net/4Y_YU3UiYvHMXnGb5StGXw==/109951164118177834.jpg"
        }
      ],
      scrollReveal: scrollReveal()
    };
  },
  computed: {
    ...mapGetters(["currentSong"])
  },
  created() {
    this._getPersonalized();
    this._getPrivateContent();
    this._getNewSong();
    this._getPersonalizedMV();
    this._getDJ();
  },
  methods: {
    _getPersonalized() {
      getPersonalized().then(res => {
        if (res.code === CODE) {
          this.personalizedList = res.result;
        }
      });
    },
    _getPrivateContent() {
      getPrivateContent().then(res => {
        if (res.code === CODE) {
          this.privateContentList = res.result;
        }
      });
    },
    _getNewSong() {
      getNewSong().then(res => {
        if (res.code === CODE) {
          this.newSongList = this._normalizeSongs(res.result);
          this.newSongList.forEach(song => {
            getSongURL(song.id).then(res => {
              if (res.code === CODE) {
                song.url = res.data[0].url;
              }
            });
          });
          console.log(this.newSongList);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.id) {
          ret.push(createNewSong(musicData.song));
        }
      });
      return ret;
    },
    _getPersonalizedMV() {
      getPersonalizedMV().then(res => {
        if (res.code === CODE) {
          this.mvList = res.result;
          console.log(this.mvList);
        }
      });
    },
    _getDJ() {
      getDJ().then(res => {
        if (res.code === CODE) {
          this.djList = this._normalizeDJ(res.result);
          this.djList.forEach(song => {
            getSongURL(song.id).then(res => {
              if (res.code === CODE) {
                song.url = res.data[0].url;
              }
            });
          });
          console.log(this.djList);
        }
      });
    },
    _normalizeDJ(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.id) {
          ret.push(createDJ(musicData.program.mainSong));
        }
      });
      return ret;
    },
    selectSong(item, index) {
      //设置播放列表
      this.selectPlay({
        list: this.newSongList,
        index
      });
    },
    selectMv(item) {
      this.$router.push({ path: "/mvDetail", query: { mvid: item.id } });
    },
    selectDJ(item, index) {
      this.selectPlay({
        list: this.djList,
        index
      });
    },
    selectArtist(item) {
      this.$router.push({ path: "/home/singer/" + item.id });
    },
    ...mapActions(["selectPlay"]),
    ...mapMutations({
      setMV: "SET_MV"
    })
  },
  components: {
    Loading,
    Carousel,
    CarouselItem
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: 3000,
      speed: 2,
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      },
      onClick: function(swiper) {
        alert("你点了Swiper");
        alert(mySwiper.realIndex); //当前索引
      }
    });
    this.scrollReveal.reveal(".rev", {
      // 动画的时长
      duration: 100,
      // 延迟时间
      delay: 1,
      // 动画开始的位置，'bottom', 'left', 'top', 'right'
      origin: "top",
      // 回滚的时候是否再次触发动画
      reset: false,
      // 在移动端是否使用动画
      mobile: false,
      // 滚动的距离，单位可以用%，rem等
      distance: "200px",
      // 其他可用的动画效果
      opacity: 0.001,
      easing: "linear",
      scale: 0.9
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';

.recommend {
  max-width: 100%;
  margin: auto;

  .index-carousel {
    .tuijian {
      margin-left: 225px;
    }
  }

  .carousel-wrapper {
    margin: 20px auto 0;

    img {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      display: block;
    }

    .title {
      position: absolute;
      right: 0;
      bottom: 10px;
      height: 20px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      border-radius: 10px 0 0 10px;
      color: #fff;
      font-size: 12px;
    }
  }

  .channel {
    margin-top: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      background: #fff;
      position: sticky;
      top: 0;
      z-index: 1;

      .loadMore {
        color: $color-text-d;
      }
    }

    .list {
      display: flex;
      justify-content: space-between;

      .item {
        position: relative;
        width: 16%;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          .copywriter {
            transform: translateY(0);
          }
        }

        .copywriter {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          z-index: 1;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 13px;
          line-height: 18px;
          padding: 10px;
          transform: translateY(-100%);
          transition: all 0.3s;
        }

        .icon {
          position: relative;

          .playCount {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            line-height: 20px;
            padding-left: 5px;
            background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
            color: $color-background-ll;
            font-size: 12px;
          }

          .avatar {
            width: 100%;
            display: block;
          }
        }

        .name {
          flex: 1;
          height: 50px;
          line-height: 12px;
        }
      }
    }

    .list1 {
      display: flex;
      justify-content: space-between;

      .item {
        position: relative;
        width: 30%;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          .copywriter {
            transform: translateY(0);
          }
        }

        .copywriter {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          z-index: 1;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 11px;
          line-height: 11px;
          padding: 10px;
          transform: translateY(-100%);
          transition: all 0.3s;
        }

        .icon {
          position: relative;

          .playCount {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            line-height: 20px;
            padding-left: 5px;
            background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
            color: $color-background-ll;
            font-size: 12px;
          }

          .avatar {
            width: 100%;
            display: block;
          }
        }

        .name {
          flex: 1;
          _height: 50px;
          line-height: 22px;

          .singer, .desc {
            color: #999;
            font-size: 12px;

            .label {
              display: inline-block;
              line-height: 12px;
              padding: 1px 2px;
              border-radius: 2px;
              border: 1px solid $color-theme;
              color: $color-theme;
              transform: scale(0.7);
            }
          }
        }
      }
    }

    &.private {
      .item {
        width: 32.8%;
      }

      .list2 {
        display: block;

        // justify-content: space-between;
        .item1 {
          width: 100%;
          display: flex;

          .item {
            position: relative;
            width: 40%;
            height: 60px;
            overflow: hidden;
            cursor: pointer;

            &:hover {
              .copywriter {
                transform: translateY(0);
              }
            }

            .copywriter {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              z-index: 1;
              background: rgba(0, 0, 0, 0.4);
              color: #fff;
              font-size: 11px;
              line-height: 11px;
              padding: 10px;
              transform: translateY(-100%);
              transition: all 0.3s;
            }

            .icon {
              position: relative;
              height: 90%;

              .playCount {
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                line-height: 20px;
                padding-left: 5px;
                background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
                color: $color-background-ll;
                font-size: 12px;
              }

              .avatar {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
          }

          .name {
            flex: 1;
            height: 50px;
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
    }

    &.newSong {
      .list {
        flex-wrap: wrap;

        .item {
          width: 50%;
          display: flex;
          align-items: center;
          padding: 10px 0;
          box-sizing: border-box;

          .num {
            width: 40px;
            text-align: center;
          }

          .icon {
            width: 50px;
            margin-right: 10px;

            .icon-play {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              padding: 5px;
              border: 1px solid #fff;
              border-radius: 50%;
              font-size: 12px;
              color: #fff;
              opacity: 0.85;
            }
          }

          .name {
            flex: 1;
            _height: 50px;
            line-height: 20px;
            font-size: 13px;

            .singer, .desc {
              color: #999;
              font-size: 11px;

              .label {
                display: inline-block;
                line-height: 12px;
                padding: 1px 2px;
                border-radius: 2px;
                border: 1px solid $color-theme;
                color: $color-theme;
                transform: scale(0.7);
              }
            }
          }

          &:nth-child(1), &:nth-child(4), &:nth-child(5), &:nth-child(8), &:nth-child(9) {
            background: #f5f5f7;
          }
        }
      }

      .list1 {
        flex-wrap: wrap;

        .item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px 0;
          box-sizing: border-box;

          .num {
            width: 40px;
            text-align: center;
            font-size: 13px;
          }

          .icon {
            width: 50px;
            margin-right: 10px;

            .icon-play {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              padding: 5px;
              border: 1px solid #fff;
              border-radius: 50%;
              font-size: 12px;
              color: #fff;
              opacity: 0.85;
            }
          }

          &:nth-child(1), &:nth-child(3), &:nth-child(5) {
            background: #f5f5f7;
          }

          .name {
            flex: 1;
            _height: 50px;
            line-height: 20px;
            font-size: 13px;

            .singer, .desc {
              color: #999;
              font-size: 11px;

              .label {
                display: inline-block;
                line-height: 12px;
                padding: 1px 2px;
                border-radius: 2px;
                border: 1px solid $color-theme;
                color: $color-theme;
                transform: scale(0.7);
              }
            }
          }
        }
      }
    }

    &.mv {
      .item {
        width: 24.5%;
      }
    }

    &.dj {
      .list {
        flex-wrap: wrap;

        .item {
          width: 33%;
          display: flex;
          align-items: center;
          padding: 10px 0;
          box-sizing: border-box;

          .icon {
            width: 100px;
            margin-right: 10px;

            .icon-play {
              position: absolute;
              right: 10px;
              bottom: 10px;
              padding: 5px;
              border: 1px solid #fff;
              border-radius: 50%;
              font-size: 12px;
              color: #fff;
              opacity: 0.85;
            }
          }
        }
      }
    }
  }
}
</style>
