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

if amount == 500:
  voice = 'who/miya.wav'
elif amount > 20000:
  voice = 'who/koide.wav'
elif amount > 10000:
  voice = 'who/kawahara.wav'
elif amount > 500:
  voice = 'who/yasui.wav'
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
  result = '5e76967c-dad8-4ea1-894a-5b83579e1b31'
elif predicted == 2:
  result = '65392b7c-f858-482f-856b-6520b2685703'
elif predicted == 3:
  result = '75a67cd0-342b-4b6b-afc6-7915794fd1c8'
elif predicted == 4:
  result = '0b920007-8ab1-469b-bdae-a0c746284627'
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
