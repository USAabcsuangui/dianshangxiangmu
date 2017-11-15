/**
 * Created by asus1 on 2017/11/14.
 */
$(function(){
    $(".btn_login").on("click",function(){
        var username=$("[name='username'] ").val();
        var password=$("[name='password'] ").val();
        if(!username){
            mui.toast("请输入用户名");
        }
        if(!password){
            mui.toast("请输入密码");
        }
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                if(data.success){
                    var search=location.search;
                    if(search.indexOf("retUrl") == -1){
                        location.href="user.html";
                    }else{
                        search=search.replace("?retUrl=","");
                        location.href=search;
                    }
                }else if(data.error===403){
                    //直接提示用户
                    mui.toast(data.message);
                }
            }
        })
    })
})