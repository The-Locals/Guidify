import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, FlatList, } from 'react-native';
import React from 'react';
import Plus from '../assets/plus.png';
import Upload from '../assets/upload.png';
import Eye from '../assets/eye.png';
import CEye from '../assets/ceye.png';
import Done from '../assets/done.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DocumentPicker from 'react-native-document-picker';

let nextId = 0;

export default function CreateItinerary({navigation, route}) {
      const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
      const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
      const [location, setLocation] = React.useState({
        placeId: '',
        name: '',
        description: '',
        audio: null,
        locationName: '',
      });
      const [eicon, setEicon] = React.useState(Eye);
      const [ region, setRegion ] = React.useState({
        latitude: 53.350140,
        longitude: -6.266155,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
      const [searchText, setSearchText] = React.useState('');
      const [availableTravelGuides, setAvailableTravelGuides] = React.useState([]);

      const handleSearch = (prefix) => {
        console.log('Searching for:', searchText);
        fetch(`http://192.32.43.23:8000/travelGuide/startsWith?prefix=${prefix}`, {
          credentials: 'include',
          method: 'GET'
        }).then(res => res.json())
        .then(resBody => {
          setAvailableTravelGuides(resBody.travelGuides);
        })
        console.log(availableTravelGuides);
      };

  
      const createTravelGuide = () => {
        const formData = new FormData();
        formData.append('placeId', location.placeId);
        formData.append('name', location.name);
        formData.append('description', location.description);
        formData.append('audio[]', location.audio);
  
        fetch('http://192.168.0.94:8000/travelGuide', {
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
              console.log("success");
            } else if (resBody.statusCode == 403) {
              // TODO user entered the wrong credentials. add a UI for this.
              console.log("failed");
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
  
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder='Type Itinerary title here..'
          placeholderTextColor = "#9a73ef" 
          style={styles.input}
          onChange={(e) => {
            setLocation({
              ...location,
              name: e.target.value,
            })
          }}
          value={location.name}
          />
      
      <View style={{ flexDirection: 'row', padding: 10 }}>
      <TextInput
        style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
      


       <TextInput 
          placeholder='Description...'
          placeholderTextColor = "#9a73ef" 
          style={styles.description}
          onChange={(e) => {
            setLocation({
              ...location,
              description: e.target.value
            })
          }}
          value={location.description}
          />
        <TouchableOpacity
            style={styles.buttonItiStyle}
            activeOpacity={0.5}
            onPress={async () => {
              try {
                const result = await DocumentPicker.pick({
                  type: [DocumentPicker.types.allFiles],
                });
                setLocation({
                  ...location,
                  audio: result.readDocument(),
                })
              } catch (error) {
                console.log(error);
              }
            }}
            //onPress={getLocation()}
            >
            <Image
              source={Upload}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>Upload Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonItiStyle}
            activeOpacity={0.5}
            onPress={() => setEicon(CEye)}
            >
            <Image
              source={eicon}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>Public</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignContent: 'center', alignItems:'center'}}>
         <TouchableOpacity
            style={styles.buttonDONEStyle}
            activeOpacity={0.5}
            onPress={() => {
              createTravelGuide();
            }}
            >
            <Image
              source={Done}
              style={styles.buttonImageIconStyle}
            />
        </TouchableOpacity> 
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({ 
  container: {
      flex: 1,
      margin: 0,
      marginTop: 0,
      padding: 30,
      backgroundColor: '#C5FAD5',
    },
    input: {
      margin: 5,
      height: 50,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 'bold',
   },
   description: {
    margin: 5,
      height: 100,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 'bold',
   },
   buttonItiStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5,
      margin: 5,
      marginTop: 10
    },
    buttonImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      tintColor: 'white'
    },
    buttonTextStyle: {
      color: '#fff',
      marginBottom: 4,
      marginLeft: 10,
      fontWeight: 'bold'
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
      fontFamily: 'monospace'
    },
    buttonDONEStyle: {
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5,
      margin: 5,
      marginTop: 30,
      width: 100,
      justifyContent: 'center'
    },
    MainContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
   
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 12
    },
   
    item: {
      padding: 8,
      backgroundColor: '#00C853',
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
   
    itemText: {
      fontSize: 24,
      color: 'white',
      textAlign: 'center'
    }
});