import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import localTrack from '../../resources/pure.m4a';

const Search = ({navigation, props}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [searchTimer, setSearchTimer] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = (search) => {
    const url = 'https://itunes.apple.com/search?term=' + search + '&limit=50';
    axios
      .get(url)
      .then(function (response) {
        const resData = response.data.results;
        setData(resData);
        setShowLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (txt) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setShowLoader(true);
    setSearch(txt);
    setSearchTimer(
      setTimeout(() => {
        fetchData(txt);
      }, 2000),
    );
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const itemInfo = {
            trackId: item.trackId,
            url: localTrack,
            title: item.trackName,
            artist: item.artistName,
            artwork: item.artworkUrl100,
            duration: 27,
          };
          navigation.navigate('Player', {item: itemInfo});
        }}>
        <View style={[styles.contains]}>
          <Image source={{uri: item.artworkUrl100}} style={[styles.thumbs]} />
          <View style={styles.contents}>
            <View style={styles.left}>
              <Text style={{fontSize: 14, color: '#fff'}}>
                {item.trackName}
              </Text>
              <Text style={{fontSize: 10, color: '#fff'}}>
                {item.artistName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <SearchBar
        placeholder="Search for a song..."
        onChangeText={onSubmit}
        value={search}
        cancelButtonTitle={'cancel'}
        // onSubmitEditing={({nativeEvent}) => onSubmit(nativeEvent.text)}
      />
      {showLoader && (
        <View style={styles.loading}>
          <ActivityIndicator color="white" style={{marginLeft: 8}} />
        </View>
      )}
      {!showLoader && !data && (
        <View style={styles.loading}>
          <Text style={styles.text}>Play some music!</Text>
          <Text style={styles.text}>Search for your favorite songs</Text>
        </View>
      )}
      <FlatList
        style={{width: '100%'}}
        data={data}
        contentContainerStyle={{marginHorizontal: 20}}
        renderItem={({item}) => renderItem(item)}
        // onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.08}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
  },
  contains: {
    flexDirection: 'row',
    paddingTop: 5,
    marginBottom: 5,
  },
  contents: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 7.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  thumbs: {width: 48, height: 48, marginRight: 10},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
