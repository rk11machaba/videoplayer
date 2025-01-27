import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';

const App = () => {
  const [videoId, setVideoId] = useState('ELssXP1sTC8'); 
  const playerRef = useRef(null);


  return (
    <View style={styles.container}>
      <YouTubePlayer
        height={300}
        width="100%"
        videoId={videoId}
        play={false}
        ref={playerRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;