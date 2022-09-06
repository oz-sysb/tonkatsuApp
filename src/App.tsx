import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px',
};

// wework神田
const center = {
  lat: 35.6936798374726,
  lng: 139.76345088596605,
};

function App() {
  const [positions, setPositions] = useState<any[]>([]);

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
        // wework神田
        location: { lat: 35.6936798374726, lng: 139.76345088596605 },
        radius: 300,
      },
      async function (results) {
        const tmp: any = [];
        console.log(
          'results',
          results,
          'lat',
          results![0].geometry?.location?.lat(),
          'lng',
          results![0].geometry?.location?.lng()
        );
        results?.forEach((result) => {
          tmp.push({
            lat: result.geometry?.location?.lat(),
            lng: result.geometry?.location?.lng(),
          });
        });
        console.log('a', tmp);
        console.log('positions', positions);
        await setPositions(tmp);
      }
    );
  }, []);

  return (
    <>
      <div>
        a
        {positions.map((i, index) => (
          <div key={index}>{i.lng as number}</div>
        ))}
      </div>
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      >
        {positions.map((i, index) => (
          <MarkerF key={index} position={i} />
        ))}
      </GoogleMap>
    </>
  );
}

export default App;
