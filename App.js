/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
  TextInput
} from 'react-native';

class TextList extends React.PureComponent {
  render(){
    return(
      <View style={{flex: 1, margin: 4, padding: 16, borderColor: 'black', borderWidth: 2}}>
        <Text>name : {this.props.data.name}</Text>
        <Text>age : {this.props.data.age}</Text>
      </View>
    )
  }
}

export default class App extends React.PureComponent {
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getData = (num) => {
    let data = [];
    for (let i = 0; i < num; i++) {
      data.push({ id: i, name: this.makeid(10), age: Math.round(Math.random() * 100) })
    }
    return data;
  }

  state = {
    data: [],
    show: false
  }

  render() {
    return (
      <View style={{padding: 8}}>
        {!this.state.show ? (
          <TextInput style={{borderColor: 'black', borderWidth: 2}} keyboardType={'decimal-pad'} onSubmitEditing={({ nativeEvent }) => this.setState({
            data: this.getData(nativeEvent.text),
            show: true
          })}/>) : (
            <FlatList
            data={this.state.data}
            initialNumToRender={10}
            renderItem={({item}) => (<TextList data={item}/>)}
            keyExtractor={(item) => item.id}
            onEndReached={() =>  setTimeout(() => {
              this.setState({show: false})
            }, 5000) }
          />  
        )}
      </View>
    )
  }
}
