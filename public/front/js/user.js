/**
 * Created by asus1 on 2017/11/15.
 */
$(function(){
    //退出登录的点击事件
    $(".lt_logout").on("click",function(){
        $.ajax({
            url:"/user/logout",
            success:function(data){
                if(data.success){
                    mui.toast("退出登录成功");
                    setTimeout(function(){
                        location.href="login.html";
                    },1000);
                }
            }
        })
    })

    //获取个人信息
    $.ajax({
        url:"/user/queryUserMessage",
        success:function(data){
            tools.checkLogin(data);
            $(".userinfo").html(template("tpl",data));
        }
    })
})