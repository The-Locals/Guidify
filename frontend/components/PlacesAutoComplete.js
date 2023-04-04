import React, {useState, useEffect} from "react";
import {View, Image, Text, FlatList, ActivityIndicator, StatusBar, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";
import mapAPIKey from '../mapAPIKey.json'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


const PlacesAutoComplete = ({navigation}) => {

  const [ pin, setPin ] = React.useState({
		latitude: 53.40140,
    longitude: -6.226155,
	})
	const [ region, setRegion ] = React.useState({
		latitude: 53.350140,
    longitude: -6.266155,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('dublin');

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image style={styles.itemImageStyle} source={{ uri: item.picture.large }} />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.txtEmailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  return (
    <View>
    <View style={styles.topView}>
      
    <GooglePlacesAutocomplete
      disabled={true}
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance"
      }}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
        setTitle(details.name);
        navigation.navigate('CTravelGuide', {paramKey: title})
      }}
      
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: mapAPIKey,
        language: 'en', // language of the results
        types: "establishment", // default: 'geocode',
        location: `${region.latitude}, ${region.longitude}`,
        radius: 30000
      }}
      
      styles={{
        textInputContainer: {
          width: '98%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        container: { 
          flex: 0, 
          position: "absolute",
          width: "98%", 
          zIndex: 1, 
          marginTop: 15, 
          alignItems: "center",
          justifyContent: "center",
        },
				listView: { 
          backgroundColor: "white" 
        }
      }}
      
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      keyboardShouldPersistTaps="handled"
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      renderRightButton={() => <Text></Text>}
    />
    
      <View style={styles.buttonListContainer}>
        <TouchableOpacity 
        style={styles.categoryButton}>
          <Text 
          style={styles.categoryButtonText}>
          Hello
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Hello</Text></TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Hello</Text></TouchableOpacity>
      </View>

    </View>
    </View>
  );
}

export default PlacesAutoComplete;

const styles = StyleSheet.create({ 
  categoryButtonText:{
    fontSize:18,
    textAlign:'center',
    fontFamily: 'Lexend-SemiBold',
  },
  categoryButton:{
    flex:1,
    backgroundColor:'cyan',
  },
  buttonListContainer:{
    backgroundColor:'white',
    width: '100%',
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent:'space-evenly',
    flexWrap:'wrap',
    borderStyle: 'solid',
    borderColor:'white',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  topView:{
    backgroundColor:'gray',
    height: '36%',
    width: '100%',
    flexDirection: 'column',
    zIndex: 1000,
  },
})