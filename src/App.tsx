import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px',
};

// wework神田
const center = {
  lat: 35.6936798374726,
  lng: 139.76345088596605,
};

const positionAkiba = {
  lat: 35.6936798374727,
  lng: 139.78345088596608,
};

const positionIwamotocho = {
  lat: 35.6936798374728,
  lng: 139.79345088596608,
};

function App() {
  useEffect(() => {
    var tokyo = new google.maps.LatLng(35.6936798374726, 139.76345088596605);

    let map = new google.maps.Map(document.getElementById('map')!, {
      center: tokyo,
      zoom: 15,
    });
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        keyword: 'とんかつ',
        location: { lat: 35.6936798374726, lng: 139.76345088596605 },
        radius: 300,
      },
      function (results) {
        console.log(results);
      }
    );
  }, []);

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
    >
      <MarkerF position={positionAkiba} />
      <MarkerF position={positionIwamotocho} />
    </GoogleMap>
  );
}

export default App;
