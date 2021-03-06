import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/FeedScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../App';

const Stack = createStackNavigator();

const Root = () => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({navigation, scene, previous}) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
            <Appbar.Action
              icon="power"
              onPress={async () => {
                await AsyncStorage.removeItem('user');
                signOut();
              }}
            />
          </Appbar.Header>
        ),
      }}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{title: 'Feed'}}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{title: 'Add new Post'}}
      />
    </Stack.Navigator>
  );
};

export default Root;
