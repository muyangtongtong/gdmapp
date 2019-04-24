<template>
  <div class="min-classObject" style="height:102px;width:100%;">
      <div class="slider">
        <div class="content"
          @touchstart='touchStart'
          @touchmove='touchMove'
          @touchend='touchEnd'
          :style="deleteSlider">
          <slot>
            <div class="s1">
              <el-checkbox v-show="text.ischoice != 2" :class="'line-circle'+item.isgroup" @change="checkchange(item.operparam, item.proid, item.ischoice)" v-model="checkchoice"></el-checkbox>
            </div>
            <!--2 商品图片属性及名称 -->
            <div class="s2">
              <a class="s2_img"><img :src="item.productvarimage"  alt="这是图片"></a>
              <div class="s2_right">
                <a class="s2_name" href="" v-text="item['productvarname']"></a>
                <div class="s2_field">
                  <span v-if="item['fieldname2']" >{{item.fieldname2 + ':' + item.fielditemname2}}</span>
                  <span v-if="item['fieldname1']">{{item.fieldname1 + ':' + item.fielditemname1}}</span>
                </div>
                <div class="s2_bottom" style="margin-bottom:0px;padding-bottom:0px;">
                  <p style="width:39%;display:inline-block">{{'￥'+item.retailprice}}</p>
                  <!-- 判断iseditqty等于0 是没有计数器 -->
                  <div style="display:inline-block;text-align:right;">
                    <div class="s5_edit" v-if="item['iseditqty'] == '0'">
                      <div v-if="item['calqtytype']==0">{{item.qty + 'X' + item.updateqty}}</div>
                      <div v-else-if="item['calqtytype']==1">{{'X' + item.updateqty}}</div>
                    </div>
                    <!-- 判断iseditqty等于1 有计数器 -->
                    <div id="calcu" v-else-if="item['iseditqty'] == 1">
                      <!-- 判断计数器里的值如果小于1时 减数的按钮不可用 大于1时可用 -->
                      <a style="display:inline-block;text-align:center" v-if="item.updateqty == item.minqty" href="" class="disabled" onclick="return false;">-</a>
                      <a style="display:inline-block;text-align:center" v-else-if="item.updateqty != '1'" class="abled" @click="handleChange(item.operparam, 1, -1, item.updateqty)">-</a>
                      <input style="width:40px;text-align:center" type="text" id="input" @change="handleChange(item.operparam, 0, item.updateqty, item.updateqty)" v-model="item.updateqty">
                      <a style="display:inline-block;text-align:center" @click="handleChange(item.operparam, 1, 1, item.updateqty)">+</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="remove" ref='remove' @click="open2(item.operparam, item.productvarname)">删除</div>
          </slot>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {CellSwipe, MessageBox} from 'mint-ui'
// import { MessageBox } from 'mint-ui'
Vue.component(CellSwipe.name, CellSwipe)
// 点击任何地方促销框都能收起
const clickoutside = {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  updated () {},
  unbind (el, binding) {
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  }
}
export default {
  props: ['item', 'ind', 'id', 'data1', 'ind1'],
  data () {
    return {
      text: {},
      checked: true,
      num1: 3,
      isshow: false,
      isshow1: true,
      elements: [],
      checkpro: '',
      rightButtons: [],
      isshowdiv: false,
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '' // 滑动时的效果,使用v-bind:style="deleteSlider"
    }
  },
  computed: {
    checkchoice: {
      get: function () {
        return this.text.ischoice === 1
      },
      set: function (v) {
        this.text.ischoice = v ? 1 : 0
      }
    },
    classObject () {
      let clazz = 'row itemDisable'
      if (this.item.operstatus === 0) {
        if (this.item.ischoice === 1) {
          clazz = 'row itemChoice'
          // console.log(clazz)
        } else if (this.data1.ischoice === 1) {
          // console.log('111')
          clazz = 'row itemChoice'
        } else {
          clazz = 'row itemNormal'
        }
      }
      return clazz
    }
  },
  watch: {
    item: {
      handler: function (val, oldVal) {
        this.text = this.item
      },
      immediate: true
    }
  },
  created () {
  },
  mounted () {
    // this.clickwidth = document.documentElement.clientWidth || document.body.clientWidth
  },
  directives: {clickoutside},
  methods: {
    touchStart (ev) {
      ev = ev || event
      if (ev.touches.length === 1) {
        this.startX = ev.touches[0].clientX
      }
    },
    touchMove (ev) {
      ev = ev || event
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = this.$refs.remove.offsetWidth
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX
        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX
        // console.log(this.disX)
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX === 0) {
          this.deleteSlider = 'transform:translateX(0px)'
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = 'transform:translateX(-' + this.disX * 5 + 'px)'
          // console.log('this.deleteSlider=>', this.deleteSlider)
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
          }
        }
      }
    },
    touchEnd (ev) {
      ev = ev || event
      let wd = this.$refs.remove.offsetWidth
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX
        this.disX = this.startX - endX
        // 如果距离小于删除按钮一半,强行回到起点
        if ((this.disX * 5) < (wd / 2)) {
          this.deleteSlider = 'transform:translateX(0px)'
        } else {
          // 大于一半 滑动到最大值
          this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
        }
      }
    },
    // 点击计数器出发该方法
    handleChange (operparam, opertype, num, updataqty) {
      this.$emit('inputNumberChange', operparam, opertype, num, updataqty)
    },
    // 商品的选中和取消选中
    checkchange (operparam, id, choice) {
      console.log('choice=>', choice)
      this.$emit('dealShowCartChoice', operparam, id, choice)
    },
    // 删除
    open2 (operparam, productvarname) {
      MessageBox.confirm('', {
        message: '确定删除' + productvarname + '吗?',
        confirmButtonClass: 'confirmButton',
        cancelButtonClass: 'cancelButton'
      }).then(action => {
        this.$emit('delet_nom', operparam)
      }).catch(() => {
      })
    },
    // 商品促销框中方法
    showtoggle (selpromo) {
      for (var i = 0; i < selpromo.length; i++) {
        if (selpromo[i].ischoice === 1) {
          this.checkpro = selpromo[i].id
          // console.log('checkpro=>', selpromo[i].id)
        }
      }
      this.isshow = !this.isshow
      this.isshow1 = !this.isshow1
    },
    handleClose () {
      this.isshow = false
      this.isshow1 = true
    },
    // 选中促销框中的促销列表项时，触发得方法
    getRadioVal (val) {
      // this.inputval = val.target.value
      // this.inputval = val
      this.$emit('getRadioVal', val)
      console.log('val.id=>', val.id)
    },
    // 商品促销框中点击确定触发得方法
    showtogglesure (operparam) {
      this.isshow = !this.isshow
      this.isshow1 = !this.isshow1
      this.$emit('showtogglesure', operparam)
    }
  }
}

</script>

<style scope>
 .slider{
    width: 100%;
    height:102px;
    position: relative;
    user-select: none;
  }
  .slider .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /* background:green; */
    z-index: 100;
    width: 100%;
    transition: 0.4s;
  }
  .slider .remove{
    position: absolute;
    width:50px;
    height:102px;
    background:red;
    right: -50px;
    top: 0;
    color:#fff;
    text-align: center;
    font-size: 12px;
    line-height: 102px;
  }

.el-radio.el-radio {
  margin-left:0px;
  font-size: 10px;
}
.el-radio__label {
  font-size: 10px!important
}
.el-radio__input.is-checked+.el-radio__label {
    color: #666;
}
.min-classObject {
  overflow: hidden;
  width:100%;
  /* border:1px solid red; */
}
.min-classObject .s1, .min-classObject .s2, .min-classObject .s4, .min-classObject .s5{
  display: inline-block;
  /* border:1px solid blue; */
  height:100px;
}
.min-classObject .s1 {
  width: 10%;
  float: left;
  line-height: 70px;
  padding-left:5px;
  /* border:1px solid red; */
}
.min-classObject .s2 {
  width:90%;
  /* float: right; */
  /* border:1px solid red; */
}
.min-classObject .s2 .s2_img {
  display: inline-block;
  float: left;
  margin-top:3px;
  width:80px;
  height:92px;
  line-height: 100px;
  border:1px solid #aaa;
}
.min-classObject .s2 .s2_img img{
  border:1px solid #aaa;
  border-radius: 80px;
  display: inline-block;
  width:80px;
  height:80px;
}
.min-classObject .s2 .s2_right{
  width:50%;
  margin-left:12px;
  display:inline-block;
  height:100px;
  overflow: hidden;
  font-size: 10px;
  /* border:1px solid red; */
}
.min-classObject .s2 .s2_right .s2_name{
  display: block;
  height:40px;
  margin-top:10px;
}
.min-classObject .s2 .s2_right .s2_field {
  text-align: left;
  height: 18px;
  display: block;
  margin: 5px 0;
  overflow: hidden;
}
.min-classObject .s2 .s2_right .s2_bottom {
  display: block;
  bottom: 0px;
  height:20px;
}
.min-classObject .s2 .s2_right .s2_bottom p {
  float: left;
  display: inline-block;
  height:20px;
  line-height:20px;
}
.min-classObject .s2 .s2_right .s2_bottom #calcu {
  background-color: #fff;
  border: 1px solid #cacbcb;
  border-radius: 4px;
  color:#666;
  height: 22px;
  line-height: 20px;
  display: block;
  text-align: right
}
 .min-classObject .s2 .s2_right .s2_bottom .s5_edit {
  height: 20px;
  line-height: 20px;
  /* border:1px solid blue; */
}
.min-classObject .s2 .s2_right .s2_bottom #calcu:hover{
  color: #409EFF;
  border:1px solid #409EFF;
}
.min-classObject .s2 .s2_right .s2_bottom #calcu a.abled:hover{
  color: #409EFF;
}
.min-classObject .s2 .s2_right .s2_bottom #input{
  display: inline-block;
  width: 33px;
  height: 16px;
  line-height: 17px;
  text-align: center;
  border:none;
  background: #fff;
}
.min-classObject .s2 .s2_right .s2_bottom #calcu a{
  text-align: center;
  margin:0;
  padding: 0px;
  width: 13px;
  height: 20px;
  display: inline-block;
}
.min-classObject .s2 .s2_right .s2_bottom #calcu a:first-child{
  border-right: 1px solid #cacbcb;
}
.min-classObject .s2 .s2_right .s2_bottom #calcu a:last-child{
  border-left: 1px solid #cacbcb;
}
.mint-msgbox {
  border-radius: 8px;
}
.mint-msgbox-header{
  display: none;
}
.mint-msgbox-message {
  color:#000;
  font-size: 14px;
  font-family:SimSun, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.mint-msgbox-content {
  padding: 26px 20px 9px;
  border:none;
}
.mint-msgbox-btns{
  height: 50px;
}
.cancelButton{
  color:rgb(17, 134, 42);
  margin: 5px 5px 10px 33px;
  border-radius: 35px;
  border: 1px solid #aaa;
}
.confirmButton {
  color: #fff;
  background: rgb(17, 134, 42);
  margin: 5px 33px 10px 5px;
  border-radius: 35px;
}
</style>
