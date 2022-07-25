import { useEffect, useState } from 'react';
import Style from './style.module.css';

const App = () => {
  const [prefCode, setPrefCode] = useState([]);
  const [pop, setPOP] = useState([]);
  const PREF_URI = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  const POP_URI =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11';

  useEffect(() => {
    async function fetchPrefCode() {
      const res = await fetch(PREF_URI, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY ?? '' },
      });
      const jsonObj = await res.json();
      setPrefCode(jsonObj.result.data);
      return res;
    }
    async function fetchPop() {
      const res = await fetch(
        POP_URI,
        // TODO: prefCodeを動的に取得する必要がある
        { headers: { 'x-api-key': process.env.REACT_APP_API_KEY ?? '' } }
      );
      const jsonObj = await res.json();
      setPOP(jsonObj.result.data);
      return res;
    }
    fetchPrefCode();
    fetchPop();
  }, []);

  console.log('prefCode:', prefCode);
  console.log('pop:', pop);

  return (
    <div className={Style.appWrapper}>
      <div>components</div>
    </div>
  );
};

export default App;
