// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/// Import React
import React, { useState } from 'react';
// Import required components
import { Text, Button, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity,  Image, ScrollView, PermissionsAndroid } from 'react-native';// Import Map and Marker
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//import MainContainer from './containers/tabContainer';
//import { NavigationContainer } from '@react-navigation/native';
import { Root, SPSheet } from 'react-native-popup-confirm-toast'
import Submit from '../components/Submit'
import SoundPlayer from 'react-native-sound-player'
import Geolocation from '@react-native-community/geolocation';

// Below is a link to SoundPlayer controls
//https://www.npmjs.com/package/react-native-sound-player#functions

const Map = props =>
{
  const [title, setTitle] = useState('') // used to set the name of location
  const [photo, setPhoto] = useState('') // used to set the photo of location
const component = () =>
  {
    key = 'AIzaSyBdUF2aSzhP3mzuRhFXZwl5lxBTavQnH7M'
    url = 'https://maps.googleapis.com/maps/api/place/photo?photoreference='+photo+'&sensor=false&maxheight=500&maxwidth=500&key='+key
    //hook or class
    return (


    //              setTitle(data.description)
    //              setPhoto(details.photos[0].photo_reference)
        // These have to be relablled for production
    <ScrollView>
    <Text style={styles.title}>{title}</Text>
    <Image style={styles.photo} source={{uri: url,}}></Image>
    <Submit title="Play Sample Audio" color="#3cb043" handleSubmit={fetchAudio}></Submit>
    <Submit title="Get track info (NOT IN PRODUCTION)" color="#0148a4" handleSubmit={fetchAudioInfo}></Submit>
    <Submit title="Pause track ||" color="#d0312d" handleSubmit={stopAudio}></Submit>
    <Submit title="Resume track" color="#3cb043" handleSubmit={resumeAudio}></Submit>
    <Button
            title="Go to Blank Page"
            onPress={() =>  props.navigation.navigate('DetailedInfoCard', {city:title}) }
          />
    <Text></Text>
    </ScrollView>
    );

     place.photos.forEach(function (placePhoto)
     {
       var url = placePhoto.getUrl({
         maxWidth: 600,
         maxHeight: 400
       });
     });
  };

  const resumeAudio = () =>{
    SoundPlayer.play();
  }

  const stopAudio = () =>{
    SoundPlayer.pause();
  }

  const fetchAudioInfo = async () =>{
  try {
              const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
              console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
            } catch (e) {
              console.log('There is no song playing', e)
            }
  }


  const fetchAudio = async () =>{
    try {
      console.log("Trying to play audio");
      // play the file tone.mp3
      SoundPlayer.playSoundFile('dkit', 'mp3');
      console.log("Playing");
//       or play from url
//      SoundPlayer.playUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
      try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
          } catch (e) {
            console.log('There is no song playing', e)
          }
  } catch (e) {
      console.log(`cannot play the sound file`, e);
  }
  }

  // users current geo location
  let currentLatidude;
  let currentLongitude;
  let locationAccuracy;

  // options for Geolocation postion retrieval
  const options = {
    timeout: 2000,
  };

  // The region used to center the map and marker
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Get current user location
  function getUserLocation() {
    Geolocation.getCurrentPosition(
      onSuccess,
      error => console.log("ERROR", error),
      options
    );
  }
  function onSuccess(position) {

    const coordinates = position.coords;
    currentLatidude = coordinates.latitude;
    currentLongitude = coordinates.longitude;
    locationAccuracy = coordinates.accuracy;

  }

  getUserLocation()


  
  const markerClick = (e) =>
  {

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <MapView

          region={region}
          //onRegionChangeComplete={onRegionChange}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Test Marker'}
            description={'This is a description of the marker'}
            // modal open on this
            onPress={() => { }}
          />

        </MapView>

        <Root>
          <View>
            <TouchableOpacity

            >
            </TouchableOpacity>
          </View>
        </Root>

        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // acquire basic info
              setTitle(data.description)
              setPhoto(details.photos[0].photo_reference)

              // display a little component with the title and photo
              const spSheet = SPSheet;
              spSheet.show({
                component: () => component({ ...this.props, spSheet }),
                onCloseComplete: () =>
                {
                  console.log('onCloseComplete');
                },
                onOpenComplete: () =>
                {
                  console.log('onOpenComplete');
                },
                height: 400
                })

              // get the data from fetch
              locationData = {
                place_id: details.place_id,
                address: details.formatted_address,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                photos: details.photos
              };

              // Get picture URL's
              let picURLs = [];
              for (let key in locationData.photos) {

                let googleURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth="
                let height = locationData.photos[key]["height"];
                let width = locationData.photos[key]["width"];
                let photo_reference = locationData.photos[key]["photo_reference"];
                let API_KEY = "AIzaSyBdUF2aSzhP3mzuRhFXZwl5lxBTavQnH7M"
                googleURL += width + "&maxheight=" + height + "&photo_reference=" + photo_reference + "&key=" + API_KEY;

                picURLs.push(googleURL + "\n");
              };

              // set the map to the searched region
              setRegion({
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                
              });

            }}
            query={{
              key: 'AIzaSyBdUF2aSzhP3mzuRhFXZwl5lxBTavQnH7M',
              language: 'en',
            }}
          />
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Map;

const styles = StyleSheet.create({
  
  title: {
    color: '#0779e4',
        fontWeight: 'bold',
        marginLeft: 5
  },

  photo: {
    width: 100,
    height: 100,
  },

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
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 8,
    top: StatusBar.currentHeight,
  },
  input: {
    borderBottomColor: '#888',
    borderWidth: 1,
  },
});



const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];
