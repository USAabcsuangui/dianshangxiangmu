/**
 * Created by asus1 on 2017/11/10.
 */

$(function(){

    var currentPage=1;
    var pageSize=5;

    function seting(){
        $.ajax({
            url:"/user/queryUser",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                $("tbody").html( template("tpl",data) );

                //分页的控件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),//总页数
                    size:"mini",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage=page;
                        seting();
                    }
                });

            }
        })

    }
    seting();



    //点击禁用或启用按钮更改状态

    $("tbody").on("click",".btns",function(){
        $("#btnsModal").modal("show");
        var id=$(this).parent().data("id");
        var isDelete=$(this).hasClass("btn-success")?1:0;

        $(".btn_edit").off().on("click",function(){
            $.ajax({
                url:"/user/updateUser",
                type:"post",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    if(data.success){
                        $("#btnsModal").modal("hide");
                        seting();
                    }
                }
            })
        })

    })
})
