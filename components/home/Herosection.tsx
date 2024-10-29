import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, FlatList, Dimensions ,TouchableWithoutFeedback} from "react-native";
import axios from 'axios';
import Paginations from "./Paginations";


var {width,height} = Dimensions.get('window')

export default function Herosection() {
  const [first, setFirst] = useState([]);

  const ApiCaller = async () => {
    try {
      const res = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.EXPO_PUBLIC_KEY}`;
      const response = await axios.get(res);
      setFirst(response.data.results.slice(0, 6));
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ApiCaller();
  }, []);

  const renderItem = ({ item }) => (
      <TouchableWithoutFeedback>
    <View style={styles.itemContainer}>
      {item.backdrop_path && ( // Check if backdrop_path exists
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} // Add base URL for images
          style={styles.hero_img}
        />
      )}
      <Text style={styles.text}>
  {item.title.length > 20 ? `${item.title.substring(0, 10)}...` : item.title}
</Text>

    </View>
      </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Movies</Text>
      <View style={styles.hero_section}>
        <FlatList
          data={first}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem} // Use renderItem function
          keyExtractor={(item) => item.id.toString()} // Provide a unique key for each item
        />
        <Paginations item={first}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  title:{
    padding:10,
    fontSize:18,
    color:"white",
  },
  hero_section: {
    alignItems: "center",
  },
  text: {
    color: "white",
    position:"absolute",
    right:0,
    left:0,
    bottom:10,


    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  hero_img: {
    width: width*0.6,
    height: height*0.5,
    resizeMode: "cover", // Change to cover for better scaling
    margin: 20,
    borderRadius:10,
  },
  itemContainer: {
    position:"relative",
    marginBottom: 20, 
  
  },
});
