## nodeのバージョン変更
nodebrew use v16.6.1

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

- [ ] リンターにはESLint、フォーマッターにはPrettierを使用
- [ ] 都道府県一覧および総人口情報はRESAS APIのデータを用いる
- [ ] グラフは Highcharts や Rechart.js などのサードパーティ製のグラフライブラリを用いて描画する
- [ ] TS化
- [ ] テストコード作成
- [ ] テスト実行時にエラーが発生しないこと
- [ ] Netlify / GitHub Pages / Firebase hosting / Vercel 等のホスティングサービスにデプロイし、インターネット経由で閲覧できる状態

## ドキュメント

- [設計シート](https://docs.google.com/presentation/d/1L7G6mAem2n28NKI-DmeKTY6UfkOoa2gkzUTR_SxhWaE/edit#slide=id.p)

## API取得

```
curl -H "X-API-KEY:<APIキー>" "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11" | jq
```

## 参考にした記事

- [Reactの環境構築](https://zenn.dev/web_tips/articles/abad1a544f3643)
- [RESAS APIを叩いてみる](https://qiita.com/vankobe/items/96877f27887e83b2ceb1)
- [Reactで環境変数を読み込む【開発・本番で切り替え可能】](https://ralacode.com/blog/post/use-env-variables-in-react/)
