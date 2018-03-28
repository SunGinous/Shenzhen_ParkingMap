var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '深圳停车场/交通流 - 线特效';

/*首先渲染地图底板，且只渲染一次*/
$.ajax({
    url: 'data/name_value.json',
    type: 'GET',
    dataType: 'json',
    success: function(data1) {
        $.ajax({
            url: 'data/lng_lat.json',
            type: 'GET',
            dataType: 'json',
            success: function(data2) {
                console.log(data1);
                console.log(data2);
                var data_parking = data1;
                var geoCoordMap = data2;
                var convertData = function(data, num) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].value == num) {
                            var geoCoord = geoCoordMap[data[i].name];
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value)
                                });

                            }
                        }
                    }
                    return res;
                };

                option = {
                    bmap: {
                        center: [114.05, 22.55],
                        zoom: 14,
                        roam: true,
                        mapStyle: {
                            styleJson: [{
                                    'featureType': 'land', //调整土地颜色
                                    'elementType': 'geometry',
                                    'stylers': {
                                        //'color': '#323c48'
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'building', //调整建筑物颜色
                                    'elementType': 'geometry',
                                    'stylers': {
                                        //'color': '#2c343c'
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'building', //调整建筑物标签是否可视
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'highway', //调整高速道路颜色
                                    'elementType': 'geometry',
                                    'stylers': {
                                        //'color': '#6e7074'
                                        'color': '#999999'
                                    }
                                },
                                {
                                    'featureType': 'highway', //调整高速名字是否可视
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'on'
                                    }
                                },
                                {
                                    'featureType': 'arterial', //调整一些干道颜色
                                    'elementType': 'geometry',
                                    'stylers': {
                                        //'color':'#2a333d'
                                        'color': '#999999'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'green',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'water',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        //'color': '#404a59'
                                        'color': '#2a333d'
                                    }
                                },
                                {
                                    'featureType': 'subway', //调整地铁颜色
                                    'elementType': 'geometry.stroke',
                                    'stylers': {
                                        'color': '#003051'
                                    }
                                },
                                {
                                    'featureType': 'subway',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'all', //调整所有的标签的边缘颜色
                                    'elementType': 'labels.text.stroke',
                                    'stylers': {
                                        'color': '#313131'
                                    }
                                },
                                {
                                    'featureType': 'all', //调整所有标签的填充颜色
                                    'elementType': 'labels.text.fill',
                                    'stylers': {
                                        'color': '#FFFFFF'
                                    }
                                },
                                {
                                    'featureType': 'manmade',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'manmade',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'local',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'local',
                                    'elementType': 'labels',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'subway',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'lightness': -65
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'all',
                                    'stylers': {
                                        'lightness': -40
                                    }
                                },
                                {
                                    'featureType': 'boundary',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#8b8787',
                                        'weight': '1',
                                        'lightness': -29
                                    }
                                }
                            ]
                        }
                    },

                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        left: 'right',
                        y: 'bottom',
                        data: ['第一类停车场', '第二类停车场', '第三类停车场', '第四类停车场', '第五类停车场', '第六类停车场', '第七类停车场'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    /*
	                visualMap: { //图例值控制
                        min: 50,
                        max: 100,
                        calculable: true,
		                top: 'center',
		                left: 'right',
                        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua', 'blue'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
	                */
                };
                myChart.setOption(option);
                /*下面加载停车诱导流图*/
                var url = ['data/2017年11月1日.json', 'data/2017年11月2日.json', 'data/2017年11月3日.json', 'data/2017年11月4日.json', 'data/2017年11月5日.json', 'data/2017年11月6日.json', 'data/2017年11月7日.json', 'data/2017年11月8日.json', 'data/2017年11月9日.json', 'data/2017年11月10日.json', 'data/2017年11月11日.json', 'data/2017年11月12日.json', 'data/2017年11月13日.json', 'data/2017年11月14日.json', 'data/2017年11月15日.json', 'data/2017年11月16日.json', 'data/2017年11月17日.json', 'data/2017年11月18日.json', 'data/2017年11月19日.json', 'data/2017年11月20日.json', 'data/2017年11月21日.json', 'data/2017年11月22日.json', 'data/2017年11月23日.json', 'data/2017年11月24日.json', 'data/2017年11月25日.json', 'data/2017年11月26日.json', 'data/2017年11月27日.json', 'data/2017年11月28日.json', 'data/2017年11月29日.json', 'data/2017年11月30日.json', 'data/2017年12月1日.json', 'data/2017年12月2日.json', 'data/2017年12月3日.json', 'data/2017年12月4日.json', 'data/2017年12月5日.json', 'data/2017年12月6日.json', 'data/2017年12月7日.json', 'data/2017年12月8日.json', 'data/2017年12月9日.json', 'data/2017年12月10日.json', 'data/2017年12月11日.json', 'data/2017年12月12日.json', 'data/2017年12月13日.json', 'data/2017年12月14日.json', 'data/2017年12月15日.json', 'data/2017年12月16日.json', 'data/2017年12月17日.json', 'data/2017年12月18日.json', 'data/2017年12月19日.json', 'data/2017年12月20日.json', 'data/2017年12月21日.json', 'data/2017年12月22日.json', 'data/2017年12月23日.json', 'data/2017年12月24日.json', 'data/2017年12月25日.json', 'data/2017年12月26日.json', 'data/2017年12月27日.json', 'data/2017年12月28日.json', 'data/2017年12月29日.json', 'data/2017年12月30日.json', 'data/2017年12月31日.json', 'data/2018年1月1日.json', 'data/2018年1月2日.json', 'data/2018年1月3日.json', 'data/2018年1月4日.json', 'data/2018年1月5日.json', 'data/2018年1月6日.json', 'data/2018年1月7日.json', 'data/2018年1月8日.json', 'data/2018年1月9日.json', 'data/2018年1月10日.json', 'data/2018年1月11日.json', 'data/2018年1月12日.json', 'data/2018年1月13日.json', 'data/2018年1月14日.json', 'data/2018年1月15日.json', 'data/2018年1月16日.json', 'data/2018年1月17日.json', 'data/2018年1月18日.json', 'data/2018年1月19日.json', 'data/2018年1月20日.json', 'data/2018年1月21日.json', 'data/2018年1月22日.json', 'data/2018年1月23日.json', 'data/2018年1月24日.json', 'data/2018年1月25日.json', 'data/2018年1月26日.json', 'data/2018年1月27日.json', 'data/2018年1月28日.json', 'data/2018年1月29日.json', 'data/2018年1月30日.json', 'data/2018年1月31日.json', 'data/2018年2月1日.json', 'data/2018年2月2日.json', 'data/2018年2月3日.json', 'data/2018年2月4日.json', 'data/2018年2月5日.json', 'data/2018年2月6日.json', 'data/2018年2月7日.json', 'data/2018年2月8日.json', 'data/2018年2月9日.json'];
                var date = ['2017年11月1日', '2017年11月2日', '2017年11月3日', '2017年11月4日', '2017年11月5日', '2017年11月6日', '2017年11月7日', '2017年11月8日', '2017年11月9日', '2017年11月10日', '2017年11月11日', '2017年11月12日', '2017年11月13日', '2017年11月14日', '2017年11月15日', '2017年11月16日', '2017年11月17日', '2017年11月18日', '2017年11月19日', '2017年11月20日', '2017年11月21日', '2017年11月22日', '2017年11月23日', '2017年11月24日', '2017年11月25日', '2017年11月26日', '2017年11月27日', '2017年11月28日', '2017年11月29日', '2017年11月30日', '2017年12月1日', '2017年12月2日', '2017年12月3日', '2017年12月4日', '2017年12月5日', '2017年12月6日', '2017年12月7日', '2017年12月8日', '2017年12月9日', '2017年12月10日', '2017年12月11日', '2017年12月12日', '2017年12月13日', '2017年12月14日', '2017年12月15日', '2017年12月16日', '2017年12月17日', '2017年12月18日', '2017年12月19日', '2017年12月20日', '2017年12月21日', '2017年12月22日', '2017年12月23日', '2017年12月24日', '2017年12月25日', '2017年12月26日', '2017年12月27日', '2017年12月28日', '2017年12月29日', '2017年12月30日', '2017年12月31日', '2018年1月1日', '2018年1月2日', '2018年1月3日', '2018年1月4日', '2018年1月5日', '2018年1月6日', '2018年1月7日', '2018年1月8日', '2018年1月9日', '2018年1月10日', '2018年1月11日', '2018年1月12日', '2018年1月13日', '2018年1月14日', '2018年1月15日', '2018年1月16日', '2018年1月17日', '2018年1月18日', '2018年1月19日', '2018年1月20日', '2018年1月21日', '2018年1月22日', '2018年1月23日', '2018年1月24日', '2018年1月25日', '2018年1月26日', '2018年1月27日', '2018年1月28日', '2018年1月29日', '2018年1月30日', '2018年1月31日', '2018年2月1日', '2018年2月2日', '2018年2月3日', '2018年2月4日', '2018年2月5日', '2018年2月6日', '2018年2月7日', '2018年2月8日', '2018年2月9日'];
                void
                function loop(i) {
                    if (i < url.length) {
                        temp = date[i];
                        $.ajax({
                            url: url[i],
                            type: 'GET',
                            dataType: 'json',
                            success: function(data) {
                                var SZline = [];
                                for (var i = 0; i < data.length; i++) {
                                    SZline.push({
                                        coords: data[i],
                                        lineStyle: {
                                            normal: {
                                                //color: echarts.color.modifyHSL('#5A94DF', Math.round(i*0.3))
                                                color: 'gold'
                                            }
                                        }
                                    });
                                };

                                option = {
                                    title: {
                                        text: '深圳市停车场信息及停车诱导流图',
                                        subtext: temp,
                                        subtextStyle: {
                                            color: '#fff',
                                            fontSize: 35,
                                        },
                                        x: 'left',
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 35
                                        }
                                    },
                                    series: [{
                                            name: '第一类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 48),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#d95850',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第一类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 48),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#d95850',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第二类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 45),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'orange',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第二类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 45),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'orange',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第三类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 42),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#f2d643',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第三类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 42),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#f2d643',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第四类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 39),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#8dc1a9',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第四类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 39),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#8dc1a9',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第五类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 36),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'aqua',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第五类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 36),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'aqua',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第六类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 33),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'lightskyblue',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第六类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 33),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: 'lightskyblue',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第七类停车场',
                                            type: 'scatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(400, 2000), 30),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#6699ff',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            name: '第七类停车场',
                                            type: 'effectScatter',
                                            coordinateSystem: 'bmap',
                                            data: convertData(data_parking.slice(0, 400), 30),
                                            symbolSize: function(val) {
                                                return val[2] / 10;
                                            },
                                            rippleEffect: {
                                                period: 3,
                                                brushType: 'stroke',
                                                scale: 3
                                            },
                                            hoverAnimation: true,
                                            label: {
                                                normal: {
                                                    formatter: '{b}',
                                                    position: 'right',
                                                    show: false
                                                }
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: '#6699ff',
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
                                            zlevel: 1

                                        },
                                        {
                                            type: 'lines',
                                            coordinateSystem: 'bmap',
                                            polyline: true,
                                            data: SZline,
                                            silent: true,
                                            lineStyle: {
                                                normal: {
                                                    // color: '#c23531',
                                                    // color: 'rgb(200, 35, 45)',
                                                    opacity: 0.02,
                                                    width: 1
                                                }
                                            },
                                            progressiveThreshold: 500,
                                            progressive: 200
                                        },
                                        {
                                            type: 'lines',
                                            coordinateSystem: 'bmap',
                                            polyline: true,
                                            data: SZline,
                                            lineStyle: {
                                                normal: {
                                                    width: 0
                                                }
                                            },
                                            effect: {
                                                constantSpeed: 20,
                                                show: true,
                                                trailLength: 0.1,
                                                symbolSize: 2
                                            },
                                            zlevel: 1
                                        }
                                    ]
                                };
                                myChart.setOption(option);
                                console.log(temp);
                                console.log(i);
                            }
                        });
                        setTimeout(function() {
                            loop(++i);
                        }, 15000);
                    } else {
                        loop(0);
                    }
                }(0);
            }
        })
    }
});

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}