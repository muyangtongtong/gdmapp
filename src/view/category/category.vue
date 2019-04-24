<template>
    <el-container style="padding-bottom: 50px" id="Map">
      <el-header style="height:45px;position:fixed;background:#fff;width:100%;z-index:50;border-bottom:0.5px solid #ccc;vertical-align: middle;">
          <img src="../../assets/image/logo2.jpg" alt="" style="width:35px;height:33px;display:inline-block;">
          <!-- <mt-search  style="display:inline-block;width:44%;height:35px;margin-left:30px;"></mt-search> -->
          <el-input
            id="allmap"
            class="allmap"
            placeholder="配送至：对外经济贸易大学"
            v-model="input23"
            suffix-icon="el-icon-caret-right">
            <i slot="prefix" class="el-input__icon el-icon-location"></i>
          </el-input>
          <i class="fa fa-search fa-lg" style="margin-left:20px;font-size:14px;"></i>
      </el-header>
      <el-container>
        <el-aside width="60px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
              <el-menu-item  v-for="(dat,ind) in this.options" :index="'1-'+ ind" :key="'dat.id'+ind" @click="categoryfun(dat.classid)">{{dat.classname}}</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div v-for="(dat,ind) in this.datasfoud" :key="'dat.id'+ind" style="border-bottom:1px solid #eee;padding-bottom:10px">
            <img :src="dat.imageurl" alt="" title="这是一张图片" style="width:50px;height:50px;text-align:center;display:inline-block;line-height:50px">
            <div style="display:inline-block;height:80px;width:75%">
              <div class="productvarname" style="display:block;height:14px;margin-top:10px;overflow:hidden">{{dat.productvarname}}</div>
              <div class="proattr" style="display:inline-block;height:13px;font-size:10px;color:#aaa">
                <p v-if="dat.fielditemname1 && dat.fieldname1" v-text="dat.fielditemname1+':'+ dat.fieldname1"></p>
                <p v-else-if="dat.fielditemname2 && dat.fieldname2" v-text="dat.fielditemname2+':'+ dat.fieldname2"></p>
                <p v-else>暂无数据</p>
              </div>
              <div style="display:inline-block;color: rgb(233, 103, 64);font-size:10px;">仅剩{{dat.stockqty}}件</div>
              <div style="height:10px;color:#aaa;font-size:10px;margin:3px;0px">
                <!-- 不可用券 -->
              </div>
              <div class="price">
                  <div style="display:inline-block;font-size:10px">
                    <div style="color: rgb(233, 187, 59)">{{'￥'+dat.retailprice}}</div>
                    <div style="color: #000" v-if="dat.memberprice">{{'￥'+dat.memberprice}}
                      <el-tag color="#000" style="line-height: 10px;padding:2px 0px;;font-size:1px;border:none;color:rgb(233, 187, 59);height:13px;">心享价</el-tag>
                    </div>
                  </div>
                  <span style="float:right;display:inline-block" @click="addshopcart(dat.operparam,ind, 1)">
                      <span class="fa-stack fa-lg">
                          <i class="fa fa-circle fa-stack-2x" style="color: rgb(29, 170, 60);"></i>
                          <i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i>
                      </span>
                  </span>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Map',
  components: {
  },
  data () {
    return {
      type: 'tab',
      address_detail: '北京市海淀区',
      center: {lng: 111, lat: 34},
      options: [],
      datasfoud: '',
      input23: '',
      member: {
        'fixationParameter': {
          'memberid': '521',
          'memtype': 0,
          'channeltype': 'A',
          'malorgid': '597',
          'outorgid': '854'
        }
      }
    }
  },
  mounted () {
    this.getlist()
    this.getAlldata()
  },
  methods: {
    getlist () {
      this.$http.post('/app/productCata', Object.assign({}, this.member))
        .then(res => {
          let classname = {}
          for (var i = 0; i < res.data.data.data.length; i++) {
            let data3 = []
            for (var j = 0; j < res.data.data.data[i].data.length; j++) {
              for (var k = 0; k < res.data.data.data[i].data[j].data.length; k++) {
                data3.push(res.data.data.data[i].data[j].data[k].fielditemname)
              }
            }
            classname = {
              'classid': res.data.data.data[i].classid,
              'classname': res.data.data.data[i].classname,
              'data3': data3
            }
            this.options.push(classname)
          }
          // console.log('this.options=>', this.options)
        }).catch(err => {
          console.error(err)
          this.$alert('请求超时，刷新重试！')
        })
    },
    getAlldata () {
      let that = this
      this.$http.post('/app/productSearch', Object.assign({}, this.member))
        .then(res => {
          let { data } = res.data
          that.datasfoud = data.prolist
        })
    },
    // 得到展示购物车
    intoshowCart () {
      this.$emit('intoshowCart')
    },
    // 点击商品分类时触发得
    categoryfun (id) {
      this.$http.post('/app/productSearch', Object.assign({}, this.member, {
        'webclassid': id
      }))
        .then(res => {
          if (res.status === 200) {
            this.datasfoud = res.data.data.prolist
          }
        })
        .catch((err) => {
          console.log(err)
          this.$alert('请求超时，刷新重试！')
        })
    },
    // 点击加入购物车
    addshopcart (operparam, index, num) {
      console.log('operparam=>', operparam)
      this.$emit('addshopcart', operparam, index, num)
      this.intoshowCart()
    }
  }

}
</script>

<style>
.el-container .el-main{
    padding: 43px 0px 0px 10px;
}
.el-container {
    height:100%;
}
.el-container .el-aside{
  /* height:600px;
  margin-top:50px; */
}
.el-container .el-aside .el-menu {
   background-color: rgb(246, 246, 244);
   width:60px;
   height:600px;
   position: relative;
}
.el-container .el-aside li.el-menu-item {
  text-align: center;
  padding: 0px!important;
  color: rgb(155, 153, 153);
  width:60px;
  font-size: 12px;
  height: 42px;
  line-height: 42px;
  font-size:13px;
}
.el-container .el-aside .el-menu-item.is-active {
  color: rgb(29, 170, 60);
  background:#fff;
}
.el-container .el-main {
    height:600px;
}
.el-container .el-header{
  vertical-align: middle;
}
.el-container .el-header .el-input{
  width:63%;
  margin-left:15px;
  height: 20px;
}
.el-container .el-header .el-input .el-input__inner {
  height: 20px;
  font-size: 10px;
}
.el-container .el-header .el-input .el-input__icon {
  width:15px;
  line-height: 24px;
}
</style>
