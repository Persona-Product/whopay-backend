FROM node:14.15.1
# どのimageを素に、環境構築するか

LABEL version="0.0.1"
LABEL description="graphql api for twitter-clone"
LABEL maintainer="persona product"
# このimageの説明


# ENV NODE_ENV=development
# ENV PORT=4000
# ENV DATABASE_URL=postgres://root:password@localhost:5432/twitter_clone
    
# ENV NODE_ENV=production
# 環境変数

WORKDIR /app
# コンテナ内の作業ディレクトリ

COPY package.json yarn.lock ./
# ./で書いても同じ
# COPY package.json yarn.lock ./

RUN yarn
# package.json yarn.lockを素に、ホストの環境と同じパッケージをインストール

COPY . .
# ホストマシンのディレクトリを、コンテナ内の/appへバンドル

EXPOSE 4000
# ポート番号の指定

CMD [ "yarn", "start" ]
# 起動コマンド

# コンテナに入るコマンド
# docker ps で <container id> を取得
# docker exec -it <container id> /bin/bash