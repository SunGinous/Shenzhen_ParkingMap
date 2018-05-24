var dom1 = document.getElementById("table1");
var myChart1 = echarts.init(dom1);
var app = {};
option = null;
app.title = '热力图与百度地图扩展';

$.ajax({
    url: '../data/heatmap/heatmapjson.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {

        var points = [].concat.apply([], data.map(function(track) {
            return track.map(function(seg) {
                return seg.coord.concat([1]);
            });
        }));
        myChart1.setOption(option = {
			title: {
                text: '停车区域热力图',
		        textStyle: {
                    fontSize: 20,
					color: '#fff'
                }
            },
            animation: false,
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
                                'color': '#333333'
                            }
                        },
                        {
                            'featureType': 'building', //调整建筑物颜色
                            'elementType': 'geometry',
                            'stylers': {
                                //'color': '#2c343c'
                                'color': '#333333'
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
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 1.5,
                blurSize: 7
            }]
        });
        /*if (!app.inNode) {
            // 添加百度地图插件
            var bmap = myChart.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }*/
    }
});;
if (option && typeof option === "object") {
    myChart1.setOption(option, true);
}