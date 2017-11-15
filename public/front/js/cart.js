/**
 * Created by asus1 on 2017/11/15.
 */
$(function(){

    //发送ajax获取购物车数据
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto:true,
                callback:function(){
                    $.ajax({
                        url:"/cart/queryCart",
                        success:function(data){
                            tools.checkLogin(data);

                            var i={data:data};
                            console.log(i.data);
                            $("#OA_task_2").html(template("tpl",i));

                            //结束下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        }
                    })
                }
            }
        }
    })

    //删除功能
    $(".lt_content").on("tap",".btn_delete_cart",function(){
        var id=$(this).data("id");
        mui.confirm("您是否要删除这件商品？","温馨提示",["确定","取消"],function(e){
            if(e.index==0){
                $.ajax({
                    url:"/cart/deleteCart",
                    data:{id:id},
                    success:function(data){
                        if(data.success){
                            mui.toast("删除成功");
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
    })

    //编辑功能
    $(".lt_content").on("tap",".btn_edit_cart",function(){
        var data=this.dataset;
        var html=template("tpl2",data);
        html=html.replace(/\n/g,"");

        mui.confirm(html,"编辑商品",["确定","取消"],function(e){
                if(e.index==0){
                    var id=data.id;
                    var size=$(".lt_items span.now").text();
                    var num=$(".lt_edit_num .mui-numbox-input").val();
                    $.ajax({
                        type:"post",
                        url:"/cart/updateCart",
                        data:{
                            id:id,
                            size:size,
                            num:num
                        },
                        success:function(data){
                            if(data.success){
                                mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                                $(".lt_Calculation_details .count").html("&yen;0.00");

                            }
                        }
                    })
                }

        })
        mui(".mui-numbox").numbox();
        //注册事件，选择尺码
        $(".lt_items span.size").on("click", function () {
            $(this).addClass("now").siblings().removeClass("now");
        });
    })

    //计算总金额
    $(".lt_content").on("change",".ck",function(){
        var total=0;
        $(".ck:checked").each(function(){
            total+=this.dataset.price*this.dataset.num;
            console.log(total);
        })
        $(".lt_Calculation_details .count").html("&yen;"+total.toFixed(2));
    })

})