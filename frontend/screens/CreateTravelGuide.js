import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DocumentPicker from 'react-native-document-picker';
import upArrow from '../assets/uparrow.png';
import camera from '../assets/camera.png';
import headphones from '../assets/headphones.png';
import ip from '../ip';
import {mapAPIKey} from '../mapAPIKey.json';

export default function CreateTravelGuide({navigation, route}) {
  const [defaultPhotoUrl, setDefaultPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = React.useState({
    placeId: '',
    name: '',
    description: '',
    audio: null,
    locationName: '',
    uploadedPhoto: null,
  });
  const placeRef = useRef();
  const [region, setRegion] = React.useState({
    latitude: 53.35014,
    longitude: -6.266155,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [uploadAudioButtonText, setUploadAudioButtonText] =
    useState('Upload Audio');
  const [uploadImageButtonText, setUploadImageButtonText] =
    useState('Upload Image');

  const createTravelGuide = async () => {
    if (
      !location.placeId ||
      !location.name ||
      !location.description ||
      !location.audio ||
      !location.locationName
    ) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append('placeId', location.placeId);
    formData.append('name', location.name);
    formData.append('locationName', location.locationName);
    formData.append('description', location.description);
    formData.append('audio', {
      uri: location.audio.uri,
      type: location.audio.type,
      name: location.audio.name,
    });

    if (location.uploadedPhoto) {
      formData.append('image', location.uploadedPhoto);
    } else {
      formData.append('imageUrl', defaultPhotoUrl);
    }

    formData.append(
      'coordinates',
      JSON.stringify({
        lat: region.latitude,
        lng: region.longitude,
      }),
    );

    await fetch(`http://${ip.ip}:8000/travelGuide`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(resBody => {
        if (resBody.statusCode == 200) {
          setIsSubmitting(false);
          console.log('success');
          Alert.alert("Application submitted. The application will now be reviewed by the team.");
          navigation.navigate('User', {origin: 'CreateTravelGuide'});
        } else if (resBody.statusCode == 403) {
          // TODO user entered the wrong credentials. add a UI for this.
          console.log('failed');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageNameHolder}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 20,
            transform: [{rotate: '-90deg'}],
            height: 30,
            width: 30,
          }}
          onPress={() => navigation.navigate('User')}>
          <Image
            source={upArrow}
            style={{tintColor: 'black', width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Lexend-Light',
            fontSize: 20,
            letterSpacing: 1,
            color: 'black',
          }}>
          {'Create Travel Guide'}
        </Text>
      </View>
      <TextInput
        placeholder="Title..."
        placeholderTextColor="black"
        style={styles.input}
        onChangeText={e => {
          setLocation({
            ...location,
            name: e,
          });
        }}
        value={location.name}
      />
      {/* <View
        style={{
          backgroundColor: 'white',
          height: 1,
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      /> */}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <GooglePlacesAutocomplete
          ref={placeRef}
          placeholder="Search For Location"
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
            console.log(data.structured_formatting.main_text);
            placeRef.current.setAddressText('');
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            setLocation({
              ...location,
              locationName: data.structured_formatting.main_text,
              placeId: data.place_id,
            });

            // get the photoref.
            const photoRef = details.photos[0].photo_reference;
            const url =
              'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
              photoRef +
              '&sensor=false&maxheight=500&maxwidth=500&key=' +
              mapAPIKey;
            setDefaultPhotoUrl(url);
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: mapAPIKey,
            language: 'en', // language of the results
            types: 'establishment', // default: 'geocode',
            location: `${region.latitude}, ${region.longitude}`,
            radius: 30000,
          }}
          textInputProps={{
            placeholderTextColor: 'white',
          }}
          styles={{
            description: {
              fontFamily: 'Lexend-Regular',
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
            },
            textInputContainer: {
              color: 'white',
              borderBottomColor: 'white',
            },
            textInput: {
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              borderRadius: 10,
            },
            predefinedPlacesDescription: {
              color: 'white',
            },
            container: {
              flex: 0,
              position: 'relative',
              zIndex: 1,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            },
            listView: {
              backgroundColor: 'black',
            },
            row: {
              backgroundColor: 'black',
            },
            powered: {
              opacity: 0,
            },
            poweredContainer: {
              opacity: 0,
            },
          }}
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
        />
      </View>
      {location.locationName && (
        <TextInput
          style={{
            ...styles.input,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 20,
            width: '80%',
            fontFamily: 'Lexend-Light',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 0,
            textAlign: 'center',
          }}
          value={location.locationName}
          editable={false}
        />
      )}
      <TextInput
        placeholder="Description"
        multiline={true}
        placeholderTextColor="black"
        style={styles.description}
        onChangeText={e => {
          setLocation({
            ...location,
            description: e,
          });
        }}
        value={location.description}
      />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.buttonItiStyle}
          activeOpacity={0.5}
          onPress={async () => {
            try {
              const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
              });
              setUploadAudioButtonText(result[0].name);
              setLocation({
                ...location,
                audio: result[0],
              });
            } catch (error) {
              console.log(error);
            }
          }}
          //onPress={getLocation()}
        >
          <Image source={headphones} style={styles.buttonImageIconStyle} />
          <Text style={styles.buttonTextStyle}>{uploadAudioButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonItiStyle}
          activeOpacity={0.5}
          onPress={async () => {
            try {
              const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
              });
              setUploadImageButtonText(result[0].name);
              setLocation({
                ...location,
                uploadedPhoto: result[0],
              });
            } catch (error) {
              console.log(error);
            }
          }}>
          <Image source={camera} style={styles.buttonImageIconStyle} />
          <Text style={styles.buttonTextStyle}>{uploadImageButtonText}</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              ...styles.buttonDONEStyle,
              backgroundColor: isSubmitting ? 'white' : 'black',
            }}
            activeOpacity={0.5}
            disabled={isSubmitting}
            onPress={() => {
              setIsSubmitting(true);
              createTravelGuide();
            }}>
            {isSubmitting ? (
              <ActivityIndicator color={'black'} size={'large'} />
            ) : (
              <Text
                style={{
                  ...styles.buttonTextStyle,
                  fontSize: 18,
                  fontFamily: 'Lexend-Regular',
                  color: 'white',
                }}>
                SUBMIT
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    marginTop: 0,
    backgroundColor: 'white',
    // position:'absolute'
  },
  pageNameHolder: {
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: 60,
    borderBottomColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 6,
  },
  input: {
    fontSize: 20,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Lexend-Light',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(224, 212, 212)',
  },
  description: {
    height: 100,
    marginTop: 30,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderWidth: 1,
    fontSize: 15,
    textAlignVertical: 'top',
    padding: 10,
    fontFamily: 'Lexend-Light',
    color: 'black',
  },
  buttonItiStyle: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    // height: 60,
    width: '35%',
    borderRadius: 20,
    marginTop: 30,
    display: 'flex',
    // justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonImageIconStyle: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    tintColor: 'black',
  },
  buttonTextStyle: {
    color: 'black',
    fontFamily: 'Lexend-Light',
    textAlign: 'center',
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  buttonHeaderStyle: {
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'monospace',
  },
  buttonDONEStyle: {
    backgroundColor: 'black',
    borderColor: 'white',
    height: 55,
    borderRadius: 20,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    bottom: '230%'
  },
});
