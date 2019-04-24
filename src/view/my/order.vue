<template>
    <div class="order">
        <div style="width:100%;border-bottom:1px solid #eee">
            <i class="fa fa-angle-left" @click="$router.push({name:'my'})"></i>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">APP订单</mt-tab-item>
                <mt-tab-item id="2">门店订单</mt-tab-item>
            </mt-navbar>
        </div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">全部</el-menu-item>
                    <el-menu-item index="2">待付款</el-menu-item>
                    <el-menu-item index="3">备货中</el-menu-item>
                    <el-menu-item index="4">配送中</el-menu-item>
                    <el-menu-item index="5">待自提</el-menu-item>
                </el-menu>
                <template>
                    <!-- <router-link></router-link> -->
                </template>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                门店
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      selected: '1',
      selected1: '1'
    }
  }

}
</script>

<style>
.order .mint-navbar {
    border-bottom: 1px solid #eee;
    /* line-height: 38px; */
    position: relative;
    left: 17%;
    display: inline-block;
    width:130px;
    margin: 3px auto;
    border:1px solid rgb(88, 177, 88);
    border-radius: 20px;
    padding:0px;
}
.order i{
    display: inline-block;
    width: 15%;
    font-size: 20px;
    line-height: 40px;
    padding-left: 10px;
}
.order .mint-navbar .mint-tab-item {
    border-bottom: none;
    color: rgb(88, 177, 88);
    display: inline-block;
    width: 48.6%;
   line-height: 37px;
    margin-left: 0;
    padding: 10px 0px;
}
.order .mint-navbar .mint-tab-item:first-child{
    /* border:1px solid rgb(88, 177, 88); */
    border-right: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.order .mint-navbar .mint-tab-item:last-child{
    /* border:1px solid rgb(88, 177, 88); */
    border-left: none;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

}
.order .mint-navbar .mint-tab-item.is-selected{
     border-bottom: none;
     background: rgb(88, 177, 88);
     color: #fff;
     /* height: 35px;
    line-height: 35px; */
    margin-left: 0px;
}
.order .el-menu--horizontal>.el-menu-item {
    width:20%;
    font-size: 10px;
    width: 19.7%;
    height: 32px;
    line-height: 32px;
}
</style>
