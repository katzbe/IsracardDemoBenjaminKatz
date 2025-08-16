import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShadowVisible: false,
  },
  screens: {
    Home: HomeScreen,
    Favorites: FavoritesScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShadowVisible: false,
  },
  screens: {
    Tabs: {
      options: {
        headerShown: false,
      },
      screen: HomeTabs,
    },
    BookDetails: {
      options: {
        headerTitle: 'Book Details',
      },
      screen: BookDetailsScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default Navigation;
