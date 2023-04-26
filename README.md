node user.js 
今のexpress起動コマンド



アプリ全体を使用するためのコマンド

Docker アプリの起動

Dockerの起動コマンド(Docker-compose.yml内に処理したい内容を記載)
docker-compose up -d

expressが起動
node app/index.js




terminalで
yarn run dev
出来なかったらターミナルで環境変数設
NODE_OPTIONS=--openssl-legacy-provider
