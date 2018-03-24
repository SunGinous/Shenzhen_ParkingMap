# 深圳停车场地图前端展示

- 基于[ECharts](https://github.com/ecomfe/echarts)的停车场地图前端展示
- 通过聚类算法对停车场进行分类，同一类型停车场用同种颜色显示（后续会上传停车场分类源码）
- 有历史停车数据的停车场以水波纹特效着重显示
- 从已爬取到的深圳市部分POI经纬度中，随机抽取两个点作为起始与终止点，由百度地图API进行路径规划，爬取返回值（即连续经纬度值）
- 爬取1024条路径规划信息，使用jQuery异步加载至地图上，以线性特效显示

## 打开方式
- 由于jQuery加载的是本地JSON数据，部分浏览器无法正常显示HTML的内容，目前已知使用FireFox可直接打开
- 使用chrome打开HTML时，需从cmd进入chrome安装目录，然后输入“chrome.exe --allow-file-access-from-files”启动chrome，再将HTML拖拽进chrome

## 3/24更新
- 引入新的数据集test_park_search.xlsx，real_parking_data.py对数据进行处理，生成101个json数据在data文件夹中
- 在shenzhen_line_map_effect.js中以10s为时间步长循环异步加载data中的101个json数据，同时在页面上显示json数据对应的日期
- 在shenzhen_line_map_effect.js中首先加载地图底板，然后在其上渲染停车流图，这样在循环加载json数据的时候，保证地图不会被重复加载，提升视觉体验
