<template>
  <section class="profile">
    <div class="container">
      <div class="profile-a">
        <div class="hide-on-med-and-down">
          <div class="person">
            <div class="person-left">
              <img class="person-img" v-bind:src="userInfo.profile.avatarUrl" alt>
            </div>
            <div class="person-right">
              <span class="name">
                {{userInfo.profile.nickname}}
                <img
                  class="gender"
                  v-if="userInfo.profile.gender ===1"
                  v-bind:src="imgurl1"
                  alt
                >
                <img class="gender" v-if="userInfo.profile.gender ===2" v-bind:src="imgurl2" alt>
                <button
                  class="btn waves-effect waves-light"
                  @click="modify"
                  type="submit"
                  name="action"
                  style="background-color:#4169E1;margin-left:220px"
                >编辑</button>
              </span>
              <div class="segment"></div>
              <div class="fellow">
                <div class="activity">
                  <span class="info">{{ userInfo.profile.eventCount}}</span>
                  <span class="rank">动态</span>
                </div>
                <div class="activity">
                  <span class="info">{{ userInfo.profile.followeds}}</span>
                  <span class="rank">关注</span>
                </div>
                <div class="activity">
                  <span class="info">{{ userInfo.profile.follows}}</span>
                  <span class="rank">粉丝</span>
                </div>
              </div>
              <div class="introduce">
                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s6">
                        <input
                          v-if="userInfo.profile.description ===''"
                          type="text"
                          placeholder="暂无介绍"
                          class="validate"
                          v-model="description"
                        >
                        <input
                          v-else
                          type="text"
                          :placeholder="userInfo.profile.description"
                          class="validate"
                          v-model="description"
                        >
                        <label for="first_name">个人介绍</label>
                      </div>
                      <div class="input-field col s6">
                        <input placeholder="占位提示" id="first_name" type="text" class="validate">
                        <label for="first_name">社交网络</label>
                      </div>
                      <div class="input-field col s6">
                        <input id="last_name" type="text" class="validate">
                        <label for="last_name">所在地区</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="hide-on-large-only">
          <div class="person1">
            <div class="person-top">
              <img class="person-img1" v-bind:src="userInfo.profile.avatarUrl" alt>
              <!-- <div class="fixed-action-btn horizontal">
                <a class="btn-floating btn-large red">
                  <i class="large material-icons">mode_edit</i>
                </a>
              </div>-->
            </div>

            <div class="person-center">
              <div class="fellow1">
                <div class="activity">
                  <span class="info">{{ userInfo.profile.eventCount}}</span>
                  <span class="rank">动态</span>
                </div>
                <div
                  class="activity"
                  style=" border:1px solid;
                border-color:white #eeeeee white #eeeeee"
                >
                  <span class="info">{{ userInfo.profile.followeds}}</span>
                  <span class="rank">关注</span>
                </div>
                <div class="activity">
                  <span class="info">{{ userInfo.profile.follows}}</span>
                  <span class="rank">粉丝</span>
                </div>
              </div>
            </div>
            <div class="person-bottom">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s6">
                      <input
                        v-if="userInfo.profile.description ===''"
                        type="text"
                        placeholder="暂无介绍"
                        class="validate"
                        v-model="description"
                      >
                      <input
                        v-else
                        type="text"
                        :placeholder="userInfo.profile.description"
                        class="validate"
                        v-model="description"
                      >
                      <!-- <input placeholder="占位提示" id="first_name" type="text" class="validate"> -->
                      <label for="first_name">个人介绍</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="first_name" type="text" class="validate">
                      <label for="first_name">社交网络</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="last_name" type="text" class="validate">
                      <label for="last_name">所在地区</label>
                    </div>
                  </div>
                </form>
              </div>
              <button
                  class="btn waves-effect waves-light"
                  @click="modify"
                  type="submit"
                  name="action"
                  style="background-color:#4169E1;display:block;margin:0 auto;width:100%"
                >编辑</button>
            </div>

          </div>
        </div>
        <div class="segment"></div>
        <span class="songlist">我创建的歌单(3)</span>
        <div class="segment"></div>

        <div class="channel">
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
      </div>
    </div>
  </section>
</template>

<script>
import { CODE } from "api/config";
import Loading from "base/aniPlaying/aniPlaying";
import { getPersonalized } from "api/index";
import { mapGetters, mapMutations, mapActions } from "vuex";
import man from "common/image/man.png";
import female from "common/image/female.png";
import { createNewSong, createDJ } from "common/js/song";
// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".fixed-action-btn");
//   var instances = M.FloatingActionButton.init(elems, options);
// });

// // Or with jQuery

// $(document).ready(function() {
//   $(".fixed-action-btn").floatingActionButton();
// });

export default {
  name: "profile",
  data() {
    return {
      title: "个人中心",
      songList: [],
      personalizedList: [],
      imgurl1: man,
      imgurl2: female,
      description: ""
    };
  },
  created() {
    this._getPersonalized();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },

  methods: {
    _getPersonalized() {
      getPersonalized().then(res => {
        if (res.code === CODE) {
          this.personalizedList = res.result;
        }
      });
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.profile {
  position: absolute;
  left: 0px;
  right: 0;
  top: 9%;
  bottom: 0px;
  overflow: auto;
  background: #fff;

  .profile-a {
    .person {
      height: 350px;
      width: 100%;

      .person-left {
        float: left;
        width: 50%;
        height: 300px;
        margin-top: 5%;

        .person-img {
          height: 250px;
          width: 250px;
          margin-left: 30%;
          // margin-top: 40px;
        }
      }

      .person-right {
        float: left;
        width: 50%;
        height: 300px;
        margin-top: 5%;

        .name {
          display: block;
          font-size: 25px;
          font-weight: 100;
          margin-top: 5px;
          margin-bottom: 10px;

          .gender {
            height: 20px;
            width: 20px;
            margin-left: 5px;
          }

          .modify {
            height: 25px;
            width: 120px;
            border-radius: 5px;
            float: right;
            background-color: #fff;
            border: solid 2px #eeeeee;
          }
        }

        .segment {
          margin: 5px;
          background-color: #eeeeee;
          height: 1px;
          width: 100%;
        }

        .fellow {
          margin-top: 10px;
          height: 70px;
          width: 100%;
          margin-bottom: 15px;

          .activity {
            float: left;
            height: 100%;
            width: 100px;
            text-align: left;
            border: 1px solid;
            border-color: white #eeeeee white white;
            margin-left: 20px;

            .info {
              display: block;
              font-size: 20px;
              font-weight: 370;
              margin-bottom: 10px;
            }

            .rank {
              display: block;
              font-size: 18px;
            }
          }
        }

        .introduce {
          .introduce1 {
            display: block;
            margin-top: 17px;
          }
        }
      }
    }

    .person1 {
      margin-top: 5%;

      .person-top {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .person-img1 {
          border-radius: 50%;
          height: 25%;
          width: 25%;
        }
      }

      .person-center {
        display: flex;

        .fellow1 {
          margin-top: 10px;
          height: 10%;
          width: 100%;
          margin-bottom: 15px;

          .activity {
            float: left;
            height: 100%;
            width: 25%;
            text-align: center;
            // border: 1px solid;
            // border-color: white #eeeeee white #eeeeee;
            margin-left: 7%;

            .info {
              display: block;
              font-size: 20px;
              font-weight: 370;
              margin-bottom: 10px;
            }

            .rank {
              display: block;
              font-size: 18px;
            }
          }
        }
      }

      .person-bottom {
      }
    }

    .segment {
      margin-bottom: 10px;
      margin-top: 10px;
      background-color: #eeeeee;
      height: 1px;
      width: 100%;
    }

    .songlist {
      display: block;
      margin-left: 50px;
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
    }
  }
}
</style>
