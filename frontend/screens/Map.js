import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Pressable,
  FlatList,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  LogBox,
} from 'react-native'; // Import Map and Marker
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {FloatingAction} from 'react-native-floating-action';
import Modal from 'react-native-modal';
import PlayIcon from '../assets/play.png';
import PauseIcon from '../assets/pause.png';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player'

const Map = () => {
  Geolocation.requestAuthorization();
  const [region, setRegion] = React.useState({
    latitude: 53.9854,
    longitude: -6.3945,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [touristLocations, setTouristLocations] = useState([]);

  const [showMarker, setShowMarker] = React.useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const placeRef = useRef(null);
  const [photo, setPhoto] = useState(
    'ARywPAI4CheuR7nthP4lUNuQw09LqBIfNHSNdfgmBuUA7SdwUjkkiWwEJGcbueamM-zxmpJ7HC8yvx-w3GUczlThnPkC6-llma_MPNGPQbGo1R0SGGaUIUUiruARLrwesAJYrbxiADZib5tT1o-k_JvNdQyx91hxav_VDmaaNfshPjvQygi7',
  );
  key = 'AIzaSyCsdtGfQpfZc7tbypPioacMv2y7eMoaW6g';
  const url =
    'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
    photo +
    '&sensor=false&maxheight=500&maxwidth=500&key=' +
    key;
  const [description, setDescription] = useState(
    'OConnell Bridge, North City, Dublin 1, Ireland',
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([null, false]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [MPtitle, setMPtitle] = useState('Default Name');
  const [MPdesc, setMPdes] = useState('Default Artist');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const playOrPause = async () => {
    console.log("playor pause")
    playAudio();
    setMPlayerdetails();
  };

  const playAudio = () => {
    setIsPlaying(!isPlaying);
    console.log("isplaying: ",isPlaying)
    if(isPlaying)
    {
      SoundPlayer.stop();
    }
    else{
      fetchAudio();
    }
  }

  const setMPlayerdetails = item => {
    setMPtitle(item.name);
    setMPdes(item.description);
    console.log('MPtitle: ' + MPtitle + 'MPdesc: ' + MPdesc);
  };

  const actions = [
    {
      text: 'Current Location',
      name: 'Geolocation',
      icon: require('../assets/gps.png'),
      position: 1,
    },
  ];

  const getCurrentPosition = async () => {
    //await requestLocationPermission()
    Geolocation.getCurrentPosition(
      pos => {
        console.log('curr: ' + JSON.stringify(pos));
        console.log('curr lng: ' + JSON.stringify(pos.coords.longitude));
        setRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  

  // get the usernames of the creators of the given travel guides.
  const getUsernames = async (travelGuides) => {
    const promises = [];
    for (let i = 0; i < travelGuides.length; i++) {
      let res = await axios.get(`http://192.168.126.219:8000/user/username?id=${travelGuides[i].creatorId}`);
      let username = await res.data.username;
      promises.push(username);
    }
    const usernames = await Promise.all(promises);
    return usernames;
  }

  const fetchAudio = async () =>
  {
    try
    {
      console.log("Trying to play audio");
      // play the file tone.mp3
      SoundPlayer.playSoundFile('sound', 'mp3');
      console.log("Playing");
      //       or play from url
          //  SoundPlayer.playUrl('https://storage.googleapis.com/guidify_bucket/12345.mpeg')
      try
      {
        const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
        console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
      } catch (e)
      {
        console.log('There is no song playing', e)
      }
    } catch (e)
    {
      console.log(`cannot play the sound file`, e);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapperStyle}>
        {/* <Image
          style={styles.itemImageStyle}
          source={{uri: item.picture.large}}
        /> */}
        <View style={styles.contentWrapperStyle}>
          <Text
            style={
              styles.txtNameStyle
            }>{`${item.name}`}</Text>
          <Text style={styles.txtEmailStyle}>{item.username}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable onPress={() => togglePlayAudio(item._id)}>
            <Image
              source={(currentlyPlaying[0] == item._id && currentlyPlaying[1]) ? PauseIcon : PlayIcon}
              style={{
                height: 30,
                tintColor: '#000',
                width: 30,
                marginRight: 10,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  const playAudiohaha = async(id) => {
    console.log("_id: ",id)
    setIsPlaying(!isPlaying);
    SoundPlayer.stop();
    // get travel guide with the id
    let audioUrl = "";
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id == id) {
        audioUrl = users[i].audioUrl;
        console.log("AUdio url: ", audioUrl)
        SoundPlayer.playUrl(audioUrl);
      }
    }
  }

  async function togglePlayAudio(id) {
    if (currentlyPlaying[0] == null || currentlyPlaying[0] != id) {
      await SoundPlayer.stop();
      setCurrentlyPlaying([id, true]);
      let audioUrl = "";
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id == id) {
          audioUrl = users[i].audioUrl;
          console.log("AUdio url: ", audioUrl)
          break;
        }
      }
      await SoundPlayer.loadUrl(audioUrl);
      await SoundPlayer.play();
    } else if (currentlyPlaying[1]) {
      setCurrentlyPlaying([id, false])
      await SoundPlayer.pause();
    } else {
      setCurrentlyPlaying([id, true]);
      await SoundPlayer.resume();
    }
  }

  const stopAndResume = () =>{
    setIsPlaying(!isPlaying);
    if(isPlaying)
    {
      console.log("Resume");
      SoundPlayer.play();
    }
    else{
      console.log("pause");
      SoundPlayer.pause();
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const [placeId, setPlaceId] = useState("");
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    // getUsers();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Encountered two children with the same key']);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=5000&type=tourist_attraction&key=AIzaSyCsdtGfQpfZc7tbypPioacMv2y7eMoaW6g`
      )
      .then(response => {
        setTouristLocations(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });

  }, [currentPage]);


  return (
    <View style={{marginTop: 0, flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <GooglePlacesAutocomplete
          ref={placeRef}
          placeholder="Find a place or an Itinerary"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            //console.log(data, details);
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setShowMarker(true);
            // console.log(
            //   'photo reference: ' + details.photos[0].photo_reference,
            // );
            setPhoto(details.photos[0].photo_reference);
            setDescription(data.description);
          }}
          //getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCsdtGfQpfZc7tbypPioacMv2y7eMoaW6g',
            language: 'en', // language of the results
            types: 'tourist_attraction', // default: 'geocode',
            location: `${region.latitude}, ${region.longitude}`,
            radius: 30000,
          }}
          styles={{
            textInputContainer: {
              width: '98%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            container: {
              flex: 0,
              position: 'absolute',
              width: '98%',
              zIndex: 1,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            },
            listView: {
              backgroundColor: 'white',
              width: '98%',
            },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          keyboardShouldPersistTaps="handled"
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
          renderRightButton={() => <Text></Text>}
        />
      </View>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 53.9854,
          longitude: -6.3945,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        provider="google"
        customMapStyle={mapStyle}
        region={region}
        onPoiClick={async e => {
          let placeIds = "";
          let res = await axios .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${e.nativeEvent.placeId}&key=AIzaSyCsdtGfQpfZc7tbypPioacMv2y7eMoaW6g`,
          );
            let data = res.data.result;
            console.log("Before place ids setting: ", placeIds)
            placeIds = res.data.result.place_id;
            setShowMarker(true);
            setPhoto(data.photos[0].photo_reference);
            setDescription(data.name);
            setRegion({
              latitude: data.geometry.location.lat,
              longitude: data.geometry.location.lng,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
            console.log("After setPlaceID: ",placeIds)
            setIsLoading(false);
            res = await axios.get(`http://192.168.126.219:8000/travelGuide/byLocation?placeId=${placeIds}`)
            let travelGuides = res.data.travelGuides;
            let usernames = await getUsernames(travelGuides);
            let travelGuidesWithUsernames = [];
            for (let i = 0; i < travelGuides.length; i++) {
              travelGuidesWithUsernames.push({
                ...travelGuides[i],
                username: usernames[i],
              });
            }
            setUsers(travelGuidesWithUsernames);
        }}>
        {/* {showMarker && (
          <Marker
            draggable={true}
            coordinate={
              {
                latitude: region.latitude,
                longitude: region.longitude,
              }
              //markers
            }
            onPress={toggleModal}>
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
        )}
        <Circle center={region} radius={1000} /> */}
        {touristLocations.map(location => (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            //title={location.name}
            //key={location.id}
            onPress={toggleModal}
            draggable={true}
          >
            <Callout>
              <Text>I'm here</Text>
            </Callout>
            </Marker>
        ))}
      </MapView>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          console.log('curr: ' + getCurrentPosition());
        }}
        color="orange"
        position="right"
        distanceToEdge={{horizontal: 20, vertical: 40}}
      />
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
        propagateSwipe>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />

            <Text
              style={{
                fontWeight: '400',
                color: '#000',
                fontSize: 15,
                marginTop: 5,
              }}>
              {description}
            </Text>
            <Image
              source={{uri: url}}
              style={{
                height: 100,
                width: 370,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <View style={{width: 150}}>
                <Button title="Travel guides" color="#000" />
              </View>
              <View style={{marginLeft: 70, width: 150}}>
                <Button title="Itineraries" color="#000" />
              </View>
            </View>
          </View>
          <StatusBar backgroundColor="#000" />
          <View style={{height: 250}}>
            <ScrollView style={{height: 0, marginTop: 10}}>
              <FlatList
                data={users}
                keyExtractor={item => item.data}
                renderItem={renderItem}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={2}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{flexGrow: 1}}
              />
            </ScrollView>
          </View>
          {/* <Pressable>
            <View style={[styles.widgetContainer, {}]}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: 'https://www.bensound.com/bensound-img/happyrock.jpg',
                  }}
                  style={styles.widgetImageStyle}
                />
                <View>
                  <Text style={styles.widgetMusicTitle}>{MPtitle}</Text>
                  <Text style={styles.widgetArtisteTitle}>{MPdesc}</Text>
                </View>
              </View>
              <Pressable onPress={() => playOrPause()}>
                <Image
                  source={isPlaying ? PauseIcon : PlayIcon}
                  style={{
                    height: 30,
                    tintColor: '#fff',
                    width: 30,
                    marginRight: 10,
                  }}
                />
              </Pressable>
            </View>
          </Pressable> */}
        </View>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'black',
    padding: 0,
    borderRadius: 8,
    top: StatusBar.currentHeight,
  },
  input: {
    borderBottomColor: '#888',
    borderWidth: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#C5FAD5',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
  },
  text: {
    color: '#bbb',
    fontSize: 20,
    marginTop: 100,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#000',
    marginTop: 0,
    borderRadius: 10,
  },
  widgetMusicTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 10,
    marginBottom: 1,
  },
  widgetArtisteTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 10,
    marginBottom: 12,
    marginTop: 1,
  },
  widgetImageStyle: {
    width: 55,
    height: 50,
    marginTop: 9,
    marginLeft: 5,
    borderRadius: 10,
  },
  musicTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 1,
    marginHorizontal: 20,
    marginBottom: 1,
  },
  artisteTitle: {
    fontSize: 16,
    color: '#000',
    opacity: 0.8,
    marginHorizontal: 20,
    marginBottom: 1,
    marginTop: 1,
  },
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
