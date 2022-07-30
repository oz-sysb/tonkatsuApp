import Style from './style.module.css';
import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

function App() {
  return (
    <div className={Style.appWrapper}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY ?? ''}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          <MarkerF position={positionAkiba} />
          <MarkerF position={positionIwamotocho} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
