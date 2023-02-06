import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Button, Alert, StatusBar, LogBox } from 'react-native';// Import Map and Marker
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { FloatingAction } from "react-native-floating-action";
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable'
import { Header } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'

const Map = () => {

    const [markers, setMarkers] = React.useState(null);
    const [isModalVisible, setModalVisible] = useState(true);
    const [photo, setPhoto] = useState('ARywPAI4CheuR7nthP4lUNuQw09LqBIfNHSNdfgmBuUA7SdwUjkkiWwEJGcbueamM-zxmpJ7HC8yvx-w3GUczlThnPkC6-llma_MPNGPQbGo1R0SGGaUIUUiruARLrwesAJYrbxiADZib5tT1o-k_JvNdQyx91hxav_VDmaaNfshPjvQygi7');
    const key = 'AIzaSyCsdtGfQpfZc7tbypPioacMv2y7eMoaW6g';
    const url = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + photo + '&sensor=false&maxheight=500&maxwidth=500&key=' + key;
    const [description, setDescription] = useState('OConnell Bridge, North City, Dublin 1, Ireland');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [MPtitle, setMPtitle] = useState('Default Name');
    const [MPdesc, setMPdes] = useState('Default Artist');

    const Itineraries = [
        {
            title: "Best Hotel in Town",
            description: 'Imperial Hotel'
        },
        {
            title: "Best pub in town",
            description: 'Mo chara'
        },
        {
            title: "Best restaurant in town",
            description: 'McDonalds'
        }
    ];
    const [pin, setPin] = React.useState({
        latitude: 53.350140,
        longitude: -6.266155,
    })
    const [region, setRegion] = React.useState({
        latitude: 53.350140,
        longitude: -6.266155,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    const markers_map = [
        {
            coordinates: {
                latitude: 53.34809202306839,
                longitude: -6.27593994140625
            },
        },
        {
            coordinates: {
                latitude: 53.35423999538777,
                longitude: -6.253623962402345
            },
        },
        {
            coordinates: {
                latitude: 53.36141150911517,
                longitude: -6.267700195312501
            },
        }
    ]

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['40%', '80%'], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


    Geolocation.requestAuthorization();

    const toggleModal = () => {


        if (isModalVisible) {

            bottomSheetRef.current.close()
            setModalVisible(!isModalVisible);
        }
        else {

            bottomSheetRef.current.snapToIndex(0)
            setModalVisible(true);
        }
    };

    // render
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text >{item.title}</Text>
                <Text >{item.description}</Text>
            </View>
        ),
        []
    );

    const actions = [
        {
            text: "Current Location",
            name: "Geolocation",
            icon: require("../assets/gps.png"),
            position: 1,
        },
    ];


    const renderMarkers = (markers) => {

        return markers.map(marker => (
            <Marker
                coordinate={marker.coordinates}
                pinColor="white"
                draggable={true}
                onDragStart={(e) => {
                    console.log("Drag start", e.nativeEvent.coordinates)
                }}
                onDragEnd={(e) => {
                    setPin({
                        latitude: marker.coordinates.latitude,
                        longitude: marker.coordinates.longitude
                    })
                }}
                onPress={toggleModal}
            >
            </Marker>
        ))
    }
    const getCurrentPosition = async () => {
        //await requestLocationPermission()
        Geolocation.getCurrentPosition(
            (pos) => {
                console.log("curr: " + JSON.stringify(pos));
                console.log("curr lng: " + JSON.stringify(pos.coords.longitude));
                setRegion({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
            },
            (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true }
        );
    };


    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        LogBox.ignoreLogs(["Encountered two children with the same key"]);
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    }, [currentPage]);


    return (
        <View style={{ marginTop: 0, flex: 1, }}>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 53.350140,
                    longitude: -6.266155,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google"
                //region={region}
                customMapStyle={mapStyle}
                region={region}
                onPress={(e) => { setMarkers(e.nativeEvent.coordinate); console.log(e.nativeEvent.coordinate) }}
            >
                {renderMarkers(markers_map)}

                <Marker
                    draggable={true}
                    coordinate={
                        {
                            latitude: region.latitude,
                            longitude: region.longitude
                        }
                        //markers
                    }
                    pinColor="white"
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                    onPress={toggleModal}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>

                <Circle center={region} radius={1000} />
            </MapView>
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                    console.log("curr: " + getCurrentPosition());
                }}
                color="orange"
                position='right'
                distanceToEdge={{ horizontal: 20, vertical: 40 }}
            />
            <BottomSheet
                index={0}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                style={styles.bottomSheetStyle}
            >
                <Header containerStyle={styles.header}>
                    <View style={styles.innerHeader}>
                        <Text style={styles.headerText}>
                            Strolling around Dundalk
                        </Text>
                        <Text>
                            A nice tour that will guide through town
                        </Text>
                        <Text>
                            ⭐⭐⭐⭐⭐
                        </Text>

                    </View>
                </Header>
                <Animatable.View style={styles.contentContainer}
                    animation="fadeInUp"
                    delay={500}
                    easing="ease-in-out"
                    duration={400}>

                </Animatable.View>
                <BottomSheetFlatList
                    data={Itineraries}
                    keyExtractor={(item, index) => item.title}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                    style={styles.bottomSheetStyle}
                />
            </BottomSheet>
        </View >

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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },

    itemContainer: {

        height: 35,
        padding: 6,
        margin: 6,
        width: "100%",
        color: "black",
        borderBottom: "1px solid black",
        fontSize: "19px",
    },

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#bbb",
        borderRadius: 3,
    },
    text: {
        color: "#bbb",
        fontSize: 20,
        marginTop: 100,
    },
    contentContainer: {
        alignItems: 'center',
    },

    header: {
        flex: 0.10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: "#a490dc",
        color: "white",

    },
    bottomSheetStyle:
    {
        backgroundColor: "#e4fff4",
    },
    innerHeader:
    {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: -50,
        minWidth: 300,
        color: "white"
    },
    headerText:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    }
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