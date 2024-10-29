/** @format */

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Upcoming() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUpcomingMovies = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_KEY}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming</Text>
        <Pressable onPress={() => router.push(`SeeAll?name=upcoming`)}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`ViewsMovies?id=${item.id}`)}>
            <View style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.img}
              />
              <Text style={styles.movieTitle}>
                {item.original_title.length > 20
                  ? `${item.original_title.substring(0, 20)}...`
                  : item.original_title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  seeAll: {
    color: "yellow",
    fontSize: 17,
  },
  movieContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  img: {
    width: width * 0.5,
    height: height * 0.4,
    borderRadius: 10,
  },
  movieTitle: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
