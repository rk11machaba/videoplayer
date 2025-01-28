import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  FlatList, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      // Replace with your actual YouTube Data API search implementation
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=API_KEY`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error searching for videos:', error);
      setSearchResults([]); 
    }
  };

  const handleVideoSelect = (videoId: string) => {
    //navigation.navigate('VideoPlayer', { videoId }); 
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.videoItem} 
      onPress={() => handleVideoSelect(item.id.videoId)} 
    >
      <Image 
        style={styles.thumbnail} 
        source={{ uri: item.snippet.thumbnails.default.url }} 
      />
      <Text style={styles.videoTitle}>{item.snippet.title}</Text>
      <Text style={styles.videoChannel}>{item.snippet.channelTitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Search for videos" 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={searchResults} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.videoId} 
        style={styles.resultsList} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoChannel: {
    fontSize: 14,
    color: '#555',
  },
  resultsList: {
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default SearchScreen;