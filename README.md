# 深圳停车场地图前端展示

- 基于[ECharts](https://github.com/ecomfe/echarts)的停车场地图前端展示
- 通过聚类算法对停车场进行分类，同一类型停车场用同种颜色显示（后续会上传停车场分类源码）
- 有历史停车数据的停车场以水波纹特效着重显示
- 从已爬取到的深圳市部分POI经纬度中，随机抽取两个点作为起始与终止点，由百度地图API进行路径规划，爬取返回值（即连续经纬度值）
- 爬取1024条路径规划信息，使用jQuery异步加载至地图上，以线性特效显示

## 打开方式
- 由于jQuery加载的是本地JSON数据，部分浏览器无法正常显示HTML的内容，目前已知使用FireFox可直接打开
- 使用chrome打开HTML时，需从cmd进入chrome安装目录，然后输入“chrome.exe --allow-file-access-from-files”启动chrome，再将HTML拖拽进chrome![](https://github.com/SunGinous/Shenzhen_ParkingMap/blob/master/%E6%89%93%E5%BC%80%E6%96%B9%E5%BC%8F.png)

## 3/24更新
- 引入新的数据集test_park_search.xlsx，real_parking_data.py对数据进行处理，生成101个json数据在data文件夹中
- 在shenzhen_line_map_effect.js中以10s为时间步长循环异步加载data中的101个json数据，同时在页面上显示json数据对应的日期
- 在shenzhen_line_map_effect.js中首先加载地图底板，然后在其上渲染停车流图，这样在循环加载json数据的时候，保证地图不会被重复加载，提升视觉体验

## 3/25更新
- 之前为了使得地图底板和停车流图分别加载互不影响，在代码中添加了两个option，每个option中各有一个series，分别为停车场经纬度数据和停车流图数据，但是这样做会带来一个bug，就是第一个series中的第一各数据无法加载出来。解决方法是整个代码中只能有一个series（但可以有多个option），即将停车场经纬度数据和停车流数据放入同一个series里，由jQuery异步加载。

## 3/27更新
- 添加启动脚本start.bat，将工程保存在任意路径下，运行脚本后，chrome会以全屏方式打开并显示地图内容。不要改变chrome的安装路径（默认安装在C盘下），否则脚本无法运行。
