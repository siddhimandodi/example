import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {connect} from 'react-redux';
import Icon from '../../components/Icon';
import {
  updateFavouriteAlbum,
  removeFavouriteAlbum,
} from '../../actions/albumList';

const setupIfNecessary = async (item) => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  await TrackPlayer.add(item);

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const Player = ({
  navigation,
  route,
  favAlbum,
  updateFavAlbum,
  removeFavAlbum,
  clearFavAlbum,
}) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [selectedItem] = useState(route.params.item);

  useEffect(() => {
    setupIfNecessary(selectedItem);
    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const getFavItem = () => {
    return favAlbum.some((item) => item.trackId === selectedItem.trackId);
  };

  const handleOnPress = () => {
    if (getFavItem()) {
      removeFavAlbum(selectedItem);
    } else {
      updateFavAlbum(selectedItem);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={{color: 'white'}}>Paradise</Text>
        <TouchableOpacity onPress={() => clearFavAlbum()}>
          <Icon name="ellipsis-v" size={20} color="#fff" enableRTL={true} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image style={styles.artwork} source={{uri: selectedItem.artwork}} />
        <View style={styles.artistContainer}>
          <View>
            <Text style={styles.titleText}>{selectedItem.title}</Text>
            <Text style={styles.artistText}>{selectedItem.artist}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleOnPress();
            }}>
            {getFavItem() ? (
              <Icon solid name="heart" size={20} color="red" />
            ) : (
              <Icon name="heart" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="green"
          minimumTrackTintColor="green"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.actionRowContainer}>
          <TouchableOpacity
            style={styles.skip}
            onPress={async () => {
              await TrackPlayer.seekTo(progress.position - 10);
            }}>
            <Icon name="undo" size={20} color="#fff" enableRTL={true} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playContainer}
            onPress={() => togglePlayback(playbackState)}>
            <Text style={styles.primaryActionButton}>
              {playbackState === State.Playing ? (
                <Icon name="pause" size={20} color="#fff" enableRTL={true} />
              ) : (
                <Icon name="play" size={20} color="#fff" enableRTL={true} />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skip}
            onPress={async () => {
              await TrackPlayer.seekTo(progress.position + 10);
            }}>
            <Icon name="redo" size={20} color="#fff" enableRTL={true} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default connect(
  (state) => {
    return {
      favAlbum: state.AlbumReducer.favouriteAlbum,
    };
  },
  {
    updateFavAlbum: updateFavouriteAlbum,
    removeFavAlbum: removeFavouriteAlbum,
  },
)(Player);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  artwork: {
    width: '100%',
    height: 340,
    marginTop: 30,
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  artistText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabelContainer: {
    width: 380,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabelText: {
    color: 'white',
    fontVariant: ['tabular-nums'],
  },
  actionRowContainer: {
    width: '55%',
    flexDirection: 'row',
    marginBottom: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryActionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD479',
  },
  secondaryActionButton: {
    fontSize: 14,
    color: '#FFD479',
  },
  playContainer: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 90,
  },
  skip: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
