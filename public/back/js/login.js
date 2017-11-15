
//入口函数
$(function(){
    var $form=$("form");

    //调用bootstrapValidator  校验表单
    //调用bootstrapValidator 校验表单
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields: {
            //对应了表单中的name属性
            username: {
                //写username所有的校验规则
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度是6-12位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }

            }
        }
    });




//给比偶氮注册一个校验成功的事件   success.form.bv

$form.on("success.form.bv",function(e){
    //阻止form表单跳转行为，因为我要自己通过ajax发送url地址
    e.preventDefault();
    //使用ajax发送登录请求
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",

        data:$form.serialize(),
        success:function(data){
            //判断当前的账号密码是否正确
        if(data.success){
            var userName=$(".form-control").val();
            location.href="index.html?username="+userName;
        }

        if(data.error===1001){
            $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
        if(data.error===1000){
            $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }

        }

    })

})

    //表单重置功能
    $("[type='reset']").on("click", function () {

        //获取到validator对象，调用resetForm方法
        $form.data("bootstrapValidator").resetForm();

    });


});