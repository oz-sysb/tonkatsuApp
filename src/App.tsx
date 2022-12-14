import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import ShopModal from './components/ShopModal';
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
import ShopList from './components/ShopList';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

export type Shop = {
  location: Location;
  name: string;
  photo: string;
  rating: number;
};

export type Location = {
  lat: number;
  lng: number;
};

function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [clickedShop, setClickedShop] = useState<Shop>();
  const [radius, setRadius] = useState<number>(2000);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLocation, setCurrentLocation] = useState<Location>();

  const success: PositionCallback = (pos) => {
    console.log('setCurrent========');
    setCurrentLocation({
      ...currentLocation,
      lat: pos.coords.latitude + Math.random() / 10000,
      lng: pos.coords.longitude + Math.random() / 10000,
    });
  };

  const fail: PositionErrorCallback = (error) => {
    window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
    console.log('useEffect========');
  }, []);

  const setTonkatsuLocation = async (
    map: google.maps.Map,
    currentLocation: Location
  ) => {
    console.log('setTonkatsuLocation=======');

    var service = new google.maps.places.PlacesService(map);

    const r = await new Promise<Shop[]>((resolve) => {
      service.nearbySearch(
        {
          keyword: 'とんかつ',
          location: currentLocation,
          radius: radius,
        },
        (results) => {
          const tmp: Shop[] = [];
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
              location: {
                lat: result.geometry!.location!.lat(),
                lng: result.geometry!.location!.lng(),
              },
              name: result.name!,
              photo: resultPhoto,
              rating: result.rating!,
            });
          });
          resolve(tmp);
        }
      );
    });
    setShops(r);
  };

  if (!currentLocation)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Tabs isFitted w="100vw" h="100vh">
      <TabList>
        <Tab>マップ</Tab>
        <Tab>一覧</Tab>
        <div>{radius}</div>
      </TabList>
      <TabPanels>
        <TabPanel p="0" pt="1">
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={17}
            onLoad={(map) => {
              setTimeout(() => {
                setTonkatsuLocation(map, currentLocation);
              });
              console.log('App.tsx呼び出し');
            }}
          >
            {shops.length > 0 &&
              shops.map((i, index) => (
                <MarkerF
                  key={index}
                  position={i.location}
                  label={i.name}
                  onClick={() => {
                    setClickedShop(i);
                    onOpen();
                  }}
                />
              ))}
          </GoogleMap>
          {clickedShop && currentLocation && (
            <ShopModal
              isOpen={isOpen}
              onClose={onClose}
              shop={clickedShop}
              currentLocation={currentLocation}
            />
          )}
        </TabPanel>
        <TabPanel>
          <ShopList
            shops={shops}
            currentLocation={currentLocation}
            setRadius={setRadius}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
