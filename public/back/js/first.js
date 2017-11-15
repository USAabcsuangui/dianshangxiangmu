/**
 * Created by asus1 on 2017/11/10.
 */
$(function(){


    var currentPage=1;
    var pageSize=5;

    function seting(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
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


    //点击弹出模态框
    $(".btn_md").on("click",function(){
        $("#addModal").modal("show");

    })


    //表单校验
    var $form=$("form");
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv",function(e){
        e.preventDefault();
        console.log("!23124");
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    seting();
                    currentPage=1;
                    $("#addModal").modal("hide");
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                }
            }
        })
    })

})
