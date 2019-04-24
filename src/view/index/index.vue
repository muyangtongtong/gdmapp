<template>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" style="padding-bottom:50px">
        <div class="ban1" style="border-bottom:5px solid #eef;margin-bottom:10px;">
            <header class="item1">
                <div class="header_row">
                    <img src="../../assets/image/logo2.jpg" alt="" style="width:35px;height:33px;display:inline-block;">
                   <a href="#" style="display:inline-block;border:1px solid #aaa;border-radius:14px;width:150px;height:30px;line-height:45px;margin-left:10px">
                     <i class="fa fa-map-marker" style="font-size:16px;position:relative;top:-5px;left:3px;display:inline-block;width:13px;height:20px;"></i>
                     <span style="position:relative;top:-7px;"> 配送至：紫光发展大厦</span>
                     <i class="fa fa-caret-right" style="position:relative;top:-7px;"></i>
                   </a>
                    <i class="fa fa-search fa-lg" style="vertical-align: 76%;margin-left:38px;font-size:14px;"></i>
                    <i class="fa fa-cc-amex fa-lg"  style="vertical-align: 79%;margin-left:17px;font-size:14px;"></i>
                </div>
            </header>
            <!-- 轮播图 -->
            <div class="banner banner1" style="height:135px;border-radius: 9px;margin-top:45px;">
                <mt-swipe :auto="4000" style="border-radius: 9px;">
                    <mt-swipe-item><img src="../../assets/image/banner1.jpg" alt="" style="width:100%;height:135px;border-radius: 5px;"></mt-swipe-item>
                    <mt-swipe-item><img src="../../assets/image/banner2.jpg" alt="" style="width:100%;height:135px;border-radius: 5px;"></mt-swipe-item>
                    <mt-swipe-item><img src="../../assets/image/banner3.jpg" alt="" style="width:100%;height:135px;border-radius: 5px;"></mt-swipe-item>
                    <mt-swipe-item><img src="../../assets/image/banner4.jpg" alt="" style="width:100%;height:135px;border-radius: 5px;"></mt-swipe-item>
                </mt-swipe>
            </div>
            <p class="banner" style="font-size:10px;display:block;height:12px;margin-top:10px;margin-left:8px;margin-right:8px;color: #6b6969">
                <span style="float:left;border-left:3px solid green;padding-left:3px;">北京朝阳区嘉铭桐城店</span>
                <span style="float:right;color:green">切换门店<i class="fa fa-angle-right" style="padding-left:3px"></i></span>
            </p>
            <div class="banner guding">
                <span><i class="fa fa-user-circle-o"></i>新人专享</span>
                <span><i class="fa fa-calendar-check-o"></i>每日签到</span>
                <span><i class="fa fa-paypal"></i>充值有礼</span>
                <span><i class="fa fa-yen "></i>公司资质</span>
            </div>
        </div>
        <div class="banner2" style="border-bottom:5px solid #eef;margin-bottom:10px;">
            <div class="banner guding2">
                <span style="text-align:left"><i class="fa fa-retweet"></i>不好吃瞬间退款</span>
                <span style="text-align:center"><i class="fa fa-truck"></i>59分钟内送达</span>
                <span style="text-align:right"><i class="fa fa-thumbs-o-up"></i>全球基地&放心品购</span>
            </div>
            <div class="banner banner_2">
                <div class="banner_left">
                    <img src="../../assets/image/banner2.jpg" alt="">
                </div>
                <div class="banner_right">
                    <img src="../../assets/image/banner3.jpg" alt="">
                    <img src="../../assets/image/banner4.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="banner3" style="border-bottom:5px solid #eef;margin-bottom:10px;">
            <div class="banner banner_img">
                <img src="../../assets/image/banner5.png" alt="" style="width:100%;height:110px">
            </div>
            <div class="banner">
                <span style="text-align:left">皮软易剥，多汁风味足</span>
                <span style="text-align:right">去购买<i class="fa fa-angle-right"></i></span>
            </div>
        </div>
        <div class="banner3" style="border-bottom:5px solid #eef;margin-bottom:10px;">
            <div class="banner banner_img">
                <img src="../../assets/image/banner4.jpg" alt="" style="width:100%;height:110px">
            </div>
            <div class="banner">
                <span style="text-align:left">皮软易剥，多汁风味足</span>
                <span style="text-align:right">去购买<i class="fa fa-angle-right"></i></span>
            </div>
        </div>
        <div class="banner4" style="border-bottom:5px solid #eef;margin-bottom:10px;">
            <div class="banner">
                <img src="../../assets/image/banner5.jpg" alt="">
                <img src="../../assets/image/banner6.jpg" alt="">
                <img src="../../assets/image/banner7.jpg" alt="">
                <img src="../../assets/image/banner8.jpg" alt="">
            </div>
        </div>
    </mt-loadmore>

</template>

<script>
// import '../../assets/css/iconfont.css'
export default {
  data () {
    return {
      allLoaded: false
    }
  },
  methods: {
    loadTop () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.allLoaded = true// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<style>
/* 首页样式 */
header.item1 {
  width: 100%;
  background: #fff;
  position: fixed;
  z-index: 999;
  top:0;
  left:0;
}
header.item1 .header_row {
  height:45px;
  z-index: 101;
  box-shadow: 0 -1px 8px rgba(0,1,1,.08);
  border-width: 1px 0;
  border-top: 1px solid #f0f0f0;
  margin:0 8px;
}
header .mint-searchbar-inner {
  height: 20px;
}
/* 搜索框样式 */
.mint-searchbar {
  padding:0px;
  margin:13px 0px;
  border-radius: 5px;
}
.mint-searchbar-inner {
  border:1px solid #d9d9d9;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding:0px;
}
.mint-searchbar-cancel {
  padding:0px 3px;
  font-size: 10px;
}
.banner {
  margin-left:8px;
  margin-right:8px;
}
/* 轮播图样式 */
.guding {
  /* border:1px solid red; */
  font-size: 10px;
  margin:15px 0px;
  color: #6b6969
}
.guding span{
  display: inline-block;
  width: 24%;
  text-align: center;
}
.guding span i {
  display: block;
  color: #00e00f;
  font-size: 14px;
  margin-bottom: 5px;
}
.guding2 {
  font-size: 0.3rem;
  height: 26px;
  line-height: 26px;
  margin-left:8px;
  margin-right:8px;
  color: #6b6969;
  /* overflow: hidden; */
}
.guding2 span {
  overflow: hidden;;
  display: inline-block;
}
.banner2 {
  padding-bottom: 10px;
}
.banner2 .banner_2 {
  height: 120px;
  margin-top:15px;
  overflow: hidden;
}
.banner2 .banner_2 .banner_left {
  display: inline-block;
  width: 50%;
  text-align: left;
}
.banner2 .banner_2 .banner_left img {
  height: 120px;
  width:100%;
}

.banner2 .banner_2 .banner_right {
  display: inline-block;
  width: 48%;
  text-align: right;
}
.banner2 .banner_2 .banner_right img {
  height: 60px;
  width: 100%;
  display: block;
}
/* banner3样式设置 */
.banner3 .banner_img {
    height: 110px
}
.banner3 .banner span {
    display: inline-block;
    width:49%;
    margin: 10px 0px;
    font-size: 12px;
    color: #6b6969
}
.banner3 img {
    border-radius: 5px;
}
/* banner4样式设置 */
.banner4 img{
    display: block;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>
