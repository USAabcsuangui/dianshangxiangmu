/**
 * Created by asus1 on 2017/11/14.
 */
$(function(){

    //获取验证码事件
    $(".btn_code").on("click",function(e){
        //阻止button的默认跳转事件
        e.preventDefault();
        var $this=$(this);
        //发送ajax的途中把button的按钮禁用
        $this.addClass("disabled").prop("disabled",true).text("正在发送中...");
        $.ajax({
            type:"get",
            url:"/user/vCode",
            success:function(data){
                console.log(data);
                var count=5;
                var time=setInterval(function(){
                    count--;
                    $this.text(count+"秒后再次发送");
                    if(count<=0){
                        clearInterval(time);
                        //倒计时结束后把button恢复初始状态
                        $this.addClass("disabled").prop("disabled",false).text("获取验证码");
                    }
                },1000)
            }
        })
    })

    //注册点击事件
    $(".btn_getCode").on("click",function(){
        var username=$("[name='username']").val();
        var password=$("[name='password']").val();
        var repassword=$("[name='repassword']").val();
        var mobile=$("[name='mobile']").val();
        var vcode=$("[name='vCode']").val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        if(!repassword){
            mui.toast("请再次输入密码");
            return false;
        }
        if(!username){
            mui.toast("请输入手机号");
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast("请输入正确的手机号");
            return false;
        }
        if(!vcode){
            mui.toast("请输入验证码");
            return false;
        }
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vcode
            },
            success:function(data){
                if(data.success){
                    mui.toast("恭喜你，注册成功，一秒后跳转到登录页");
                    location.href="login.html";
                }else{
                    mui.toast(data.message);
                }
            }
        })

    })
})