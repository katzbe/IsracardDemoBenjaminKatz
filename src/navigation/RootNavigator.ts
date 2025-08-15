import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: HomeScreen,
    Favourites: FavouritesScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeTabs,
    BookDetails: {
      screen: BookDetailsScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

// type BottomTabParamList = StaticParamList<typeof BottomTabNavigator>;
// type ProfileScreenNavigationProp = BottomTabNavigationProp<
//   BottomTabParamList,
//   'Profile'
// >;

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default Navigation;
