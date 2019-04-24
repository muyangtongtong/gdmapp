<template>
    <div class="my">
        <div class="myheader">
            <div class="myheader1">
                <div class="headerleft">
                    <img src="../../assets/image/mylogo.png" alt="">
                    <div>
                        <p>188***8609</p>
                        <p style="border-radius:5px;background:green;width:60px;text-align:center;">普通会员<i class="fa fa-angle-right"></i></p>
                    </div>
                </div>
                <div class="headerright">
                    <i class="fa fa-barcode" style="border:1px solid #fff;border-radius:4px;margin-right:15px;font-size:14px"></i>
                    <i class="fa fa-bell-o" style="font-size:18px"></i>
                </div>
            </div>
            <div class="myheader2">
                <span>
                    <p>0</p>
                    <p>积分商城</p>
                </span>
                <span>
                    <p>0</p>
                    <p>优惠券</p>
                </span>
                <span>
                    <p>0</p>
                    <p>钱包.充值</p>
                </span>
            </div>
            <div class="myheader3"></div>
        </div>
        <el-card class="mymiddle mymiddle1 ">
            <div slot="header" @click="$router.push({name:'order'})">
                <span style="font-size:14px;font-weight:bold">我的订单</span>
                <span style="float:right;color:rgb(165, 162, 162)">全部订单 <i class="fa fa-angle-right" style="font-size:15px"></i> </span>
            </div>
            <div class="text item">
                <span>
                    <i class="fa fa-paypal"></i>
                    <p>待付款</p>
                </span>
                <span>
                    <i class="fa fa-floppy-o"></i>
                    <p>备货中</p>
                </span>
                <span>
                    <i class="fa fa-truck"></i>
                    <p>配送中</p>
                </span>
                <span>
                    <i class="fa fa-shopping-bag"></i>
                    <p>待自提</p>
                </span>
                <span>
                    <i class="fa fa-recycle"></i>
                    <p>售后记录</p>
                </span>
            </div>
        </el-card>
        <el-card class="mymiddle mymiddle2">
            <div slot="header" style="font-size:14px;font-weight:bold">我的服务</div>
             <div class="text item">
                <span>
                    <i class="fa fa-jpy"></i>
                    <p>充值有礼</p>
                </span>
                <span>
                    <i class="fa fa-envelope-open-o"></i>
                    <p>邀请得红包</p>
                </span>
                <span>
                    <i class="fa fa-calendar-check-o"></i>
                    <p>签到</p>
                </span>
                <span>
                    <i class="fa fa-map-marker"></i>
                    <p>收获地址</p>
                </span>
                <span>
                    <i class="fa fa-headphones"></i>
                    <p>客户服务</p>
                </span>
                <span>
                    <i class="fa fa-cog fa-fw"></i>
                    <p>设置</p>
                </span>
            </div>
        </el-card>
        <el-card class="mymiddle mybottom">
            <img src="../../assets/image/banner13.jpg" alt="">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.my {
    background: rgb(241, 245, 245);
    /* height: 629px; */
    padding-bottom: 60px;
}
/* myheader样式设置 */
.my .myheader {
    width: 100%;
    height: 150px;
    background: rgb(18, 167, 38);
    color: rgb(247, 243, 243)
}
.my .myheader .myheader1 {
    padding:20px 20px 10px
}
.my .myheader .myheader1 .headerleft{
    display: inline-block;
    height: 50px;
    width: 126px;
}
.my .myheader .myheader1 .headerleft img {
    border-radius: 45px;
    width: 45px;
    height: 45px;
    display: inline-block;
    border-color: #fff;
}
.my .myheader .myheader1 .headerleft div {
    display: inline-block;
    width: 70px;
    height: 50px;
    float: right;
}
.my .myheader .myheader1 .headerleft div p{
    display: block;
    line-height: 23px;
}
.my .myheader .myheader1 .headerright{
    float: right;
    display: inline-block;
    line-height: 46px;
}
.my .myheader .myheader2{
    height: 50px;
    padding: 0px 20px;
}
.my .myheader .myheader2 span{
    width: 32%;
    display: inline-block
}
.my .myheader .myheader2 span p{
    width: 100%;
    text-align: center;
    line-height: 23px;
}
/* mymiddle样式设置 */
.my .el-card {
    width: 92%;
    margin: 0 auto;
    margin-top: 10px;
}
.my .el-card .el-card__header {
    padding: 10px 10px;
}
.my .el-card .el-card__body{
    padding:10px 10px;
}
.my .mymiddle1 .text{
    font-size: 10px;
}
.my .mymiddle .text span {
    display: inline-block;
    width: 19%;
    text-align: center;
    padding:10px 0px;
}
.my .mymiddle1 .text span i {
    font-size: 16px;
    color: rgb(17, 131, 32)
}
.my .mymiddle1 .text span p{
    padding-top:10px;
    color: rgb(165, 162, 162)
}
/* mymiddle2样式设置 */
.my .mymiddle2 .text span{
    width: 24%;
    font-size: 10px;
    color: rgb(139, 143, 139)
}
.my .mymiddle2 .text span i {
    font-size: 16px;
    margin-bottom: 10px;
}
/* mybottom样式设置 */

.my .mybottom img {
    width: 100%;
    height: 110px;
    border-radius: 5px;
}
</style>
