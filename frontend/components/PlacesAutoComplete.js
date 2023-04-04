import React, {useState, useEffect} from "react";
import {View, 
  Image, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StatusBar, 
  Pressable, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";
import mapAPIKey from '../mapAPIKey.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const PlacesAutoComplete = ({navigation}) => {

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(name) {
    // if (name.trim().length == 0) {
    //   setAvailableTravelGuides([]);
    //   isEmpty.current = true;
    //   return;
    // }
    // await fetch(`http://${ip.ip}:8000/travelGuide/startsWith?prefix=${name}`, {
    //   credentials: 'include',
    //   method: 'GET',
    // })
    //   .then(res => res.json())
    //   .then(resBody => {
    //     if (resBody.travelGuides.length > 0) {
    //       setAvailableTravelGuides(resBody.travelGuides);
    //     }
    //     if (availableTravelGuides.length > 0) {
    //       isEmpty.current = false;
    //     }
    //   });
  }

  return (
    <View>
      <View style={styles.topView}>
        
      <View style={styles.searchBarView}>
      
          <TextInput
            style={styles.searchBarStyling}
            placeholder="Search Screen search bar"
            placeholderTextColor={'grey'}
            inlineImageLeft='magnify_glass'
            inlineImagePadding={10}
            clearButtonMode ={'always'}
            value={search}
            onChangeText={e => {
              setSearch(e);
              handleSearch(e);
            }}
          />
        </View>
          <TouchableOpacity>
            <Icon name="close" size={24} color="#000" style={{
                marginLeft: '90%',
                marginTop: '5%',
                marginBottom: 'auto',
                position:'absolute',
                zIndex: 1,
              }} />
          </TouchableOpacity>
        <View style={styles.buttonListContainer}>
          <TouchableOpacity activeOpacity={0.6} style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Guides</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.categoryButton}><Text style={styles.categoryButtonText}>Itineraries</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.categoryButton}><Text style={styles.categoryButtonText}>Users</Text></TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

export default PlacesAutoComplete;

const styles = StyleSheet.create({ 
  categoryButtonText:{
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Lexend-SemiBold',
    fontSize: 18,
    textAlign:'center',
  },
  categoryButton:{
    flex:1,
    backgroundColor:'cyan',
    padding:10,

  },
  buttonListContainer:{
    position:'absolute',
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
    position:"absolute",
    backgroundColor:'white',
    height: '36%',
    width: '100%',
  },
  searchBarStyling:{
    width: '95%',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: 'white',
    fontFamily: 'Lexend-Regular',
    padding:8,
  },
  searchBarView:{
    position:'absolute',
    flexDirection: 'row',
    paddingHorizontal: 50,
    marginTop:16,
  },
  textInput: {
    backgroundColor: 'transparent',
    // borderStyle: 'solid',
    // borderWidth: 1,
    marginBottom: 0,
    color: 'black'
  },
})