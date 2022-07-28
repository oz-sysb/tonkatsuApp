import Style from './style.module.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

// WeWorkの位置
const center = {
  lat: 35.69448196389804,
  lng: 139.75466017218457,
};

function App() {
  return (
    <div className={Style.appWrapper}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY ?? ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
