import React from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator, Dimensions, Text } from 'react-native'; // Adicionando Text
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

// Importando as imagens
import Projeto2 from '../../img/Projeto2.png';
import Projeto3 from '../../img/Projeto3.png';

const TelaPDF = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [scale, setScale] = React.useState(1);

  const handleZoomEvent = React.useCallback((event) => {
    setScale(event.nativeEvent.scale);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        horizontal={true}
        vertical={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.imageContainer}>
          <PinchGestureHandler
            onGestureEvent={handleZoomEvent}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                setScale(Math.max(1, scale));
              }
            }}
          >
            <Image
              source={Projeto2}
              style={[styles.image, { width: windowWidth * scale, height: windowHeight * scale, zIndex: 1 }]}
              resizeMode="contain"
              PlaceholderContent={<ActivityIndicator />}
            />
          </PinchGestureHandler>
          <PinchGestureHandler
            onGestureEvent={handleZoomEvent}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                setScale(Math.max(1, scale));
              }
            }}
          >
            <Image
              source={Projeto3}
              style={[styles.image, { width: windowWidth * scale, height: windowHeight * scale, zIndex: 2 }]}
              resizeMode="contain"
              PlaceholderContent={<ActivityIndicator />}
            />
          </PinchGestureHandler>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default TelaPDF;
