/**
 * Created by asus1 on 2017/11/13.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 100;


    //获取地址栏的参数，设置到文本框的value值中
    var key=tools.getParam("key");
    $(".lt_search input").val(key);

    //封装一个可以发送ajax请求的函数
    function render(){
        var type=$(".lt_meun a[data-type].now").data("type");
        var value=$(".lt_meun a[data-type].now").find("span").hasClass("fa-angle-down")?2:1;

        var obj={};
        obj.proName=key;
        obj.page=currentPage;
        obj.pageSize=pageSize;

        if(type){
            obj[type]=value;
        }

        $.ajax({
            url:"/product/queryProduct",
            data:obj,
            success:function(data){
                setTimeout(function(){
                    $(".lt_product").html(template("tpl",data));
                    $(".loding").css("opacity","0");
                },500);

                console.log(data);
            }
        })
    }

    render();

    //点击搜索按钮,需要获取到key，重新渲染
        $(".lt_search button").on("click",function(){
            $(".lt_product").html("");
            $(".loding").css("opacity","1");
            key=$(".lt_search input").val().trim();
            if(key===""){
                mui.toast("请输入搜索内容");
                return false;
            }
            $(".lt_meun a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
            render();
        })


    //排序功能
    $(".lt_meun [data-type]").on("click",function(){
        var $this=$(this);
        if($this.hasClass("now")){
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $this.addClass("now").siblings().removeClass("now");
            $(".lt_sort a").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    })
})