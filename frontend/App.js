import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './screens/SignUp';
import Search from './screens/Search';
import Login from './screens/Login';
import Map from './screens/Map';
import NewMap from './screens/NewMap';
import Library from './screens/Library';
import PlacesAutoComplete from './components/PlacesAutoComplete';
import CreateItinerary from './screens/CreateItinerary';
import CreateTravelGuide from './screens/CreateTravelGuide';
import User from './screens/User';
import EditUser from './screens/EditUser';
import ip from './ip';
import { withNavigation } from '@react-navigation/compat';
import UserSearch from './screens/UserSearch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserWithNavigation = withNavigation(User);

function MyTabs() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch(`http://${ip.ip}:8000/auth/isLoggedIn`, {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(resBody => {
        if (resBody.userId) {
          setUserId(resBody.userId);
        }
      });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarItemStyle: {
          backgroundColor: '#000',
          margin: 0,
          borderRadius: 0,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                color="white"
                size={33}
                style={styles.mapicon}
              />
            );
          },
        }}>
        {props => {
          return <HomeScreen {...props} userId={userId} />;
        }}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? "magnify-expand" : "magnify"}
                color="white"
                size={33}
                style={styles.mapicon} 
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="UserProfile"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name={focused ? "account" : "account-outline"}
                color="white"
                size={33}
                style={styles.mapicon}
              />
            );
          },
        }}>
        {props => {
          return <UStackNav {...props}
            ownerId={userId}
            origin="Tab"
          />;
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const HomeScreen = passedProps => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" options={{ headerShown: false }}>
        {props => {
          return <NewMap {...passedProps} {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="UserProfileFromHome" options={{ headerShown: false }}>
        {(props) => {
          return <User
            {...passedProps}
            {...props}
            origin='Home'
            ownerId={props.route.params.ownerId}
          />
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const UStackNav = passedProps => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="Map" options={{ headerShown: false }}>
        {props => {
          return <NewMap {...passedProps} {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="User" options={{ headerShown: false }}>
        {props => {
          return (
            <UserWithNavigation
              {...passedProps}
              {...props}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen
        name="Edit User"
        component={EditUser}
        options={{
          headerTitleStyle: { fontFamily: 'Lexend-SemiBold' },
        }}
      />
      <Stack.Screen
        name="Create Itinerary"
        component={CreateItinerary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create TravelGuide"
        component={CreateTravelGuide}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = passedProps => {
  return (
    <Stack.Navigator initialRouteName='SearchPlaces'>
      <Stack.Screen name="Map" options={{ headerShown: false }}>
        {props => {
          return <NewMap {...passedProps} {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen
        name="SearchPlaces"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSearch"
        component={UserSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UserProfile" options={{ headerShown: false }}>
        {(props) => {
          return <User
            {...passedProps}
            {...props}
            origin='Search'
            ownerId={props.route.params.ownerId}
          />
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// const App = () => {
//   return (

//     <NavigationContainer>
//        <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//         <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
//         <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />

//       </Stack.Navigator>
//        <MyTabs />

//     </NavigationContainer>
//   );
// };

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  mapicon: {
    height: 30,
    width: 30,
    marginTop: 20,
  },
});
