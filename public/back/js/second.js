
/**
 * Created by asus1 on 2017/11/10.
 */

$(function() {


    var currentPage = 1;
    var pageSize = 5;

    function seting() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $("tbody").html(template("tpl1", data));

                //分页的控件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(data.total / pageSize),//总页数
                    size: "mini",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
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
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                $(".dropdown-menu").html( template("tpl2",data) );

            }
        })

    })




    $(".dropdown-menu").on("click","a",function(){
        $(".dr-text").text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $form.data("bootstrapValidator").updateStatus("categoryId","VALID");
    })
//初始化文件上传
    $("#fileupload").fileupload({
        datatype:"json",
        done:function(e,data){
            $(".img_data").attr("src",data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    })
    //表单校验

    var $form=$("form");
    $form.bootstrapValidator({
        //设置不校验的内容，所有的都校验
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            },
        }
    })

    //注册成功事件
    $form.on("success.form.bv",function(e){
        //e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    seting();
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dr-text").text("请选择一级分类");
                    $(".img_data").attr("src","images/none.png");
                    $("#categoryId").val("");
                    $("#brandLogo").val("");
                }
            }
        })
    })
})

