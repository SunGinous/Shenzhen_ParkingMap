var dom2 = document.getElementById("table2");
var myChart2 = echarts.init(dom2, 'theme_dark');
var app = {};
option = null;
app.title = '深圳市出入停车场情况';

option = {
    title: {
        text: '停车场进出入请求',
		textStyle: {
            fontSize: 20,
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['入场请求', '出场请求'],
		left: 'right'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['龙华区','龙岗区','盐田区','宝安区','南山区','福田区','罗湖区','光明新区','大鹏新区','坪山新区']
    },
    series: [
        {
            name: '入场请求',
            type: 'bar',
            data: [66,100,145,56,120,33,42,78,54,45]
        },
        {
            name: '出场请求',
            type: 'bar',
            data: [12,43,62,43,33,23,54,43,24,34]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart2.setOption(option, true);
}