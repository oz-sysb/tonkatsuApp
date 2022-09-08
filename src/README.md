# 概要

勉強会で「とんかつアプリ」を作ります。

# デプロイリンク

https://main--cool-cajeta-dab75f.netlify.app/

# バージョン確認

```sh
$ npm list --depth=0
.
├── @react-google-maps/api@2.12.1
├── @testing-library/jest-dom@5.16.4
├── @testing-library/react@13.3.0
├── @testing-library/user-event@13.5.0
├── @types/jest@27.5.2
├── @types/node@16.11.45
├── @types/react-dom@18.0.6
├── @types/react@18.0.15
├── @typescript-eslint/eslint-plugin@5.31.0
├── @typescript-eslint/parser@5.31.0
├── eslint-config-prettier@8.5.0
├── eslint-plugin-prettier@4.2.1
├── eslint@8.20.0
├── prettier@2.7.1
├── react-dom@18.2.0
├── react-scripts@5.0.1
├── react@18.2.0
├── typescript@4.7.4
└── web-vitals@2.1.4
```

# コマンド

# node のバージョン変更

```sh
$ nodebrew use v16.6.1
```

# サーバ起動

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
