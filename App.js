// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React from 'react';
import {useEffect, useState} from "react";
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#900000",
        }}
      />
    );
  }
  const FlatListHeader = () => {
    return (
      <View 
      // elevation={1} 
      
        style={{
          elevation:1,
          height: 100,
          width: "100%",
          margin: 0,
          backgroundColor: "white",
          borderColor:'#d9d9d9',
          borderWidth: 2,
          // border: 2.9,
          // borderColor: "black",
          alignSelf: "center",
          shadowColor: "#d9d9d9",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49
        }}
      >
        <Text style={{  textShadowColor: '#d9d9d9', textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40,color:"#373737"}}>Latest Commits</Text>
      </View>
    );
  }
  const getLast25Commits = async () => {
     try {
      const response = await fetch('https://api.github.com/repos/snigdha-n/latestrepocommits/commits?per_page=25');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    useEffect(() => {
      getLast25Commits();
  }, []);
  return (
    <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
          >

<FlatList
 data={data}
           keyExtractor={({ sha }, index) => sha}
           ListHeaderComponent = { FlatListHeader }   
           ItemSeparatorComponent = { FlatListItemSeparator }
           
           renderItem={({ item }) => (
            // <TouchableOpacity  style={[ false]}>
            <View style={{ backgroundColor: Colors.white }}>
             <Text selectable={false} style={styles.title}>{"\n"}{item.commit.author.name}{"\n"}{item.sha}{"\n"}{item.commit.message}{"\n"}</Text>
         
             </View>
              )}
        
      />
       
        </View>
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  item: {
       // marginLeft:100,
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor:"white"
      },
      title: {
        fontSize: 20,
        left:10,
        width:'80%',
        color:"#373737"
      },
});

export default App;

