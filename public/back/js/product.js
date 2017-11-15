/**
 * Created by asus1 on 2017/11/11.
 */
$(function() {


    var currentPage = 1;
    var pageSize = 5;

    function seting() {
        $.ajax({
            url: "/product/queryProductDetailList",
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
    $(".btn_md").on("click", function () {
        $("#addModal").modal("show");
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $(".dropdown-menu").html(template("tpl2", data));


            }
        })

    })

        //下拉菜单中的a的标签注册点击事件
    $(".dropdown-menu").on("click","a",function(){
        $(".dr-text").text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $form.data("bootstrapValidator").updateStatus("brandId","VALID");
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
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入正确的数字"
                    }

                }
            },

            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    },

                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    },

                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码（比如：25-48）；"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传三张图片"
                    }
                }
            }
        }
    })


        $("#fileupload").fileupload({
            dataType:"json",
            done:function(e,data){
                if($(".img_box").find("img").length >= 3){
                    return false;
                }

                $(".img_box").append('<img data-name="'+data.result.picName+'" src="'+data.result.picAddr+'" data-src="'+data.result.picAddr+'" width="100" height="100">');
                if($(".img_box").find("img").length===3){
                    $form.data("bootstrapValidator").updateStatus("productLogo","VALID");
                }else{
                    $form.data("bootstrapValidator").updateStatus("productLogo","INVALID");
                }
            }
        })

    $form.on("success.form.bv",function(e){
        e.preventDefault();
        var data=$form.serialize();
        var  $img=$(".img_box img");

        //拼接上绝对路径地址
        data+="&picName1="+$($img[0]).data("name")+"&picAddr1="+$img[0].dataset.src;
        data+="&picName2="+$($img[1]).data("name")+"&picAddr1="+$img[1].dataset.src;
        data+="&picName3="+$($img[2]).data("name")+"&picAddr1="+$img[2].dataset.src;
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:data,
            success:function(data){
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    seting();

                    //重置
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dr-text").text("请输入二级分类");
                    $("#brandId").val("");
                    $(".img_box img").remove();
                    $("#productLogo").val("");
                }

            }
        })
    })

})
