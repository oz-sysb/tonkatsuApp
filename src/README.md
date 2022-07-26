# 概要

勉強会で「とんかつアプリ」を作ります。

# コマンド

## node のバージョン変更

```sh
$ nodebrew use v16.6.1
```

## サーバ起動

```sh
$ npm start
```

## ドキュメント

- [設計シート](https://docs.google.com/presentation/d/1SACRbS3usxWGdJpoAvLG1ynb9jU000Od0tj7tOeLsuI/edit?usp=sharing)

## API 取得

```sh
curl -H "X-API-KEY:<APIキー>" "xxxxxxxxxxxxxxxxxxxxxxxxx" | jq
```

## .vscode/settings.json の設定

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## 参考にした記事

- [RESAS API を叩いてみる](https://qiita.com/vankobe/items/96877f27887e83b2ceb1)
- [React で環境変数を読み込む【開発・本番で切り替え可能】](https://ralacode.com/blog/post/use-env-variables-in-react/)
- [npm install / yarn add でパッケージをインストールする](https://qiita.com/rearail/items/859a717990b39779bb6c)
- [【入門】create-react-app で React と TypeScript 環境を構築](https://mo-gu-mo-gu.com/create-react-app-typescript/)
- [2021-04-06VSCode 保存時に Prettier の自動フォーマットが効かなくなった件](https://chaika.hatenablog.com/entry/2021/04/06/101500)
- [[React + Google Maps API] @react-google-maps/api を使った地図アプリをローカルで起動してみた](https://dev.classmethod.jp/articles/launching-a-map-app-using-react-google-maps-api-locally/)
