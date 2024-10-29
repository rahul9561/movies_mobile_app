import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function Header() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <View>
            <StatusBar backgroundColor="green" barStyle="default" />

            <View style={styles.container}>
                {/* Use TouchableOpacity for better touch feedback */}
                <TouchableOpacity onPress={() => setIsToggled(!isToggled)}>
                    <Ionicons 
                        name={isToggled ? 'close' : 'menu'} 
                        size={30} 
                        color="white" 
                    />
                </TouchableOpacity>
               <Text style={styles.top}>
               <Text style={{color:"#FFD700"}}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={() => router.push("Search")}>
                    <Ionicons 
                        name="search" 
                        size={30} 
                        color="white" 
                    />
                </TouchableOpacity>

            </View>

            {/* Conditionally render the toggleBar */}
            {isToggled && (
                <View style={styles.toggleBar}>
                    <Text style={styles.toggleText}>Home</Text>
                    <Text style={styles.toggleText}>About</Text>
                    <Text style={styles.toggleText}>Services</Text>
                    <Text style={styles.toggleText}>Career</Text>
                    <Text style={styles.toggleText}>Get Internship</Text>
                    <Text style={styles.toggleText}>Contact</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 36,
        padding: 6,
        backgroundColor: "#444",
    },
    top: {
        fontSize:25,
        color:"white"
    },
    toggleBar: {
        position: "absolute",
        top: 66, // Adjust this position as needed
        left: 0,
        right: 0,
        zIndex: 9099,
        backgroundColor: "darkslategray",
        padding: 10,
        borderRadius: 5,
    },
    toggleText: {
        color: "white",
        paddingVertical: 5,
        textAlign: "center",
    }
});
