<template>
    <div style="padding-bottom:45px">
      <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <Index></Index>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <Category ref="category" :member="member" :datasfoud="datasfoud" @getAlldata="getAlldata" @addshopcart="addshopcart" @intoshowCart="intoshowCart"></Category>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <Cart ref="cart" :member.sync="member" :data="datas" :checke="checkeAll" :cartversion="cartversion" :prooptlist1="prooptlist" @intoshowCart="intoshowCart"></Cart>
          </mt-tab-container-item>
          <mt-tab-container-item id="4" style="height:629px;">
            <My></My>
          </mt-tab-container-item>
      </mt-tab-container>
      <mt-tabbar fixed v-model="selected" style="z-index:222">
          <mt-tab-item id="1">
            <span><i class="fa fa-home"></i></span>
            <span>首页</span>
          </mt-tab-item>
          <mt-tab-item id="2">
            <span><i class="fa fa-th-large"></i></span>
            <span>品类</span>
          </mt-tab-item>
          <mt-tab-item id="3">
            <el-badge :value="this.datas.choiceqty" class="item">
              <span><i class="fa fa-shopping-cart"></i></span>
              <span>购物车</span>
            </el-badge>
          </mt-tab-item>
          <mt-tab-item id="4">
            <span><i class="fa fa-user-o"></i></span>
            <span>我的</span>
          </mt-tab-item>
      </mt-tabbar>
    </div>
  <!-- <div class="home">
    <router-view></router-view>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color=" rgb(43, 160, 27)">
      <el-menu-item @click="$router.push({name: 'index'})" index="/index">
          <span style="height:24px"><i class="fa fa-home"></i></span>
          <span style="height:15px;line-height:20px">首页</span>
        </el-menu-item>
        <el-menu-item @click="$router.push({name: 'category'})" index="/category">
          <span style="height:24px"><i class="fa fa-th-large"></i></span>
          <span style="height:15px;line-height:20px">品类</span>
        </el-menu-item>
        <el-menu-item @click="$router.push({name: 'cart'})" index="/cart">
          <el-badge :value="this.choiceqty">
            <span style="height:24px"><i class="fa fa-shopping-cart"></i></span>
          </el-badge>
            <span style="height:15px;line-height:20px">购物车</span>
        </el-menu-item>
        <el-menu-item @click="$router.push({name: 'my'})" index="/my">
          <span style="height:24px"><i class="fa fa-user-o"></i></span>
          <span style="height:15px;line-height:20px">我的</span>
        </el-menu-item>
    </el-menu>
  </div> -->
</template>

<script>
import Index from '../view/index/index'
import Category from '../view/category/category'
import Cart from '../view/cart/cart'
import My from '../view/my/my'
import {Toast} from 'mint-ui'
export default {
  components: {
    Index,
    Category,
    Cart,
    My
  },
  data () {
    return {
      selected: '3',
      allLoaded: true,
      fixed: true,
      data: '',
      datasfoud: [], // 所有的查找商品列表
      choiceqty: 0,
      member: {
        'fixationParameter': {
          'memberid': '521',
          'memtype': 0,
          'channeltype': 'A',
          'malorgid': '597',
          'outorgid': '854'
        }
      },
      prooptlist: [],
      cartversion: '',
      checkeAll: false,
      datas: []
    }
  },
  mounted () {
    this.intoshowCart()
  },
  computed: {
    activeIndex () {
      let index = this.$route.path.replace('/', '/index')
      // console.log('index', index)
      return index
    }
  },
  watch: {
    datas: {
      handler: function (val, oldVal) {
        this.data = this.datas
      },
      immediate: true
    }
  },
  methods: {
    loadTop () { // 加载更多数据
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () { // 加载更多数据
      this.allLoaded = true // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    },
    // 查找商品列表
    getAlldata () {
      let that = this
      this.$http.post('/app/productSearch', Object.assign({}, this.member))
        .then(res => {
          let { data } = res.data
          that.datasfoud = data.prolist
          // console.log('that.datasfoud=>', that.datasfoud)
        }).catch(err => {
          console.log('err=>', err)
        })
    },
    // 得到展示购物车
    intoshowCart () {
      this.prooptlist = []
      this.$http.post('/cart/intoShowCart', Object.assign({}, this.member))
        .then(res => {
          let {data} = res.data
          this.datas = data
          // console.log('this.datassss=>', this.datas)
          if (this.datas.totalqty === this.datas.choiceqty) {
            this.checkeAll = true
          } else if (this.datas.totalqty !== this.datas.choiceqty) {
            this.checkeAll = false
          }
          // console.log('res=>', this.datas)
          // console.log('this.checkeAll=>>', this.checkeAll)
          this.cartversion = this.datas.cartversion
          for (var i = 0; i < this.datas.groups.length; i++) {
            for (var j = 0; j < this.datas.groups[i].elements.length; j++) {
              if (this.datas.groups[i].elements[j].ischoice === 1 || this.datas.groups[i].ischoice === 1) { // 判断被选中
                if (this.datas.groups[i].grouptype === 1) { // 判断是否是组合
                  if (this.datas.groups[i].elements[j].showtype === 2) { // 判断是否是组合标头信息,商品级促销
                    this.prooptlist.push(JSON.parse(this.datas.groups[i].elements[j].operparam))
                  }
                } else {
                  this.prooptlist.push(this.datas.groups[i].elements[j])
                }
              }
            }
          }
        })
    },
    // 商品列表中点击加入购物车
    addshopcart (operparam, index, num) {
      this.$http.post('/cart/dealCartQty', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(operparam),
        'receptionParameter': {
          'qty': num,
          'opertype': 1
        }
      })).then(res => {
        // this.$http.post('/cart/intoShowCart', Object.assign({}, this.member))
        Toast({
          message: '加入购物车成功',
          iconClass: 'icon icon-success'
        })
        // this.intoshowCart()
      }).catch((err) => {
        console.log('ree=>', err)
        this.$alert('请求超时，刷新重试！')
      })
    }
  }
}
</script>

<style>
.mint-tab-item-label {
    font-size: 10px;
}
.mint-tab-item-label span{
    display: block;
    line-height:14px;
}
.mint-tab-item-label span i{
    font-size: 20px;
}
.mint-tab-container {
    width:100%;
    padding:0;
    margin:0;
    overflow: auto;
    box-sizing: border-box;
}
.el-badge .el-badge__content{
  height: 17px!important;
  padding:0px 6px;
  z-index: 999;
}
.el-badge__content.is-fixed {
  top: 5px;
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: #eaeaea;
    color:  rgb(29, 170, 60);
}
/* .home .el-menu{
  position: fixed;
  bottom: 0;
  background: #fff;
  height: 50px;
  border-top:1px solid #eee;
  width:100%
}
.home .el-menu .el-menu-item {
  width: 25%;
  text-align: center;
  margin:0px;
  padding: 0px 9px;
  line-height: 28px;
  border-radius: 0px;
}
.home .el-menu .el-menu-item span {
  display: block;
  font-size:10px;
}
.home .el-menu .el-menu-item span i{
  font-size: 18px;
}
.home .el-menu .el-menu-item .el-badge {
  height: 24px;
  width:18px;
}
.home .el-menu .el-menu-item .el-badge .el-badge__content {
  height: 15px;
  line-height: 12px;
  padding: 1px 5px;
  right: 5px;
  top:8px;
}
.home .el-menu-item .item span {
  width: 100%;
  text-align: center;
  display: block;
  line-height: 18px;
}
.home .el-menu-item .item  span i{
    font-size: 20px;
} */
</style>
