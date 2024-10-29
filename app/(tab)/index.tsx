import { View, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import Herosection from '@/components/home/Herosection';
import Upcoming from '@/components/home/Upcoming';
import TopReated from '@/components/home/TopRated';


export default function Index() {
  return (
    <ScrollView>
      <View style={{ flex: 1, height: 'auto', backgroundColor: "#444", }}>
        <Header />
        <Herosection/>
        <Upcoming/>
        <TopReated/>
      </View>
    </ScrollView>
  );
}



