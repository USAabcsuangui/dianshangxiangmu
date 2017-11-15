
//进度条
//$(document).ajaxStart(function(){});是全局ajax事件开启时会触发的事件
$(document).ajaxStart(function(){
    NProgress.start();
});
//$(document).ajaxStop(function(){});是全局ajax事件开启时会触发的事件
$(document).ajaxStop(function(){
        NProgress.done();


})


//页面一加载，就会发送ajax请求判断用户是否在登录状态
if(location.href.indexOf("login.html")==-1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function(data){
            if(data.error==400){
                location.href="login.html";
            }
        }
    })
}

//保存用户名
function getRequest() {
    var url = window.location.search;
    //  获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}

// 获取url 的地址是对象
var url_data=getRequest();
var user=url_data;
$(".user span.users").text(user.username);
$(".a1").attr("href","user.html?username="+user.username);
$(".a2").attr("href","first.html?username="+user.username);
$(".a3").attr("href","second.html?username="+user.username);
$(".a4").attr("href","product.html?username="+user.username);
$(".a5").attr("href","index.html?username="+user.username);

var date=new Date();
var hour=date.getHours();
switch (hour){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        $(".user p .time").text("凌晨好:")
        break;
    case 7:
    case 8:
    case 9:
    case 10:
        $(".user p .time").text("早上好:")
        break;
    case 11:
    case 12:
        $(".user p .time").text("中午好:")
        break;
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
        $(".user p .time").text("下午好:")
        break;
    case 20:
    case 21:
    case 22:
    case 23:
        $(".user p .time").text("晚上好:")
        break;
}

//分类管理的点击滑动展开
$(".nav>ul>li").eq(1).on("click",function(){
    $(this).find(".child").slideToggle();
})

//点击侧边栏隐藏
$(".topbar a.pull-left").on("click",function(){
    $(".lt_aside").slideToggle(100);
    setTimeout(function(){
        $(".box").toggleClass('now');
        $(".topbar a.pull-left").toggleClass("nows");
    },50)

})


//点击退出登录框
$(".topbar a.pull-right").on("click",function(){
    $("#logoutModal").modal("show");
})

//点击退出的确定安钮
$(".modal .btn-primary").on("click",function(){
    $.ajax({
        url:"/employee/employeeLogout",
        type:"get",
        success:function(data){
            if(data.success){
                location.href="login.html";
            }
        }
    })
})

