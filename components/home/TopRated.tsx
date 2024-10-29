import { View, Text, StyleSheet, Image, Dimensions, FlatList,Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function TopReated() {
    const [movies, setMovies] = useState([]);

    const fetchUpcomingMovies = async () => {
        try {
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.EXPO_PUBLIC_KEY}`;
            const response = await axios.get(url);
            setMovies(response.data.results);
        } catch (error) {
            console.log("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchUpcomingMovies();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Top Rated</Text>
                <Pressable onPress={()=>router.push(`SeeAll?name=${top_rated}`)}>
          <Text style={styles.seeAll} >See all</Text>
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
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={styles.img}
                        />
                        <Text style={styles.movieTitle}>{item.original_title}</Text>
                    </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#000', // To make text colors more visible
        flex: 1,
        paddingTop:15,
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
        textAlign: 'center',
    },
});
