<template>
    <div id="shopcar">
      <header>
        <div id="header_row">
          <div style="font-size:16px;color:#000;display:inline-block;width:77%;line-height:40px;">购物车<span v-if="this.datas.choiceqty > 0">{{'('+this.datas.choiceqty+')'}}</span></div>
          <div style="display:inline-block;width:20%;line-height:36px">
            <span @click="edit" v-show="edited">编辑</span>
            <span @click="edit" v-show="finished">完成</span>
            <el-popover
              placement="bottom"
              title=""
              width="150"
              trigger="click">
              <div style="border-bottom:1px solid #aaa;padding-bottom:3px;line-height:40px">
                <el-badge :value="3" style="font-size:16px"><i class="fa fa-commenting-o"></i></el-badge><span style="margin-left:5px">消息</span>
              </div>
              <div style="padding-top:3px">
                <span><i style="font-size:16px" class="fa fa-share-square-o"></i> <span style="margin-left:5px;">分享</span></span>
              </div>
              <el-button slot="reference" style="padding:0px;border:none;height:24px;"><i class="fa fa-ellipsis-h" style="line-height:38px;margin-left:10px;float:right;margin-left:5px;;cursor:pointer"></i></el-button>
            </el-popover>
          </div>
          <div class="clear"></div>
        </div>
      </header>
      <div class="clear" style="margin-bottom:41px;"></div>
      <main>
        <template v-for="(data1, ind1) in datas.groups">
          <template v-for="(data, ind) in data1.elements">
            <!--线的判断开始-->
              <template v-if="data.eletype == '1'" >
                <template v-if="data.showtype == '1'">
                  <Lineone :key="data.id" :data1="data1" :id="'line'+ind" ></Lineone>
                </template>
                <template v-else-if="data.showtype == '2'">
                  <Linetwo :key="data.id" :data1="data1" :id="'line'+ind"></Linetwo>
                </template>
                <template v-else-if="data.showtype == '3'">
                  <Linethree :key="data.id" :data1="data1" :id="'line'+ind"></Linethree>
                </template>
                <template v-else-if="data.showtype == '4'">
                  <Linefour :key="data.id" :data1="data1" :id="'line'+ind"></Linefour>
                </template>
              </template>
            <!--线的判断结束-->
            <!-- 文本判断开始 -->
              <template v-else-if="data.eletype == '2'" ><!--文字-->
                <template v-if=" data.isgift== '0' ">
                  <Textnormal @inputNumberChange="inputNumberChange" @delet_nom="delet_nom" @dealShowCartChoice="dealShowCartChoice" @groupchoice="groupchoice" @cartPromoPop="cartPromoPop" @handleClose="handleClose" @cartPromoPopz="cartPromoPopz" @handleClosez="handleClosez" @cartPromoPopj="cartPromoPopj" @handleClosej="handleClosej" :elements="data1.elements" :item="data" :data1="data1" :key="data.id" :id="'text'+ind"></Textnormal>
                </template>
                <template v-else-if="data.isgift == '1'" >
                    <Textgift @inputNumberChange="inputNumberChange" @delet_nom="delet_nom" @dealShowCartChoice="dealShowCartChoice" @groupchoice="groupchoice" @cartPromoPop="cartPromoPop"  @handleClose="handleClose" @cartPromoPopz="cartPromoPopz" @handleClosez="handleClosez" @cartPromoPopj="cartPromoPopj" @handleClosej="handleClosej" :elements="data1.elements" :item="data" :data1="data1" :key="data.id" :id="'text'+ind"></Textgift>
                </template>
              </template>
            <!-- 文本判断结束 -->
            <!--商品的判断开始-->
              <template v-else-if="data.eletype == '3'" >
                <template v-if="data.isgift == '0'">
                  <Goodnomal  ref="good" @inputNumberChange="inputNumberChange" @getRadioVal="getRadioVal" @showtogglesure="showtogglesure" @delet_nom="delet_nom" @dealShowCartChoice="dealShowCartChoice" @groupchoice="groupchoice" :item="data" :data1="data1" :ind="ind" :ind1="ind1" :key="data.id" :id="'good'+ind"></Goodnomal>
                </template>
                <template v-else-if="data.isgift == '1'" >
                  <Gift @inputNumberChange="inputNumberChange" @getRadioVal="getRadioVal" @showtogglesure="showtogglesure" @delet_nom="delet_nom" @dealShowCartChoice="dealShowCartChoice" @groupchoice="groupchoice" :item="data" :data1="data1" :ind="ind" :ind1="ind1" :key="data.id" :id="'good'+ind"></Gift>
                </template>
              </template>
            <!--商品的判断结束-->
          </template>
        </template>
      </main>
      <!-- 任选组合弹出框 -->
      <el-dialog
        title="任选组合"
        class="renxuan"
        :visible.sync="dialogVisible"
        width=320px>
        <div style="text-align: left;margin-left:23px;display: inline-block">{{this.tableData.text1}}</div>
        <p style="text-align: left;display: inline-block;margin-left:80px">
          应选商品<span class="red">{{this.tableData.selqty * this.tableData.groupqty+'件'}}</span>,
          已选<span class="red">{{this.poplist+'件'}}</span>
          <span v-if="this.poplist > (this.tableData.selqty * this.tableData.groupqty)">已超过<b class="red">{{this.poplist -(this.tableData.selqty * this.tableData.groupqty)+'件'}}</b></span>
          <span v-else-if="this.poplist < (this.tableData.selqty * this.tableData.groupqty)">还需选<b class="red">{{(this.tableData.selqty * this.tableData.groupqty)- this.poplist+'件'}}</b></span>
        </p>
        <table style="margin-top:10px;margin-left:5px;">
          <tr style="height:40px">
            <td style="width:100px">商品名称</td>
            <td>商品价格</td>
            <td>商品属性</td>
            <td>商品数量</td>
          </tr>
          <tr style="height:40px" v-for="(data, index) in this.tableData.showCartProductInfoList" :key="index">
            <td v-text="data.productvarname"></td>
            <td v-text="0" style="text-align:center"></td>
            <td>
              <p v-if="data.fielditemname1 && data.fieldname1" v-text="data.fielditemname1+':'+ data.fieldname1"></p>
              <p v-else-if="data.fielditemname2 && data.fieldname2" v-text="data.fielditemname2+':'+ data.fieldname2"></p>
              <p v-else>暂无数据</p>
            </td>
            <td class="renxuan_jishu">
            <el-input-number v-model="data.qty" @change="handleChangePop" size="mini" :min="0" ></el-input-number>
            </td>
          </tr>
        </table>
        <div style="width: 100%;margin-left:5px;">
          <a>小计</a>
          <span style="margin-left: 20px">{{'单价'+'  '+'￥'+ this.tableData.groupprice}}</span>
          <div class="counter">
            <a @click="handle">-</a>
            <input type="text" v-model.lazy="this.tableData.groupqty">
            <a @click="add">+</a>
          </div>
          <span style="margin-left:17px" >金额 {{' ￥'+this.tableData.groupqty* this.tableData.groupprice+'元'}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 赠品组合弹出界面 -->
      <el-dialog
        :visible.sync="dialogVisible1"
        width="50%" class="zeng">
          <div style="text-align: left;border-bottom:1px solid #aaa ">
            <a v-if="this.tableData.grouptype === 'F'">分组加价购</a>
            <a v-else-if="this.tableData.grouptype === 'B'">分组赠品</a>
            <a style="margin-left: 70px" v-text="this.tableData.text1"></a>
            <a style="margin-left: 70px">{{this.tableData.maxmsg}}</a>
          </div>
          <table v-for="(data, ind) in this.tableData.grouplist" :key="ind" style=" width: 100%;margin-bottom:10px; border:none;border-bottom:2px solid #aaa;padding-bottom:20px">
            <tr v-for="(data1, ind1) in data.list" :key="ind1">
              <td style="width:50px;border-border:1px solid #eee">{{data1.imageurl}}</td>
              <td style="border-border:1px solid #eee">{{data1.productvarname}}</td>
              <td style="border-border:1px solid #eee">{{'￥'+data1.promoprice}}</td>
              <td style="border-border:1px solid #eee">{{data1.qty+'件'}}</td>
            </tr>
            <tr style="padding-bottom: 10px;">
                <td>小计</td>
                <td >{{'单价'+'  '+'￥'+ data.price}}</td>
                <td class="counter">
                  <el-input-number v-model="data.qty" @change="handleChangegift" size="mini" :min="0"></el-input-number>
                </td>
                <td>金额 {{' ￥'+data.price* data.qty+'元'}}</td>
            </tr>
          </table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="handleClose(item.id)">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 加价购弹出界面 -->
      <el-dialog
        :visible.sync="dialogVisible2"
        width="50%" class="jiajiagou">
        <div style="text-align: left;margin-bottom:10px"><span>直接加价购</span> <span style="margin-left:30px">{{this.tableData.text1}}</span></div>
        <table style="border-bottom:2px solid #aaa">
          <tr style="border-top:2px solid #ddd;height:30px;">
            <td>商品图片</td>
            <td style="width:150px">商品名称</td>
            <td>促销价格</td>
            <td>商品数量</td>
          </tr>
          <tr style="height:30px;line-height:30px" v-for="(data, index) in this.tableData.showCartProductInfoList" :key="index">
            <td v-if="data.imageurl" ><img :src="data.imageurl" alt=""></td>
            <td v-else>暂无数据</td>
            <td>{{data.productvarname}}</td>
            <td>{{data.promoprice}}</td>
            <td v-text="data.qty">
              <!-- <el-input-number v-model="data.qty" @change="handleChangePopj" size="mini" :min="0"></el-input-number> -->
            </td>
          </tr>
        </table>
        <div style="width: 100%;margin-top:10px">
          <a>小计</a>
          <span style="margin-left:50px">{{'单价      '+'   '+'￥'+ this.tableData.groupprice}}</span>
          <div class="counter">
            <a @click="handlej">-</a>
            <input type="text" v-model="this.tableData.groupqty" :max="3">
            <a @click="addj">+</a>
              <!-- <el-input-number size="mini" v-model.lazy="this.tableData.groupqty" @change="handlepopgroupj" :min="this.tableData.minqty" ></el-input-number> -->
          </div>
          <span style="margin-left:120px" >金额 {{' ￥'+this.tableData.groupqty* this.tableData.groupprice+'元'}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="handleClosej">确 定</el-button>
        </span>
      </el-dialog>
      <div class="clear" style="margin-top:60px;"></div>
      <footer class="footer">
          <div style="height:50px;">
            <span class="selec_all">
              <el-checkbox v-model="checkeAll" @change="hadleCheckAllChange(checkeAll)"></el-checkbox>
              <label for class="goodcheack">全选</label>
            </span>
            <el-button style="float:right;padding:8px 15px;border-radius:20px;margin:3px;" v-show="dele" @click="delchoice_nom">删除</el-button>
            <span class="price" style="display:inline-block;height:38px;line-height:38px;" v-if="this.datas.choiceamt==0" v-show="total">合计：￥0.00</span>
            <span class="price" style="display:inline-block;margin-left:10px;" v-else-if="this.datas.choiceamt >=0" v-show="total">
              <span style="display:block;height:22px;line-height:22px;font-size:12px;font-weight:bolder;">合计：<span v-if="this.datas.choiceamt">{{'￥' + this.datas.choiceamt}}</span></span>
              <span style="font-size:10px;font-color:#aaa;">总额：<span v-if="this.datas.choiceoldamt">{{'￥' + this.datas.choiceoldamt}}</span></span>
              <span style="font-size:10px;font-color:#aaa;">立减：<span v-if="this.datas.choicereduceamt">{{'￥'+this.datas.choicereduceamt}}</span></span>
            </span>
            <span class="toolb-right" style="display:inline-block;height:38px;line-height:38px; float:right;" v-show="settlement">
              <el-button style="background: #e54346;color:#fff" @click="payment">结算</el-button>
              <mt-popup
                v-model="popupVisible"
                position="right"
                closeOnClickModal="true">
                <div class="confirmorder">
                  <i class="fa fa-angle-left" @click="faclick"></i>
                  <span>确认订单</span>
                </div>
                <mt-navbar v-model="selected">
                  <mt-tab-item id="1">配送上门</mt-tab-item>
                  <mt-tab-item id="2">门店自提</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                  <mt-tab-container-item id="1">
                    <a href="" class="address">+点击选择收货地址</a>
                    <div class="container_bottom"></div>
                  </mt-tab-container-item>
                  <mt-tab-container-item id="2">
                    <div style="float: left;height:50px;display:inline-block;margin-left:5px;">
                      <p style="height:25px;text-align:left">北京朝阳区嘉铭桐城店</p>
                      <p style="height:25px">朝阳区北苑路嘉铭桐城D区209号楼1-8</p>
                    </div>
                    <div style="float: right;display:inline-block;height:50px;line-height:50px;font-size:10px;">
                      切换门店<i class="fa fa-angle-right"></i>
                    </div>
                    <div class="container_bottom bottom1"></div>
                  </mt-tab-container-item>
                </mt-tab-container>
              </mt-popup>
            </span>
          </div>
      </footer>
    </div>
</template>

<script>
import Lineone from '../../components/goods/line_one'
import Linetwo from '../../components/goods/line_two'
import Linethree from '../../components/goods/line_three'
import Linefour from '../../components/goods/line_four'
import Textnormal from '../../components/goods/text_normal'
import Textgift from '../../components/goods/text_gift'
import Goodnomal from '../../components/goods/goods_normal'
import Gift from '../../components/goods/gift'
import {Popup, Navbar, MessageBox} from 'mint-ui'
import Vue from 'vue'
// import { MessageBox } from 'mint-ui'
Vue.component(Navbar.name, Navbar)
Vue.component(Popup.name, Popup)
export default {
  props: ['member', 'data', 'checke', 'prooptlist1', 'cartversion'],
  components: {
    Lineone,
    Linetwo,
    Linethree,
    Linefour,
    Textnormal,
    Textgift,
    Goodnomal,
    Gift
  },
  data () {
    return {
      selected: '1',
      showvalue: '',
      tableData: [], // 删除选中商品组时用到的
      datas: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      centerDialogVisible: false,
      prooptlist: '',
      checkeAll: false,
      dialog: true,
      dialog1: true,
      dialog2: false,
      dialog3: false,
      dialognum: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '00', '.'],
      dialogmoney: [5, 10, 20, 50, 100],
      num: 0,
      amt: 0,
      reduceamt: 0,
      // cartversion: '',
      elements: [],
      popdata: [],
      arr: [],
      poplist: 0, // 弹出框显示已选商品的数量
      poplistj: 0,
      checkList: [],
      maxqty: 0, // 用于统计弹出数据列表中计数器中商品总数
      inputval: '',
      searchBarFixed: '', // 顶部浮动需要
      total: true,
      settlement: true, // 用于结算时元素得显示隐藏
      dele: false, // 用于点击删除时元素得显示隐藏
      edited: true, // 用于点击编辑时，把编辑变成完成
      finished: false, // 用于点击编辑时，把编辑变成完成
      popupVisible: false
    }
  },
  computed: {
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.datas = this.data
      },
      immediate: true
    },
    checke: {
      handler: function (val, oldVal) {
        this.checkeAll = this.checke
      },
      immediate: true
    },
    prooptlist1: {
      handler: function (val, oldVal) {
        this.prooptlist = this.prooptlist1
      },
      immediate: true
    }

  },
  created () {

  },
  mounted () {
    // this.intoshowCart()
  },
  methods: {
    // 点击编辑按钮
    edit () {
      this.total = !this.total
      this.settlement = !this.settlement
      this.dele = !this.dele
      this.edited = !this.edited
      this.finished = !this.finished
    },
    // 点击0-9 按钮触发得方法
    dialogButton (dat) {
      this.showvalue = ''
      this.arr.push(dat)
      for (let i = 0; i < this.arr.length; i++) {
        this.showvalue += this.arr[i]
      }
    },
    // 点击金钱面额 按钮触发的方法
    dialogMoney (dat) {
      // let keycount = document.getElementsByClassName('dialogmoney')[i].value
      this.showvalue = dat
    },
    dialogpay () {
      console.log(111)
    },
    dialogpay1 () {
      this.dialog1 = true
      this.dialog2 = false
      this.dialog3 = false
      console.log('dialog1=>', this.dialog1)
      console.log('dialog2=>', this.dialog2)
      console.log('dialog3=>', this.dialog3)
    },
    dialogpay2 () {
      this.dialog2 = true
      this.dialog1 = false
      this.dialog3 = false
      console.log('dialog1=>', this.dialog1)
      console.log('dialog2=>', this.dialog2)
      console.log('dialog3=>', this.dialog3)
    },
    dialogpay3 () {
      // 待完善
      this.dialog3 = true
      this.dialog1 = false
      this.dialog2 = false

      console.log('dialog1=>', this.dialog1)
      console.log('dialog2=>', this.dialog2)
      console.log('dialog3=>', this.dialog3)
    },
    // 去结算
    payment () {
      this.centerDialogVisible = true
      this.popupVisible = true
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#searchBar').offsetTop
      this.searchBarFixed = scrollTop > (offsetTop - 0)
      // console.log(scrollTop)
    },
    // 当选中文本时，跟他一组的商品得背景颜色也会发生改变
    groupchoice () {
      for (var h = 0; h <= this.datas.groups.length; h++) {
        if (this.datas.groups[h].elements.length > 2) {
          for (var k = 0; k <= this.datas.groups[h].elements.length; k++) {
            if (this.datas.groups[h].elements[k].eletype === 2 && this.datas.groups[h].elements[k].ischoice === 1) {
              return 'row itemChoice'
            }
          }
        }
        this.elements.push()
      }
    },
    // 基础购物车
    refresh () {
      this.$http.post('/cart/getCart', Object.assign({}, this.member, {
        'answersParameter': {
          'protype': 0
        },
        'receptionParameter': {
          'opertype': 0,
          'qty': 10
        }
      })).then(res => {
        this.datas = res.data.data
      })
    },
    // 得到展示购物车
    intoshowCart () {
      this.$emit('intoshowCart')
      // this.cheack = this.checkeAll
      // this.datas = this.data
      console.log('this.datas=>', this.datas)
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
    // 得到购物车是商品总数量 暂时没用
    getAllqty () {
      this.$http.post('8002/cart/getCartQty', {
        'channeltype': 'A',
        'malorgid': 1,
        'memtype': 0,
        'outorgid': 854
      })
        .then(res => {
          if (res.status === 200) {
            // console.log(res.data)
          } else {
            this.$message.errorMsg()
          }
        })
    },
    // 改变商品数量 传递到商品组件 点击计数器时触发
    inputNumberChange (operparam, opertype, num, updataqty) {
      if (opertype === 0) { // 设置数量
        if (num > 200) {
          alert('商品数量最大值是200')
          num = 200
          // return false
        } else if (!num) {
          num = 1
        }
      } else if (opertype === 1) { // 累加数量
        if (updataqty > 199) {
          if (num === +1) {
            alert('商品数量最大值是200')
            num = 0
            return false
          } else if (num === -1) {
            num = -1
          }
        }
      }
      this.$http.post('/cart/dealShowCartQty', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(operparam),
        'receptionParameter': {
          'opertype': opertype,
          'qty': num
        }
      })).then(res => {
        this.datas = res.data.data
        this.intoshowCart()
        console.log('this.datas.choiceqty=>', this.datas.choiceqty)

        // this.$emit('getAlldata')
      })
    },
    numberChange () {
      alert('商品数量不能超过200')
    },
    // 促销框中的方法
    getRadioVal (val) {
      this.inputval = val
      console.log('this.inputval=>', this.inputval)
    },
    // 促销框中确定按钮出发的方法
    showtogglesure (operparam) {
      console.log('operparam=>', operparam)
      this.$http.post('/cart/dealShowCartPromoChoice', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(operparam),
        'pid': this.inputval.pid,
        'gid': this.inputval.gid
      })).then(res => {
        console.log(res)
        this.datas = res.data.data.groups
        console.log('this.datas=>', this.datas)
        this.intoshowCart()
      })
    },
    // 删除商品
    delet_nom (operparam) {
      this.$http.post('/cart/dealShowCartRemove', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(operparam)
      }))
        .then(res => {
          this.tableData = res.data.data.groups
          console.log('delet_nom=>', this.tableData)
          if (res.status === 200) {
            this.intoshowCart()
            this.$emit('getAlldata')
          } else {
            this.$message.errorMsg()
          }
        })
    },
    // 删除选中商品
    delchoice_nom (operparam) {
      MessageBox.confirm('', {
        message: '确定删除所选商品吗?',
        confirmButtonClass: 'confirmButton',
        cancelButtonClass: 'cancelButton'
      }).then(action => {
        this.$http.post('/cart/dealShowCartRemoveList', Object.assign({}, this.member, {
          'answersParameter': operparam,
          'prooptlist': this.prooptlist
        }))
          .then(res => {
            if (res.status === 200) {
              this.intoshowCart()
              this.$emit('getAlldata')
            } else {
              this.$message.errorMsg()
            }
          })
        this.prooptlist = []
      }).catch(() => {
      })
    },
    // 选择或取消选择
    dealShowCartChoice (operparam, id, choice) {
      this.$http.post('/cart/dealShowCartChoice', Object.assign({}, this.member, {
        'answersParameter': JSON.parse(operparam),
        'receptionParameter': {
          'ischoice': choice,
          'productvarid': id
        }
      })).then(res => {
        let {data} = res.data
        this.tableData = data
        console.log('res=>', res)
        if (data.totalqty === data.choiceqty) {
          this.checkeAll = true
        } else if (this.datas.totalqty !== data.choiceqty) {
          this.checkeAll = false
        }
        this.intoshowCart()
        // this.prooptlist = []
      })
    },
    // 清空购物车
    cartClear () {
      this.$http.post('/cart/cartClear', {
        'carttype': this.carttype,
        'memberid': this.memberid,
        'memtype': this.membertype
      })
        .then(res => {
          this.datas = []
        })
    },
    // 全选
    hadleCheckAllChange (val) {
      console.log('val=>', val)
      this.$http.post('/cart/dealShowCartChoiceAll', Object.assign({}, this.member, {
        'answersParameter': {
          'precartversion': this.cartversion
        },
        'receptionParameter': {
          'ischoice': val === true ? 1 : 0
        }
      }))
        .then(res => {
          // console.log('tres.data.data=>', res.data.data)
          this.datas = res.data.data
          // console.log('hadleCheckAllChange=>', this.datas)
          for (var i = 0; i < this.datas.groups.length; i++) {
            for (var j = 0; j < this.datas.groups[i].elements.length; j++) {
              if (this.checkeAll === true) {
                this.datas.groups[i].ischoice = 1
                this.datas.groups[i].elements[j].ischoice = 1
                // console.log('true=>', this.datas)
              } else if (this.checkeAll === false) {
                this.datas.groups[i].ischoice = 0
                this.datas.groups[i].elements[j].ischoice = 0
                // console.log('false', this.datas)
              }
            }
          }
        })
    },
    // 得到任选组合数据
    cartPromoPop (clickparam) {
      // maxqty = 0 时  弹出框不弹出
      if (this.tableData.maxqty === 0) {
        this.dialogVisible = false
      } else {
        this.dialogVisible = true
        this.$http.post('/cart/getShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(clickparam)
        }))
          .then(res => {
            this.tableData = res.data.data
            console.log('this.tableData=>', res.data.data)
            // 得到组合中的商品数量 在弹出框中显示
            this.poplist = 0
            for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
              this.poplist = this.poplist + this.tableData.showCartProductInfoList[i].qty
            }
          })
        this.poplist = this.tableData.selqty * this.tableData.groupqty
      }
    },
    // 任选组合商品得加减
    handleChangePop () {
      this.poplist = 0
      this.maxqty = 0
      for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
        this.maxqty = this.maxqty + this.tableData.showCartProductInfoList[i].qty
        this.poplist = this.poplist + this.tableData.showCartProductInfoList[i].qty
      }
      console.log('this.maxqty=>', this.maxqty)
    },
    add () {
      this.tableData.groupqty++
      // console.log('this.tableData.groupqty=>', this.tableData.groupqty)
    },
    handle () {
      this.tableData.groupqty--
      // console.log('this.tableDatsa.groupqty=>', this.tableData.groupqty)
    },
    // 处理任选组合数据
    handleClose () {
      this.maxqty = 0
      this.checkList = [] // 用于传输弹出框中商品数量大于1的商品列表
      for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
        if (this.tableData.showCartProductInfoList[i].qty !== 0) {
          this.checkList.push(this.tableData.showCartProductInfoList[i])
          this.maxqty = this.maxqty + this.tableData.showCartProductInfoList[i].qty
        }
      }
      if (this.tableData.maxqty === -1) {
        this.$http.post('/cart/dealShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(this.tableData.operparam),
          'list': this.checkList,
          'receptionParameter': {
            'groupqty': this.tableData.groupqty
          }
        }))
          .then(res => {
            this.datas = res.data.data
            this.dialogVisible = false
          })
      } else {
        if (this.tableData.maxqty * this.tableData.groupqty === this.maxqty) {
          this.$http.post('/cart/dealShowCartPromoPop', Object.assign({}, this.member, {
            'answersParameter': JSON.parse(this.tableData.operparam),
            'list': this.checkList,
            'receptionParameter': {
              'groupqty': this.tableData.groupqty
            }
          }))
            .then(res => {
              if (this.maxqty > this.tableData.maxqty) {
                alert('商品数量选择不符合要，请重新选择')
              } else {
                this.datas = res.data.data
                this.dialogVisible = false
              }
            })
        } else {
          alert('商品数量选择不符合要求，请重新选择')
        }
      }
    },
    // 得到赠品组合数据
    cartPromoPopz (clickparam) {
      // maxqty = 0 时  弹出框不弹出
      if (this.tableData.maxqty === 0) {
        this.dialogVisible = false
      } else {
        this.dialogVisible = true
        this.$http.post('/cart/getShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(clickparam)
        }))
          .then(res => {
            this.tableData = res.data.data
            // 得到组合中的商品数量 在弹出框中显示
            this.poplistz = 0
            for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
              this.poplistz = this.poplistz + this.tableData.showCartProductInfoList[i].qty
            }
          })
        this.poplistz = this.tableData.selqty * this.tableData.groupqty
      }
    },
    // 赠品组合商品组加减
    handleChangegift (value) {
      this.poplist = 0
      for (var i = 0; i < this.tableData.grouplist.length; i++) {
        this.poplist = this.poplist + this.tableData.grouplist[i].qty
      }
      console.log('this.poplist=>', this.poplist)
    },
    // 处理赠品组合数据
    handleClosez () {
      this.poplistz = 0
      for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
        if (this.tableData.showCartProductInfoList[i].qty !== 0) {
          this.checkList.push(this.tableData.showCartProductInfoList[i])
          this.poplistz = this.poplistz + this.tableData.showCartProductInfoList[i].qty
        }
      }
      if (this.tableData.maxqty <= this.poplistz) {
        this.$http.post('/cart/dealShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(this.tableData.operparam),
          'list': this.checkList
        }))
          .then(res => {
            this.dialogVisible1 = false
            this.datas = res.data.data
          })
      } else {
        alert(this.tableData.maxmsg + '，请重新选择')
      }
    },
    // 得到加价购组合数据
    cartPromoPopj (clickparam) {
      // maxqty = 0 时  弹出框不弹出
      if (this.tableData.maxqty === 0) {
        this.dialogVisible2 = false
      } else {
        this.dialogVisible2 = true
        this.$http.post('/cart/getShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(clickparam)
        }))
          .then(res => {
            this.tableData = res.data.data
            // 得到组合中的商品数量 在弹出框中显示
            this.poplistj = 0
            for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
              this.poplistj = this.poplistj + this.tableData.showCartProductInfoList[i].qty
            }
            this.checkList = []
            this.poplistj = this.tableData.selqty * this.tableData.groupqty
          })
      }
    },
    // 加价购数据加减
    addj () {
      this.tableData.groupqty++
    },
    handlej () {
      if (this.tableData.groupqty > 0) {
        this.tableData.groupqty--
      }
    },
    // 加价购组合商品组加减
    handleChangePopj (value) {
      this.poplistj = 0
      for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
        this.poplistj = this.poplistj + this.tableData.showCartProductInfoList[i].qty
        console.log(this.poplistj)
      }
    },
    // 处理加价购数据
    handleClosej () {
      this.poplistj = 0
      for (var i = 0; i < this.tableData.showCartProductInfoList.length; i++) {
        if (this.tableData.showCartProductInfoList[i].qty !== 0) {
          this.checkList.push(this.tableData.showCartProductInfoList[i])
          this.poplistj = this.poplistj + this.tableData.showCartProductInfoList[i].qty
        }
      }
      // console.log('this.tableData.maxqty=>', this.tableData.maxqty)
      // console.log('this.tableData.groupqty=>', this.tableData.groupqty)
      if (this.tableData.maxqty >= this.poplistj * this.tableData.groupqty) {
        this.$http.post('/cart/dealShowCartPromoPop', Object.assign({}, this.member, {
          'answersParameter': JSON.parse(this.tableData.operparam),
          'list': this.checkList,
          'receptionParameter': {
            'groupqty': this.tableData.groupqty
          }
        }))
          .then(res => {
            this.dialogVisible2 = false
            this.datas = res.data.data
          })
      } else {
        alert(this.tableData.maxmsg + '，请重新选择')
      }
    },
    faclick () {
      this.popupVisible = false
    }
  }
}
</script>
<style>
  /* shopcar样式 */
    #shopcar {
      width: 100%;
      height:100%;
      overflow: auto;
      overflow-x: hidden;
      padding-bottom: 50px;
    }
    #shopcar header{
      height: 38px;
      position:fixed;
      top:0;left:0;
      text-align:center;
      height:36px;
      line-height:36px;
      width:100%;
      background:#fff;
      z-index:999;
      box-shadow: 0 -1px 8px rgba(0,1,1,.08);
      border-width: 1px 0;
      border-top: 1px solid #f0f0f0 \9;
    }

    #shopcar #header_row {
      height: 38px;
      z-index: 101;
      box-shadow: 0 -1px 8px rgba(0,1,1,.08);
      background: #fff;
      border-width: 1px 0;
      border-top: 1px solid #f0f0f0;
      overflow: hidden;
    }
    #shopcar #header_row .s1,#shopcar #header_row .s2,#shopcar #header_row .s4,#shopcar #header_row .s5,#shopcar #header_row .s6,#shopcar #header_row .s7 {
      /* border: 1px solid green; */
      text-align: center;
      height: 38px;
      line-height: 38px;
      display: inline-block;
    }
    #shopcar #header_row .s1 {
    width: 12%;
    text-align: left
    }
    #shopcar #header_row .s1 .el-checkbox {
      text-align: center;
    }
    #shopcar #header_row .s1 .goodcheack {
      padding-left: 5px;
    }
    #shopcar #header_row .s2{
      width: 36%;
    }
    #shopcar #header_row .s4{
      width: 8%;
      text-align: left;
    }
    #shopcar #header_row .s5{
      width: 15%;
    }
    #shopcar #header_row .s6{
      width: 10%;
    }
    #shopcar #header_row .s7{
      width: 10%;
      margin-left: 17px;
      /* float: right; */
    }
    #shopcar footer{
      width:100%;
      height: 40px;
      display: block;
    }
    /* 全选 */
    #shopcar footer.footer .selec_all{
      width: 17%;
      text-align: center;
      display:inline-block;
      height:38px;
      line-height:38px;
      /* border:1px solid red; */
    }
    #shopcar footer.footer .selec_all .el-checkbox {
      text-align: center;
      margin:0px;
    }
    #shopcar footer.footer .selec_all  .goodcheack {
      padding-left: 3px;
    }
    /* 删除选中商品 清空购物车 */
    #shopcar footer .operation{
      width: 26%;
    }
    #shopcar footer .operation button{
      display: inline-block;
      width: 48%;
      border: none;
      background-color: #fff;
      line-height: 38px;
      height: 38px;
    }
  /* @media only screen and (min-width: 1000px) { */
    /* 弹出界面样式设置开始任选组合 */
    .renxuan table {
      border-top: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      padding:10px 0;
    }
    .renxuan .el-dialog__header {
      padding: 18px 20px 0px;
        /* border:1px solid red; */
    }
    .renxuan .el-dialog__body {
      padding: 12px 0;
      color: #606266;
      font-size: 11px;
      /* border:1px solid red; */
    }
    .renxuan td {
      text-align: center;
      border-bottom:1px solid #eee;
      /* padding-right: 29px; */
    }
    .renxuan .el-input-number--mini{
      width: 78px;
      /* border: 1px solid red; */
    }
    .renxuan .el-input-number--mini .el-input-number__decrease,
    .el-input-number--mini .el-input-number__increase {
    width: 17px;
    font-size: 12px;
}
    .renxuan .counter {
      display: inline-block;
      width: 76px;
      height: 26px;
      line-height: 26px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 12px;
      margin-left: 30px;
      margin-top: 7px;
    }
    .renxuan .counter:hover {
      border:1px solid#409EFF;
    }
    .renxuan .counter a{
      width: 20px;
      font-size: 12px;
      height: auto;
      text-align: center;
      background: #f5f7fa;
      color: #606266;
      display: inline-block;
    }
    .renxuan .counter a:hover{
      color: #409EFF;
    }
    .renxuan .counter a:first-child {
      left: 1px;
      border-radius: 4px 0 0 4px;
      border-right: 1px solid #dcdfe6;
      margin-left: 0px;
    }
    .renxuan .counter a:last-child {
      right: 1px;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #dcdfe6;
    }
    .renxuan .counter input {
      width: 27px;
      height: 26px;
      border: none;
      text-align: center;
      margin: 0;
    }
    .renxuan .dialog-footer .el-button{
      padding: 7px 9px;
    }
    .renxuan .el-dialog__footer {
      padding: 0px 20px 10px;
    }
    /* 任选组合弹出界面样式设置结束 */
    /* 加价购界面样式设置开始 */
    .jiajiagou tr {
      text-align: center
    }
    .jiajiagou td {
      border-bottom:1px solid #eee;
      padding-right: 29px;
    }
    .jiajiagou .el-input-number--mini{
      width: 100px;
    }
    .jiajiagou .counter {
      display: inline-block;
      width: 99px;
      height: 26px;
      line-height: 26px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 12px;
      margin-left: 70px;
      margin-top: 7px;
    }
    .jiajiagou .counter:hover {
      border:1px solid#409EFF;
    }
    .jiajiagou .counter a{
      width: 26px;
      font-size: 12px;
      height: auto;
      text-align: center;
      background: #f5f7fa;
      color: #606266;
      display: inline-block;
    }
    .jiajiagou .counter a:hover{
      color: #409EFF;
    }
    .jiajiagou .counter a:first-child {
      left: 1px;
      border-radius: 4px 0 0 4px;
      border-right: 1px solid #dcdfe6;
      margin-left: 0px;
    }
    .jiajiagou .counter a:last-child {
      right: 1px;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #dcdfe6;
    }
    .jiajiagou .counter input {
      width: 38px;
      height: 26px;
      border: none;
      text-align: center;
      margin: 0;
    }
  /* } */
  /* shopcar样式结束  */
/* 加价购界面样式设置结束 */
/* 消息前面得样式设置 */
#header_row .el-badge .el-badge__content {
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 8px;
    height: 10px;
    line-height: 12px;
    padding: 0px 2px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
}
#shopcar .footer {
    width:100%;
    position:fixed;
    bottom:45px;
    left:0;
    display:block;
    background:#fff;
    z-index:999;
    box-shadow: 0 -1px 8px rgba(0,1,1,.08);
    border-width: 1px 0;
    border-top: 1px solid #f0f0f0 \9;
    margin-top:30px;
}
/* 结算弹出页面样式设置 */
#shopcar .footer .mint-popup {
  width:100%;
  height:100%
}
#shopcar .footer .mint-popup .confirmorder {
  border-bottom: 1px solid #aaa;
  height:40px;
  width:100%;
}
#shopcar .footer .mint-popup .confirmorder .fa {
  font-size: 24px;
  line-height: 40px;
  margin-left: 10px;
}
#shopcar .footer .mint-popup .confirmorder span {
  display: inline-block;
  /* border:1px solid red; */
  width:90%;
  height:40px;
  line-height: 47px;
  text-align: center
}
#shopcar .footer .mint-popup .mint-tab-container {
  text-align: center;
  padding-top:15px;
}
#shopcar .footer .mint-popup .container_bottom{
margin-top:20px;
display: block;
height:2px;
background-image:linear-gradient(90deg, rgb(235, 90, 90), white, rgb(85, 163, 236),  white, rgb(235, 90, 90), white, rgb(85, 163, 236),  white, rgb(235, 90, 90), white, rgb(85, 163, 236),  white, rgb(235, 90, 90), white);
background-size:100% 10px;
}
#shopcar .footer .mint-popup .bottom1 {
  margin-top:65px;
}
#shopcar .footer .mint-popup .address{
  display: inline-block;
  width:128px;
  height: 30px;
  line-height: 30px;
  border:1px dashed #aaa
}
#shopcar .footer .mint-popup .fa-angle-right {
  font-size: 24px;
  line-height:50px;
  margin-left:7px;
  margin-right:5px;
}
#shopcar .mint-msgbox {
  border-radius: 8px;
}
#shopcar .mint-msgbox-header{
  display: none;
}
#shopcar .mint-msgbox-message {
  color:#000;
  font-size: 14px;
  font-family:SimSun, Cochin, Georgia, Times, 'Times New Roman', serif;
}
#shopcar .mint-msgbox-content {
  padding: 26px 20px 9px;
  border:none;
}
#shopcar .mint-msgbox-btns{
  height: 50px;
}
#shopcar .cancelButton{
  color:rgb(17, 134, 42);
  margin: 5px 5px 10px 33px;
  border-radius: 35px;
  border: 1px solid #aaa;
}
#shopcar .confirmButton {
  color: #fff;
  background: rgb(17, 134, 42);
  margin: 5px 33px 10px 5px;
  border-radius: 35px;
}
</style>
