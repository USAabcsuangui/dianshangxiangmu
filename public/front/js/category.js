$(function(){

    $.ajax({

        url:"/category/queryTopCategory",
        success:function(data){
            var html=template("tpl",data);
            $(".lt_category_l .mui-scroll").html(html);
            categoryData(data.rows[0].id);
        }
    })


    function categoryData(id){
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(data){
                $(".lt_category_r .mui-scroll").html(template("tpl2",data));
            }
        })
    }


        $(".lt_category_l").on("click","li",function(){
            $(this).addClass("now").siblings().removeClass("now");
            var id=$(this).data("id");
            categoryData(id);

            var temp=mui(".mui-scroll-wrapper").scroll()[1];
            temp.scrollTo(0,0,100);
        })

})