# -*- coding: utf-8 -*-
"""
Created on Wed Mar 21 15:28:40 2018

@author: sunginous
"""

import pandas as pd
import time
import re
import os

'''每一天的截止时间戳'''
stamp = '%Y年%m月%d日%H:%M:%S'
yue11 = [1509465599]#初始添加2017-10-31 23:59:59的时间戳
date = []
for i in range(1,31):
    t = '2017年11月'+str(i)+'日23:59:59'
    date.append(t[:-8])
    yue11.append(int(time.mktime(time.strptime(t, stamp))))
print(len(yue11))
yue12 = []
for i in range(1,32):
    t = '2017年12月'+str(i)+'日23:59:59'
    date.append(t[:-8])
    yue12.append(int(time.mktime(time.strptime(t, stamp))))
print(len(yue12))
yue1 = []
for i in range(1,32):
    t = '2018年1月'+str(i)+'日23:59:59'
    date.append(t[:-8])
    yue1.append(int(time.mktime(time.strptime(t, stamp))))
print(len(yue1))
yue2 = []
for i in range(1,10):
    t = '2018年2月'+str(i)+'日23:59:59'
    date.append(t[:-8])
    yue2.append(int(time.mktime(time.strptime(t, stamp))))
print(len(yue2))
all_stamp = []
all_stamp = yue11+yue12+yue1+yue2
print('all_stamp:', all_stamp)

'''车辆运行起始时间'''
df = pd.read_excel('test_park_search.xlsx', header=None, usecols = [1])

def to_Time_Stamp(t):
    stamp = '%Y-%m-%d %H:%M:%S'
    return int(time.mktime(time.strptime(t, stamp))) 

stamp_list = []
for i in range(len(df)):
    stamp_list.append(to_Time_Stamp(str(df.loc[i].tolist()[0])))
print(len(stamp_list))

'''经纬度连续值'''
df = pd.read_excel('test_park_search.xlsx', header=None, usecols = [5])
def to_Lng_Lat(ll):
    ll_list = ll.split('|')
    spot_list = []
    for spot in ll_list:
        spot_list.append([float(i) for i in spot.split(',')])
    return spot_list

line = []
for i in range(len(df)):
    line.append(to_Lng_Lat(df.loc[i].tolist()[0]))
print(len(line[0]))

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
print(len(aim))

for i in range(len(line)):
    line[i].append(aim[i])
print(len(line[0]))

allyue = []
for i in range(len(all_stamp)-1):
    day = []
    for j in range(len(stamp_list)):
        if stamp_list[j] > all_stamp[i] and stamp_list[j] < all_stamp[i+1]:
            day.append(line[j])
    allyue.append(day)
print(len(allyue))

print(date)
print(len(date))

file_name = []
if not os.path.exists('data'):
    os.makedirs('data')
for i in range(len(date)):
    with open('data/'+date[i]+'.json', 'w') as f:
        file_name.append('data/'+date[i]+'.json')
        f.write(str(allyue[i]))
print(file_name)
        
num = []
df = pd.read_excel('test_park_search.xlsx', header=None, usecols = [0])
for i in range(len(df)-1):
    if df.loc[i+1].tolist()[0] - df.loc[i].tolist()[0] != 1:
        num.append(i+1)
print('id有误的项:',num)
