<template>
  <div>
    <div class="min-classObject" style="height:62px;width:100%;">
      <div class="s1">
        <!-- <el-checkbox v-show="text.ischoice != 2" :class="'line-circle'+item.isgroup" @change="checkchange(item.operparam, item.proid, item.ischoice)" v-model="checkchoice"></el-checkbox> -->
        赠品
      </div>
      <!--2 商品图片属性及名称 -->
      <div class="s2">
        <a><img :src="item.productvarimage" alt=""></a>
      </div>
      <div class="s3">
        <a href="" class="s2_name" v-text="item['productvarname']"></a>
        <div class="s3_div" v-if="item['operstatus']==0">
          <!-- 判断iseditqty等于0 是没有计数器 -->
          <div v-if="item['iseditqty'] == '0'">
            <div v-if="item['calqtytype']==0">{{item.qty + 'X' + item.updateqty}}</div>
            <div v-else-if="item['calqtytype']==1">{{'X' + item.updateqty}}</div>
          </div>
          <!-- 判断iseditqty等于1 有计数器 -->
          <div id="calcu" v-else-if="item['iseditqty'] == 1">
            <a @click="handleChange(item.operparam, 1, -1)">-</a>
            <input type="text" v-if="item['maxqty'] == '-1'" @change="handleChange(item.operparam, 0, item.updateqty)" id="input" v-model="item.updateqty" :min="item.minqty" :max="200">
            <input type="text" v-else-if="item['maxqty'] != '-1'"   @change="handleChange(item.operparam, 0, item.updateqty)" id="input" v-model="item.updateqty" :min="item.minqty" :max="item.maxqty">
            <a @click="handleChange(item.operparam, 1, +1)">+</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'ind', 'id', 'data1', 'ind1'],
  data () {
    return {
      clickwidth: 0,
      text: {},
      checked: true,
      num1: 3,
      isshow: false,
      isshow1: true,
      elements: []
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
      let clazz = 'gift itemDisable'
      if (this.item.operstatus === 0) {
        if (this.data1.ischoice === 1) {
          clazz = 'gift itemChoice'
        } else {
          clazz = 'gift itemNormal'
        }
      }
      return clazz
    }
  },
  watch: {
    item: {
      handler: function () {
        this.text = this.item
      },
      immediate: true
    },
    clickwidth () {
      // console.log('gift_clickwidth=>', this.clickwidth)
    }
  },
  mounted () {
    this.clickwidth = document.documentElement.clientWidth || document.body.clientWidth
  },
  methods: {
    handleChange (operparam, opertype, num) {
      this.$emit('inputNumberChange', operparam, opertype, num)
    },
    // 商品的选中和取消选中
    checkchange (operparam, id, choice) {
      this.$emit('dealShowCartChoice', operparam, id, choice)
    },
    // 删除
    open2 (operparam, ischoice, proid, protype) {
      this.$emit('delet_nom', operparam, ischoice, proid, protype)
    },
    showtoggle () {
      this.isshow = !this.isshow
      this.isshow1 = !this.isshow1
    },
    pro () {
      this.isshow1 = !this.isshow1
    }

  }
}
</script>

<style>
  .min-classObject .s1, .min-classObject .s2, .min-classObject .s3{
    display: inline-block;
    /* border:1px solid red; */
    height: 58px;
  }
  .min-classObject .s1 {
    width:7%;
    line-height: 58px;
    text-align: center;

  }
  .min-classObject .s2 {
    min-width: 60px;
    width:10%;
    float: left;
  }
  .min-classObject .s2 a {
    display: block;
    width: 57px;
    height:57px;
    border:1px solid blue;
  }
  .min-classObject .s2 a img{
    width: 57px;
    height:57px;
  }
  .min-classObject .s3{
    width:60%;
    line-height: 50px;
  }
  .min-classObject .s3 .s3_div {
    display: inline-block;
    margin-left:5px;
    color: #000;
    font-weight: bold
  }
</style>
