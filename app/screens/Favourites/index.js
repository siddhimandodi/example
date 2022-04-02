import React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

const Favourites = ({navigation, favAlbum}) => {
  const FavoriteList = ({item}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Player', {item});
          }}>
          <Image style={styles.imageContainer} source={{uri: item.artwork}} />
          <Text style={{color: 'white', marginTop: 10}}>{item.title}</Text>
          <Text style={{color: 'white'}}>{item.artist}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <Text style={styles.favText}>Favourites</Text>
      </View>
      <FlatList
        data={favAlbum}
        numColumns={2}
        columnWrapperStyle={styles.wrapperStyles}
        keyExtractor={(item) => item.trackId}
        renderItem={({item}) => <FavoriteList item={item} />}
      />
      {!favAlbum.length && (
        <View style={styles.noAlbum}>
          <Text style={styles.noAlbumText}>No Favourite Album</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default connect((state) => {
  return {
    favAlbum: state.AlbumReducer.favouriteAlbum,
  };
})(Favourites);

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 20,
  },
  container: {
    width: width / 2 - 10,
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  noAlbum: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAlbumText: {
    fontSize: 18,
    color: 'white',
  },
  wrapperStyles: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  favText: {
    fontSize: 20,
    color: 'green',
    marginTop: 20,
  },
});
