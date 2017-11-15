//区域滚动功能
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});


//轮播图自动播放功能
var gallery = mui('.mui-slider');
gallery.slider({
    interval:500//自动轮播周期，若为0则不自动播放，默认为0；
});

//tools工具 勇于获取url地址栏的参数
var tools={
    getParamObj:function(){
        //1.获取地址
        var search=location.search;
        //2.将获取的地址解码
        search=decodeURI(search);
        //3.把参数的?截取掉
        search=search.slice(1);
        //4.把search转换成obj对象，方便取任意参数
        var arr=search.split("&");
        var obj={}
        //5.遍历数组把其他的=截取掉放到obj对象里面
        for(var i=0;i<arr.length;i++){
            var k=arr[i].split("=")[0];
            var v=arr[i].split("=")[1];
            obj[k]=v;

        }
        return obj;
    },
    getParam:function(key){
        return this.getParamObj()[key];
    },
    checkLogin:function(data){
        if(data.error==400){
            location.href="login.html?retUrl="+location.href;
        }
    }
}