import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import Searchbar from '../components/home/Searchbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';
import User from '../components/User';
import ip from '../ip.json';

export default function UserSearch({ navigation }) {
    const [users, setUsers] = useState([]);
    //////////////////////// For FlatList ///////////////////////////////////////
    const [contentList, setContentList] = useState([]);
    useEffect(() => {
        let candidateList = [];
        users.forEach(user => {
            candidateList.push({
                id: user._id,
                user: user
            })
        });
        setContentList(candidateList);
    }, [users])

    const renderItem = ({item}) => {
        return <User 
            user={item.user}
            navigation={navigation}
        />
    }
    //////////////////////////////////////////////////////////////////////////////

    const handleSearch = (text) => {
        fetch(`http://${ip.ip}:8000/user/usersWithUsernamesStartingWith?s=${text}`, {
            credentials: 'include',
            method: 'GET',
          })
            .then(res => res.json())
            .then(resBody => {
              if (resBody.statusCode == 200) {
                setUsers(resBody.users);
              } else {
                console.log('something wrong with request');
              }
            });
    }

    return (<View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
            style={{
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 20,
                padding: 0,
                position: 'relative',
                flexDirection: 'row',
            }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SearchPlaces")
                }}
            >
                <Icon name="arrow-left" size={24} color="black" style={{
                    marginRight: 10,
                    marginBottom: 'auto',
                    marginTop: 'auto',
                }} />
            </TouchableOpacity>
            <Searchbar
                type="userSearch"
                handleSearch={handleSearch}
            />
        </View>
        <View 
            style={{
                marginTop: 20,
                borderStyle: 'solid',
                borderTopColor: "#ebeae8",
                borderTopWidth: 1
            }}
        />
        <FlatList 
            keyboardShouldPersistTaps='handled'
            data={contentList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
        />
    </View>
    )
}
