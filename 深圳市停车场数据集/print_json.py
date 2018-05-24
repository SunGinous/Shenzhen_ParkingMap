# -*- coding: utf-8 -*-
"""
Created on Sun Mar 27 14:50:19 2018

@author: sunginous
"""

import pandas as pd
import json

df = pd.read_excel('park_no_repeat.xlsx',usecols=[1,2,3,5], header=None)

'''生成{name:停车场名, value:number}格式json数据'''
h=0
spot = []
for i in range(len(df)):
    attr = {}
    temp = df.loc[i].tolist()[3]
    if temp == 0.0 or temp == 1.0 or temp == 2.0 or temp == 3.0 or temp == 4.0 or temp == 5.0 or temp == 6.0:
        attr.setdefault("name", df.loc[i].tolist()[0])
        attr.setdefault("value", (int(df.loc[i].tolist()[3])+10)*3)
    else:
        attr.setdefault("name", df.loc[i].tolist()[0])
        attr.setdefault("value", 20)

    spot.append(attr)
    h+=1

print(h,len(spot))
print(spot)
with open('../Shenzhen_ParkingMap_V3/data/name_value.json', 'w') as f:
    f.write(json.dumps(spot))

'''生成name:[lng, lat]格式json数据'''
h=0
lng_lat = {}
for i in range(len(df)):
    lng_lat.setdefault(df.loc[i].tolist()[0], [round(df.loc[i].tolist()[2],6), round(df.loc[i].tolist()[1],6)])
    h+=1

print(h,len(lng_lat))
print(lng_lat)
with open('../Shenzhen_ParkingMap_V3/data/parkinglots/lng_lat.json', 'w') as f:
    f.write(json.dumps(lng_lat))
