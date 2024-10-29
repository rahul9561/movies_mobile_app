import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function About() {
  const fetchLatestMovies = async () => {
    const url = 'https://latest-movies.p.rapidapi.com/movies';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'latest-movies.p.rapidapi.com',
        'x-rapidapi-key': '54229971c2msh06ca4f7319c764fp1d8b04jsn85bd0b48babe'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Latest Movies:", data);
    } catch (error) {
      console.error('Error fetching latest movies:', error);
    }
  };
  
  // Call the function to fetch the latest movies
 
  

  // Call fetchMovieData once when the component mounts
  useEffect(() => {
    fetchLatestMovies();;
  }, []);

  return (
    <View>
      <Header />
      <Link href="/">
        <Ionicons 
          style={styles.icon}
          name="arrow-back" 
          size={30} 
          color="white" 
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: "black" // or another color you prefer
  }
});
