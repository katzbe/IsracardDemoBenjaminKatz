import { DefaultTheme } from '@react-navigation/native';
import Navigation from './src/navigation/RootNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  return <Navigation theme={MyTheme} />;
}
