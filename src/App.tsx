import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import Modal from './components/Modal';
import { useDisclosure } from '@chakra-ui/react';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

export type Data = {
  lat: number;
  lng: number;
  name: string;
  photo: string;
};

type Location = {
  lat: number;
  lng: number;
};

function App() {
  const [positions, setPositions] = useState<Data[]>([]);
  const [data, setData] = useState<Data>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPosition, setCurrentPosition] = useState<Location>();

  const success: PositionCallback = (pos) => {
    console.log('pos:', pos);
    setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };

  const fail: PositionErrorCallback = (error) => {
    window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
  };

  navigator.geolocation.getCurrentPosition(success, fail);

  const setTonkatsuPositions = async (map: google.maps.Map) => {
    var service = new google.maps.places.PlacesService(map);

    const r = await new Promise<Data[]>((resolve) => {
      service.nearbySearch(
        {
          keyword: 'とんかつ',
          // wework神田
          location: { lat: 35.6936798374726, lng: 139.76345088596605 },
          radius: 300,
        },
        (results) => {
          const tmp: Data[] = [];
          console.log(
            'results',
            results,
            'lat',
            results![0].geometry?.location?.lat(),
            'lng',
            results![0].geometry?.location?.lng()
          );
          results?.forEach((result) => {
            // console.log('reviews:' + result.reviews);
            const resultPhoto =
              result.photos && result.photos.length > 0
                ? result.photos![0].getUrl()
                : '';
            tmp.push({
              lat: result.geometry!.location!.lat(),
              lng: result.geometry!.location!.lng(),
              name: result.name!,
              photo: resultPhoto,
            });
            console.log('photos:' + resultPhoto);
          });
          resolve(tmp);
        }
      );
    });
    setPositions(r);
  };

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={17}
        onLoad={(map) => {
          setTimeout(() => setTonkatsuPositions(map));
        }}
      >
        {positions.length > 0 &&
          positions.map((i, index) => (
            <MarkerF
              key={index}
              position={i}
              label={i.name}
              onClick={() => {
                setData(i);
                onOpen();
              }}
            />
          ))}
      </GoogleMap>
      <Modal isOpen={isOpen} onClose={onClose} data={data} />
    </>
  );
}

export default App;
