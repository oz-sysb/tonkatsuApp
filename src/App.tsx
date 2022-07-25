import { useEffect, useState } from 'react';
import Style from './style.module.css';

const App = () => {
  const [data, setData] = useState([]);
  const URI =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=11';

  useEffect(() => {
    if (process.env.REACT_APP_API_KEY === undefined) return;
    async function fetchData() {
      const res = await fetch(
        URI,
        // TODO: prefCodeを動的に取得する必要がある
        { headers: { 'x-api-key': process.env.REACT_APP_API_KEY ?? '' } }
      );
      const jsonObj = await res.json();
      setData(jsonObj.result.data);
      return res;
    }
    fetchData();
  }, []);

  console.log('data:', data);

  return (
    <div className={Style.appWrapper}>
      <div>components</div>
    </div>
  );
};

export default App;
