import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import {
  useDisclosure,
  Spinner,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

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

export type Location = {
  lat: number;
  lng: number;
};

function App() {
  const [positions, setPositions] = useState<Data[]>([]);
  const [data, setData] = useState<Data>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPosition, setCurrentPosition] = useState<Location>();

  const success: PositionCallback = (pos) => {
    setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };

  const fail: PositionErrorCallback = (error) => {
    window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  const setTonkatsuPositions = async (
    map: google.maps.Map,
    currentPos: Location
  ) => {
    var service = new google.maps.places.PlacesService(map);

    const r = await new Promise<Data[]>((resolve) => {
      service.nearbySearch(
        {
          keyword: 'とんかつ',
          location: currentPos,
          radius: 2000,
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
          });
          resolve(tmp);
        }
      );
    });
    setPositions(r);
  };

  if (!currentPosition)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>マップ</Tab>
        <Tab>一覧</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={17}
            onLoad={(map) => {
              setTimeout(() => {
                setTonkatsuPositions(map, currentPosition);
              });
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
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            currentPosition={currentPosition}
          />
        </TabPanel>
        <TabPanel>一覧ページ</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
