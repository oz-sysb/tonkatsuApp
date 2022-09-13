import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import Modal from './components/Modal';
import { useDisclosure } from '@chakra-ui/react';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// wework神田
const center = {
  lat: 35.6936798374726,
  lng: 139.76345088596605,
};

function App() {
  const [positions, setPositions] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setTonkatsuPositions = async (map: google.maps.Map) => {
    var service = new google.maps.places.PlacesService(map);

    const r = await new Promise<{ lat: number; lng: number; name: string }[]>(
      (resolve) => {
        service.nearbySearch(
          {
            keyword: 'とんかつ',
            // wework神田
            location: { lat: 35.6936798374726, lng: 139.76345088596605 },
            radius: 300,
          },
          (results) => {
            const tmp: { lat: number; lng: number; name: string }[] = [];
            console.log(
              'results',
              results,
              'lat',
              results![0].geometry?.location?.lat(),
              'lng',
              results![0].geometry?.location?.lng()
            );
            results?.forEach((result) => {
              console.log('reviews:' + result.reviews);
              // console.log(
              //   'photos:' +
              //     result.photos![0].getUrl()
              // );
              tmp.push({
                lat: result.geometry!.location!.lat(),
                lng: result.geometry!.location!.lng(),
                name: result.name!,
              });
            });
            resolve(tmp);
          }
        );
      }
    );
    setPositions(r);
  };

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={(map) => {
          setTimeout(() => setTonkatsuPositions(map));
        }}
      >
        {positions.length > 0 &&
          positions.map((i, index) => (
            <MarkerF key={index} position={i} label={i.name} onClick={onOpen} />
          ))}
      </GoogleMap>
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
