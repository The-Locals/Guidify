import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Touchable, FlatList } from 'react-native';
import Searchbar from '../components/home/Searchbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Geolocation from '@react-native-community/geolocation';
import ip from '../ip';
import TravelGuide from '../components/TravelGuide';
import Itinerary from '../components/Itinerary';
import SoundPlayer from 'react-native-sound-player';
import Slider from "react-native-a11y-slider";
import { Button } from "@react-native-material/core";

export default function Search({ navigation }) {
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, []);
  const PAGE_TYPE = {
    GUIDES: 'guides',
    ITINERARIES: 'itineraries',
  };
  const [currentPage, setCurrentPage] = useState(PAGE_TYPE.GUIDES);
  const [loading, setIsLoading] = useState(false);
  const [travelGuides, setTravelGuides] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [currentPlayingTG, setCurrentPlayingTG] = useState(null);

  useEffect(() => {
    setCurrentPlayingTG(null);
  }, [currentPage]);

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', () => {
      setCurrentPlayingTG(null);
    });
  }, []);

  // in km unit.
  const [radius, setRadius] = useState(1);

  // get travel guides and itineraries based on radius.
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        // get min and max lat and lng values based on radius
        let radiusInDegree = radius / 111.32;
        const minLat = latitude - radiusInDegree;
        const maxLat = latitude + radiusInDegree;
        const minLng = longitude - radiusInDegree;
        const maxLng = longitude + radiusInDegree;

        // get travel guides and itineraries within radius
        fetch(
          `http://${ip.ip}:8000/travelGuide/byCoordinatesNonLocationOriented?maxLat=${maxLat
          }&maxLng=${maxLng}&minLat=${minLat
          }&minLng=${minLng}`,
          {
            credentials: 'include',
            method: 'GET',
          },
        )
          .then(res => res.json())
          .then(res => res.data)
          .then(data => {
            setItineraries(data.itineraries);
            setTravelGuides(data.travelGuides);
          })
          .catch(err => console.log(err));
      },
      err => Alert.alert("Unable to get user's current position"),
      {
        enableHighAccuracy: true,
      },
    );
  }, [radius]);

  //////////////////////// For FlatList ///////////////////////////////////////
  const PRIMARY_SECTIONS = [
    {
      id: 'topSections',
      type: 'topSections'
    },
  ];
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    let candidateList = [...PRIMARY_SECTIONS];
    if (currentPage == PAGE_TYPE.GUIDES) {
      travelGuides.forEach(travelGuide => {
        candidateList.push({
          id: travelGuide._id,
          type: 'travelGuide',
          travelGuide: travelGuide
        });
      });
    } else {
      itineraries.forEach(itinerary => {
        candidateList.push({
          id: itinerary._id,
          type: 'itinerary',
          itinerary: itinerary
        })
      })
    }
    setContentList(candidateList);
  }, [
    currentPage,
    travelGuides,
    itineraries
  ]);

  const renderItem = ({ item }) => {
    if (item.type == "topSections") {
      return <View>
        <View style={styles.topView}>
          <View
            style={{
              width: '85%',
              flex: 1,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              padding: 0,
              position: 'relative',
            }}>
            <Searchbar
              type="searchPage"
            />
          </View>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={{
                flex: 4,
                borderStyle: 'solid',
                borderColor: 'white',
                borderBottomColor:
                  currentPage == PAGE_TYPE.GUIDES ? 'black' : 'white',
                borderWidth: 2,
              }}
              onPress={() => {
                setCurrentPage(PAGE_TYPE.GUIDES);
                setIsLoading(true);
              }}
              activeOpacity={0.6}>
              <Text
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontFamily: 'Lexend-SemiBold',
                  fontSize: 18,
                  color:
                    currentPage == PAGE_TYPE.GUIDES ? 'black' : '#878686',
                }}>
                Guides
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 4,
                borderStyle: 'solid',
                borderColor: 'white',
                borderBottomColor:
                  currentPage == PAGE_TYPE.ITINERARIES ? 'black' : 'white',
                borderWidth: 2,
              }}
              activeOpacity={0.6}
              onPress={() => {
                setCurrentPage(PAGE_TYPE.ITINERARIES);
                setIsLoading(true);
              }}>
              <Text
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  fontFamily: 'Lexend-SemiBold',
                  fontSize: 18,
                  color:
                    currentPage == PAGE_TYPE.ITINERARIES
                      ? 'black'
                      : '#878686',
                }}>
                Itineraries
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={{ width: '100%', height: 50, backgroundColor: 'black' }} 
          activeOpacity={0.6}
          onPress={() => {
            setBottomSheetActive(true);
            bs.current.snapTo(0);
          }}
        >
          <View style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
            flexDirection: 'row'
          }}>
            <Icon name="radius" size={24} color="white" style={{
              marginRight: 5
            }} />
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Lexend-SemiBold',
            }}>Radius: {radius} km</Text>
          </View>
        </TouchableOpacity>

      </View>
    } else if (item.type == "travelGuide") {
      return (
        <TravelGuide
          travelGuide={item.travelGuide}
          currentPlayingTG={currentPlayingTG}
          setCurrentPlayingTG={setCurrentPlayingTG}
          isUserProfilePage={false}
          navigation={navigation}
        />
      )
    } else {
      return (
        <Itinerary
          item={item.itinerary}
          navigation={navigation}
          isUserProfilePage={false}
          isDetail={false}
        />
      )
    }
  };

  //////////////////////////////////////////////////////////////////////////////




  //////////////////////////For BottomSheet/////////////////////////////////////
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [tmpRadius, setTmpRadius] = useState(radius);
  const [bottomSheetActive, setBottomSheetActive] = useState(false);

  const renderInner = () => (
    <View style={{
      backgroundColor: 'black', 
      height: 330, 
      paddingTop: 10, 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    }}>
      <View
        style={{
          width: 40,
          height: 2,
          backgroundColor: 'white',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: 10,
          borderRadius: 50
        }}
      />
      <Text style={{
        textAlign: 'center',
        fontFamily: 'Lexend-Bold',
        color: 'white',
        fontSize: 20
      }}>Modify Radius</Text>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Lexend-Light',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 10
        }}
      >{tmpRadius} km</Text>
      <View style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: 13, marginBottom: 'auto'}}>
        <Slider 
          min={1} 
          max={20} 
          values={[radius]} 
          markerColor='#ffffff'
          showLabel={false}
          onChange={val => setTmpRadius(val[0])}
        />
      </View>
      <Button
        style={{
          marginBottom: 10,
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        onPress={() => {
          bs.current.snapTo(1);
          setRadius(tmpRadius);
          setBottomSheetActive(false);
        }}
        title="Modify"
        color="white"
      />
      <View style={{marginBottom: 20}}></View>
    </View>
  );
  //////////////////////////////////////////////////////////////////////////////

  return (
    <View>
      {contentList.length > 0 && <FlatList
        opacity={bottomSheetActive ? 0.5 : 1}
        data={contentList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      />}
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        onCloseEnd={() => setBottomSheetActive(false)}
      />
      <Animated.View
        style={{
          margin: 0,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topView: {
    backgroundColor: 'white',
    height: 130,
    width: '100%',
    flexDirection: 'column',
    zIndex: 1000,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    width: '85%',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    shadowColor: '#000',
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabsContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  stripIcon: {
    width: 45,
    backgroundColor: 'grey',
    height: 4,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});