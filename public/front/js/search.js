/**
 * Created by asus1 on 2017/11/13.
 */
$(function(){

    function getData(){
        var history=localStorage.getItem("lt_search_history")||"[]";
        return JSON.parse(history);
    }


    function render(){
        var arr=getData();
        $(".lt_history").html(template("tpl",{arr:arr}));
    }
    render();

    $(".box").on("click",".remove",function(){
        mui.confirm("你确定要清空历史记录？","温馨提示",["取消","确定"],function(e){
            if(e.index===1){
                localStorage.removeItem("lt_search_history");
                render();
            }

        })
    })

    $(".box").on("click",".btn_delete",function(){
        var $this=this;
        mui.confirm("您确定要删除这条历史记录？","温馨提示",["否","是"],function(e){
            if(e.index===1){
                var arr=getData();
                var index=$($this).data("index");
                arr.splice(index,1);
                localStorage.setItem("lt_search_history",JSON.stringify(arr));
                render();
            }
        })


    })


    $(".lt_search button").on("click",function(){
        var key=$(".lt_search input").val().trim();
        $(".lt_search input").val("");

        if(key===""){
            mui.toast("请输入搜索内容");
            return false;
        }
        var arr= getData();
        var index=arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if(arr.length >=10){
            arr.pop();
        }

        arr.unshift(key);
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        render();
        location.href="searchList.html?key="+key;
    })

})