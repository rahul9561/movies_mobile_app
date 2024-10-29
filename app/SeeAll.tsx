import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function SeeAll() {
    const router = useRouter();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState("white");

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_KEY}`
            );
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.bothicons_top}>
                <TouchableOpacity onPress={() => router.push('/(tab)')}>
                    <Ionicons style={styles.both_icons} name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLike(like === "white" ? "red" : "white")}>
                    <Ionicons style={{ color: like }} name="heart" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={movies}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push(`ViewsMovies?id=${item.id}`)}>
                            <View style={styles.movieItem}>
                                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movie_img} />
                                <Text style={styles.movieTitle}>{item.title}</Text>
                                <Text style={styles.movieDate}>{item.release_date}</Text>
                            </View>
                        </Pressable>
                    )}
                    columnWrapperStyle={styles.row}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 27,
        padding: 16,
        backgroundColor: "#333",
    },
    input: {
        padding: 10,
        borderColor: "#666",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        color: "white",
    },
    movieItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: "#444",
        borderRadius: 10,
    },
    movieTitle: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        marginTop: 5,
    },
    movieDate: {
        fontSize: 14,
        color: "#bbb",
        textAlign: "center",
    },
    movie_img: {
        width: width * 0.4,
        height: height * 0.25,
        borderRadius: 10,
    },
    bothicons_top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    both_icons: {
        color: "red",
    },
    loadingText: {
        color: "white",
        textAlign: "center",
    },
    row: {
        justifyContent: "space-between",
    },
});
