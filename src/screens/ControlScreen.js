import React, { useState } from 'react';
import {Switch, TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from "@expo/vector-icons";

import Logo from '../components/Logo';
import ModuleModal from '../components/ModuleModal';

const ControlScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const modules = [
    { title: "AROMA", modes: ["Disabled", "Enabled"] },
    { title: "AROMA", modes: ["Disabled", "Lavender"] },
    { title: "SOUND", modes: ["Disabled", "Rain Forest", "Rainfall", "Breeze"] }
  ];
  const [selectedValue, setSelectedValue] = useState("Disabled"); 
  const [selectedModule, setSelectedModule] = useState(modules[2]);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handlePress = (module) => {
    if (module.length == 2)
    {
      
    }
    else {
      setModalVisible(true);
      setSelectedModule(module);
    }
  }

  const beaconColors = ['green', 'red', 'blue'];

  const beaconTitle = 'beacon';

  return (
    
    <View style={styles.mainContainer}>
      <ModuleModal isVisible={modalVisible} toggleModal={toggleModal} modules={modules}/>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() =>
          navigation.navigate('HomeScreen')}>
        <Entypo
          name="home"
          size={30}
          color="black" />
      </TouchableOpacity>
      <Logo />
      <Text style={styles.topText}>Tap on a module to adjust it</Text>
      <View style={styles.container}>
        <View style={styles.moduleContainer}>
          <TouchableOpacity style={styles.topHardwareComponent} onPress={() => handlePress({beaconTitle, beaconColors})}/>
          <View style={styles.lineTop} />
          <View style={styles.topCircle} />
          <View style={styles.moduleContainerText}>
            <Text>BEACON</Text>
            <Text>Emerald of Calmness</Text>
          </View>
        </View>
        {modules.map((module, i) => {
          const title = module.title;
          const mode = module.mode;
          return (
            <View key={i} style={styles.moduleContainer}>
              <TouchableOpacity style={styles.hardwareComponent} onPress={() => handlePress({title, mode})}/>
              <View style={styles.line} />
              <View style={styles.circle} />
              <View style={styles.moduleContainerText}>
                <Text>{module.title}</Text>
              </View>
            </View>
          );
        })}
        <View style={styles.verticalRect} />
        <View style={styles.horizontalRect} />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
// put this in a constant ^^

const boxHeight = 60;
const smallBoxHeight = 35;

const styles = StyleSheet.create({
  homeButton: {
    alignItems: 'flex-end',
  },
  circle: {
    borderRadius: "50%",
    backgroundColor: "red",
    width: 5,
    height: 5,
    marginTop: boxHeight * .5 - 3
  },
  topCircle: {
    borderRadius: "50%",
    backgroundColor: "red",
    width: 5,
    height: 5,
    marginTop: smallBoxHeight * .5 - 3
  },
  line: {
    borderBottomColor: "Black",
    borderBottomWidth: 1,
    width: 100,
    height: boxHeight * .5,
    marginLeft: -15,
    marginRight: 0,
    paddingRight: 0,
  },
  lineTop: {
    borderBottomColor: "Black",
    borderBottomWidth: 1,
    width: 100,
    height: smallBoxHeight * .5,
    marginLeft: -15,
    marginRight: 0,
    paddingRight: 0,
  },
  mainContainer: {
    padding: 10
  },
  topText: {
    alignSelf: 'center',
    color: "grey"

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 30,
  },
  moduleContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
    width: .9 * windowWidth,
    padding: 10,
    paddingLeft: 50
  },
  moduleContainerText: {
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center'
  },
  hardwareComponent: {
    height: boxHeight,
    width: 40,
    backgroundColor: '#21518C'
  },
  topHardwareComponent: {
    height: smallBoxHeight,
    width: 40,
    backgroundColor: '#21518C'
  },
  homeButton: {
    height: 20,
    alignItems: 'flex-end',
    marginTop: 5,
    marginRight: 5
  },
  verticalRect: {
    height: 180,
    width: 40,
    marginTop: 20,
    marginLeft: 50,
    marginBottom: -1,
    backgroundColor: '#21518C'
  },
  horizontalRect: {
    height: 40,
    width: 140,
    backgroundColor: '#21518C'
  }
})

export default ControlScreen;
