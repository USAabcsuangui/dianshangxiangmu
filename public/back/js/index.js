/**
 * Created by asus1 on 2017/11/9.
 */
var myChart = echarts.init(document.getElementById('main'));


var option = {
    color: ['red'],
    title: {
        text: '2017年注册人数'
    },

    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ["1月","2月","3月","4月","5月","6月"],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[1000, 1499, 800, 2000, 1300, 1600]
        }
    ]
};
myChart.setOption(option);

var myChart = echarts.init(document.getElementById('main1'));
var option1 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪','耐克','李宁','乔丹','安踏']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪'},
                {value:310, name:'耐克'},
                {value:234, name:'李宁'},
                {value:135, name:'乔丹'},
                {value:1548, name:'安踏'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option1);



