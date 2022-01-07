import numpy as np
import librosa
import os
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from scipy import fftpack
import pickle
import sys

# パラメーター
members = ['miya','isomura','yasui','kawahara','koide']

# 音声ファイルの読み込み
amount = int(sys.stdin.readline())

if amount > 3000:
  voice = 'who/yasui.wav'
elif amount > 2000:
  voice = 'who/koide.wav'
elif amount > 1000:
  voice = 'who/kawahara.wav'
elif amount > 0:
  voice = 'who/miya.wav'
# else:
#   voice = 'who/miya.wav' 

# モデルのロード
with open('who/model.pickle', mode='rb') as f:
  model = pickle.load(f)

# 音声ファイルの変換
data_X = []

def get_features(file):
  a, sr = librosa.load(file)
  y = librosa.feature.mfcc(y=a, sr=sr)
  return y

data_X = get_features(voice)

# ###
# def split(data_X):
#   data_X2 = []
#   X2 = data_X.T
#   data_X2.append(X2)
#   data_X2 = np.concatenate(data_X2)
#   return (data_X2)

# data_Xpre = split(data_X)
# ###

result = model.predict(data_X.T)
predicted = np.argmax(np.bincount(result))


if predicted == 0:
  result = '6ed02198-c085-420a-8e2e-347994bf372a'
elif predicted == 2:
  result = 'ce791ba3-bafb-4907-8490-95f5ed1d7ddc'
elif predicted == 3:
  result = '756d0f5c-b23b-45ec-884d-2a31db83670e'
elif predicted == 4:
  result = 'd2851b02-e66f-4b95-95f5-be128757af41'
else: 
  result = 'not matching'


# node.jsにreturnする
print(result)

# import sys
# data = sys.stdin.readline()
# num = int(data)
# if num == 1000: 
#   print("宮原将太")
# elif num == 2000:
#   print("鈴木清")
