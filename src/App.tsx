import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
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
import FavoriteShops from './components/FavoriteShops';

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
  const [isFavoriteClicked, setIsFavoriteClicked] = useState<boolean>(false);
  const [favoriteShops, setFavoriteShops] = useState<Shop[]>([]);
  const infoWindowOptions: google.maps.InfoWindowOptions = {
    pixelOffset: new window.google.maps.Size(0, -40),
    disableAutoPan: true,
  };
  // refをtrueで初期化
  const ref = useRef(true);

  const success: PositionCallback = (pos) => {
    setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };

  const fail: PositionErrorCallback = (error) => {
    window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
    const fetchedFavoriteShops: Shop[] = JSON.parse(
      localStorage.getItem('favoriteShops') ?? '[]'
    );
    setFavoriteShops(fetchedFavoriteShops);
    console.log('App.tsxでlocalstorage取得');
  }, []);

  useEffect(() => {
    // 初回レンダリング時はrefをfalseにして、return
    if (ref.current) {
      ref.current = false;
      return;
    }
    localStorage.setItem('favoriteShops', JSON.stringify(favoriteShops));
    console.log('App.tsxのuseEffect: favoriteShops');
  }, [favoriteShops]);

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
        <Tab onClick={() => setIsFavoriteClicked(false)}>マップ</Tab>
        <Tab onClick={() => setIsFavoriteClicked(false)}>一覧</Tab>
        <Tab onClick={() => setIsFavoriteClicked(true)}>お気に入り</Tab>
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
              favoriteShops={favoriteShops}
              setFavoriteShops={setFavoriteShops}
            />
          )}
        </TabPanel>
        <TabPanel>
          <ShopList
            shops={shops}
            currentLocation={currentLocation}
            favoriteShops={favoriteShops}
            setFavoriteShops={setFavoriteShops}
          />
        </TabPanel>
        <TabPanel>
          <p>お気に入りページ</p>
          <FavoriteShops
            currentLocation={currentLocation}
            isFavoriteClicked={isFavoriteClicked}
            favoriteShops={favoriteShops}
            setFavoriteShops={setFavoriteShops}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
