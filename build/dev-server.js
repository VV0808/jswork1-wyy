require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var port = config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

const http = require('http')
var app = express()
// app.use(express.static('public'));

// 获取歌手单曲
app.use('/artists', require('./router/artists'))

// 获取歌手专辑列表
app.use('/artist/album', require('./router/artist_album'))

//艺术家-信息
app.use("/artist/desc", require("./router/artists_desc"))

//艺术家-mv
app.use("/artist/mv", require("./router/artists_mv"))

app.use('/comment/music', require('./router/comment_music'))

app.use('/comment/dj', require('./router/comment_dj'))

//djradio detail
app.use("/dj/detail", require("./router/dj_detail"))

//dj主播 radio
app.use("/dj/program", require("./router/dj_program"))

app.use("/dj/catelist", require("./router/dj_catelist"))

//精选电台-分类电台
app.use("/dj/recommend/type", require("./router/dj_recommend_type"))

//手机登录
app.use('/login/cellphone', require('./router/loginCellphone'))

// 获取歌词
app.use('/lyric', require('./router/lyric'))

// 获取音乐 url
app.use('/music/url', require('./router/musicUrl'))

//推荐歌单
app.use("/personalized", require("./router/personalized"))

//推荐dj
app.use("/personalized/djprogram", require("./router/personalized_djprogram"))

//推荐新音乐
app.use("/personalized/newsong", require("./router/personalized_newsong"))

//独家放送
app.use("/personalized/privatecontent", require("./router/personalized_privatecontent"))

//推荐mv
app.use("/personalized/mv", require("./router/personalized_mv"))

// 获取歌单内列表
app.use('/playlist/detail', require('./router/playlist_detail'))

// 获取每日推荐歌曲
app.use('/recommend/songs', require('./router/recommend_songs'))

// 获取每日推荐歌单
app.use('/recommend/resource', require('./router/recommend_resource'))

//simi ,相似歌单
app.use("/simi/playlist", require("./router/simi_playlist"))

//simi ,相似关注的用户
app.use("/simi/user", require("./router/simi_user"))

//相似歌手
app.use("/simi/artist", require("./router/simi_artists"))

// 获取音乐详情
app.use('/song/detail', require('./router/song_detail'))

// 新碟上架 http://music.163.com/#/discover/album/
app.use('/top/album', require('./router/top_album'))

// 热门歌手 http://music.163.com/#/discover/artist/
app.use('/top/artists', require('./router/top_artists'))

//分类歌单
app.use("/top/playlist", require("./router/top_playlist"))

//精品歌单
app.use("/top/playlist/highquality", require("./router/top_playlist_highquality"))

// 搜索
app.use('/search', require('./router/search'))

// 搜索 hot
app.use('/search/hot', require('./router/search_hot'))

//搜索 multimatch
app.use('/search/multimatch', require('./router/search_multimatch'))

// 搜索 suggest,搜索结果包含单曲,歌手,歌单,mv信息
app.use('/search/suggest', require('./router/search_suggest'))

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
