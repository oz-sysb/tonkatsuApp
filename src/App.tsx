import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
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

const divStyle = {
  background: 'white',
  fontSize: 7.5,
  fontWeight: 'bold',
};

function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [clickedShop, setClickedShop] = useState<Shop>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const infoWindowOptions: google.maps.InfoWindowOptions = {
    pixelOffset: new window.google.maps.Size(0, -40),
    disableAutoPan: true,
  };

  const success: PositionCallback = (pos) => {
    setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };

  const fail: PositionErrorCallback = (error) => {
    window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  const setTonkatsuLocation = async (
    map: google.maps.Map,
    currentLocation: Location
  ) => {
    var service = new google.maps.places.PlacesService(map);

    const r = await new Promise<Shop[]>((resolve) => {
      service.nearbySearch(
        {
          keyword: 'とんかつ',
          location: currentLocation,
          radius: 2000,
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
            }}
          >
            {shops.length > 0 &&
              shops.map((i, index) => (
                <div key={index}>
                  <MarkerF
                    position={i.location}
                    onClick={() => {
                      setClickedShop(i);
                      onOpen();
                    }}
                  />
                  <InfoWindowF
                    position={i.location}
                    options={infoWindowOptions}
                  >
                    <div
                      style={divStyle}
                      onClick={() => {
                        setClickedShop(i);
                        onOpen();
                      }}
                    >
                      <h1>{i.name}</h1>
                    </div>
                  </InfoWindowF>
                </div>
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
          <ShopList shops={shops} currentLocation={currentLocation} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
