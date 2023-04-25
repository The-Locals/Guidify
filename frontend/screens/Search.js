import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Searchbar from '../components/home/Searchbar';

export default function Search() {
    const PAGE_TYPE = {
        GUIDES: 'guides',
        ITINERARIES: 'itineraries',
      };
    const [currentPage, setCurrentPage] = useState(PAGE_TYPE.GUIDES);
    const [loading, setIsLoading] = useState(false);
    return (<View>
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
                    // getImageUrlFromPhotoReference={
                    //   getImageUrlFromPhotoReference
                    // }
                    // mapKey={mapAPIKey}
                    // region={region}
                    // setSelectedLocation={setSelectedLocation}
                    // setCurrentBottomSheetType={setCurrentBottomSheetType}
                    // mapRef={mapRef}
                    type="user"
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
    </View>)
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
  });