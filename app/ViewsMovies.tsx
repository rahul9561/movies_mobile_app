import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Import useRoute for accessing params
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window");

export default function ViewsMovies() {
  const route = useRoute(); // Use useRoute to get the route object
  const { id = 'N/A' } = route.params || {}; // Fallback to 'N/A' if id is undefined
  const [movie, setMovie] = useState(null); // Initialize movie as null
  const [cedit, setCredit] = useState([]);
  const [like, setLike] = useState("white")

  const MoviesCredit = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.EXPO_PUBLIC_KEY}`;
      const response = await axios.get(url);
      setCredit(response.data.cast || []); // Ensure to access the cast array
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };

  const MoviesApi = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_KEY}`;
      const response = await axios.get(url);
      setMovie(response.data);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    MoviesApi();
    MoviesCredit();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bothicons_top}>
          <TouchableOpacity onPress={() => router.push('/(tab)')} >
            <Ionicons style={styles.both_icons} name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons style={{color:like}} name="heart" size={30} color="#fff" onPress={()=>setLike("red")} />
          </TouchableOpacity>
        </View>
        {movie && (
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.features}
            />
            <Text style={styles.overview}>
              {movie.overview}
            </Text>
          </View>
        )}
        <View>
          <Text style={styles.top_cast}>Top Cast</Text>
          <FlatList
            data={cedit}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.cast_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.photo_section}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                  }}
                  style={styles.hero}
                />
                <Text style={styles.castName}>{item.name}</Text>
                <Text style={styles.castRole}>{item.character}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 16,
  },
  features: {
    width: width - 32,
    height: height * 0.7,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  overview: {
    color: "#e0e0e0",
    fontSize: 16,
    marginBottom: 20,
  },
  top_cast: {
    fontSize: 21,
    color: "#9f2085",
    marginVertical: 10,
  },
  photo_section: {
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 10,
    marginRight: 10,
  },
  hero: {
    width: 89,
    height: 89,
    borderRadius: 45,
    marginBottom: 5,
  },
  bothicons_top: {
    paddingTop:40,
    paddingBottom:12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  both_icons: {
    color: "red",
  },
  castName: {
    color: "#fff",
    fontWeight: "bold",
  },
  castRole: {
    color: "#b0b0b0",
    fontSize: 12,
  },
});
