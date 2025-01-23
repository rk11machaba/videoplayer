import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
  // Initialize the video player with the source
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true; // Enable looping
    player.play(); // Start playing immediately
  });

  // Track whether the video is playing
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if (isPlaying) {
              player.pause(); // Pause the video
            } else {
              player.play(); // Play the video
            }
          }}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background color for better contrast
  },
  video: {
    width: 360, // Slightly adjusted for better responsiveness
    height: 270,
    borderRadius: 8, // Add rounded corners to the video
    backgroundColor: '#000', // Black background for better video contrast
  },
  controls: {
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#007BFF', // Blue button background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24, // Rounded edges
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  playButtonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
