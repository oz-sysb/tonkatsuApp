## 題材

[ゆめみ\_フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)

## node のバージョン変更

nodebrew use v16.6.1

## コマンド

- サーバ起動

```xh
$ npm start
```

## バージョン

```sh
$ npm list --depth=0

study-202207@0.1.0 /Users/ozv-y-amano/Study/study-202207
├── @testing-library/jest-dom@5.16.4
├── @testing-library/react@13.3.0
├── @testing-library/user-event@13.5.0
├── react-dom@18.2.0
├── react-scripts@5.0.1
├── react@18.2.0
└── web-vitals@2.1.4
```

## TODO

- [x] リンターには ESLint、フォーマッターには Prettier を使用
- [ ] 都道府県一覧および総人口情報は RESAS API のデータを用いる
- [ ] グラフは Highcharts や Rechart.js などのサードパーティ製のグラフライブラリを用いて描画する
- [x] TS 化
- [ ] テストコード作成
- [ ] テスト実行時にエラーが発生しないこと
- [ ] Netlify / GitHub Pages / Firebase hosting / Vercel 等のホスティングサービスにデプロイし、インターネット経由で閲覧できる状態

## ドキュメント

- [設計シート](https://docs.google.com/presentation/d/1L7G6mAem2n28NKI-DmeKTY6UfkOoa2gkzUTR_SxhWaE/edit#slide=id.p)

## API 取得

```sh
curl -H "X-API-KEY:<APIキー>" "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11" | jq
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
