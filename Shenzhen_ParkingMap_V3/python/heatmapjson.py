# -*- coding: utf-8 -*-
"""
Created on Thu May 24 10:10:58 2018

@author: qicdz
"""

import json
import pandas as pd
import random
import re

'''目的地经纬度'''
df = pd.read_excel('test_park_search.xlsx', header=None, usecols = [6])
def find_Destination(info):
    pattern = re.compile(r'.*?"position":"(.*?)","id".*?', re.S)
    position = re.findall(pattern, info)
    temp = [float(i) for i in position[0].split(',')]
    temp.reverse()
    return temp

aim = []
for row in range(len(df)):
    aim.append(find_Destination(df.loc[row].tolist()[0]))
    
a = []
b = []
for i in range(len(aim)):
    dicts = {}
    dicts.setdefault("coord",aim[i])
    dicts.setdefault("elevation",random.randrange(5,320))
    a.append(dicts)
b.append(a)
with open('../data/heatmap/heatmapjson.json', 'w') as f:
    f.write(json.dumps(b))
