import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function User({ navigation, user }) {
    return (<TouchableOpacity
        style={{
            flexDirection: 'row',
            marginTop: 20,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}
        onPress={() => {
            navigation.navigate("UserProfile", {ownerId: user._id});
        }}
        activeOpacity={0.7}
    >
        <Avatar.Image source={{ uri: user.imageUrl ? user.imageUrl :  "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg"}} size={50} />
        <View
            style={{
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 15
            }}
        >
            <Text style={{
                color: 'black',
                fontFamily: 'Lexend-Bold',
                fontSize: 16
            }}>{user.username}</Text>
            <Text
                style={{
                    fontFamily: 'Lexend-Regular',
                    fontSize: 16
                }}
            >{user.firstName} {user.lastName}</Text>
        </View>
    </TouchableOpacity>)
}