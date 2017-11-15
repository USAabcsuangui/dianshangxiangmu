/**
 * Created by asus1 on 2017/11/14.
 */
$(function(){

        var id=tools.getParam("product");
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function(data){
            $(".scroll_content").html( template("tpl",data) );
            //渲染完成后重新启动轮播图
            mui(".mui-slider").slider({
                interval:1000
            });

            //给尺码里面的元素注册点击事件

            $(".lt_item ul>li").on("click",function(){
                $(this).addClass("size now").siblings().removeClass("now");

            });

            //渲染完成后重新初始化数字框
            mui(".mui-numbox").numbox();
        }
    })

    //添加到购物车

    $(".right_button .gouwuche").on("click",function(){
        //获取购买数量
        console.log("111");
        var num=$(".mui-numbox input").val();
        //获取尺码大小
        var size=$(".lt_item ul li.now").html();

        //判断是否是选中的状态，如果不是就要提示用户
        if(!size){
            mui.toast("请选择商品的尺码");
            return false;
        }
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:id,
                size:size,
                num:num
            },
            success:function(data){
                tools.checkLogin(data);
                if(data.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                        if(e.index==0){
                            location.href="cart.html";
                        }
                    })
                }
            }
        })
    })

})