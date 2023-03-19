import * as React from "react";
import { Image, StyleSheet, StatusBar, View, Pressable, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, Padding } from "../GlobalStyles";
import axios from "axios";
import { Camera, useCameraDevices, useIsAppForeground } from "react-native-vision-camera";
import { ActivityIndicator } from "react-native";

const IPhone14Pro15 = () => {
  const navigation = useNavigation();


  const [result, setResult] = React.useState({
    "can park or not": "yes",
    "can park until": "9pm",
    "require payment": "no",
    "p-disc required": "no",
    "park to right": "yes",
    "person can park": "resident"
})

const newCameraPermission = async() => await Camera.requestCameraPermission()

console.log('$$$$$$$$$$$' , devices)



React.useEffect(() => {
  newCameraPermission()

}, [])


  React.useEffect(() => {


    if (photo) return null
    callBackend()
  
  
  }, [photo])

  const camera = React.useRef(null)


  const [cameraPermission, setCameraPermission] = React.useState();

  React.useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  const photo = async () => await camera.current.takePhoto({
    flash: 'on'
  })

  

  console.log('$$$$photo', photo);
  

  const devices = useCameraDevices();
  const cameraDevice = devices.back;

  const callBackend = () => {

    console.log(photo);
    const data = {
      "file_id": null,
      "upload_file": null
  }

    axios.post('https://parkscan.pythonanywhere.com/api/files/object_detection/', data)
    .then(response => {
      setResult(response.data)

      Alert.alert(
        
        `
        Can park or not :  ${result['can park or not']} \n 
        Can park until :  ${result['can park until']} \n 
        Require payment :  ${result['require payment']} \n 
        P-disc required :  ${result['p-disc required']} \n 
        Park to right :  ${result['park to right']} \n 
        Person can park :  ${result['person can park']} 
  
        `)
      
    
    })
    .catch(error => {
      Alert.alert("helllllllll$$$$$$$$" , error);
    })
  }

  return (
    <View style={styles.iphone14Pro15}>
    

      {/* <Image
        style={[styles.parkeringskylt1Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/parkeringskylt-1.png")}
      /> */}

{cameraDevice && cameraPermission === 'authorized' ? 

        <Camera
        ref={camera}
        {...props}
        style={[styles.parkeringskylt1Icon, styles.iconLayout]}

        isActive={true}
        photo={true}
  
          device={cameraDevice}
        
        />
   :
   <ActivityIndicator style={{marginTop:70}} size="large" color="#1C6758" />
    }


      <StatusBar barStyle="default" />
      {/* <View style={styles.homeindicator}>
        <View style={styles.homeIndicator} />
      </View>

      <Pressable style={[styles.backBtn, styles.backBtnPosition]}>
        <View style={[styles.backBtnChild, styles.childShadowBox]} />
        
      
        <Pressable
          style={styles.rectangleParent}
          onPress={() => navigation.navigate("IPhone14Pro7")}
        >
          <Pressable style={[styles.groupChild, styles.childShadowBox]} />
          <Image
            style={[styles.vectorIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/vector16.png")}
          />
        </Pressable>
      </Pressable>
      <Image
      
        style={[
          styles.iphone14Pro15Child,
          styles.backBtnPosition,
          styles.iconLayout,
        ]}
        resizeMode="cover"
        source={require("../assets/ellipse-2.png")}
      />
      <View style={styles.nounScan23885591}>
        <Image
          style={styles.vectorIcon1}
          resizeMode="cover"
          source={require("../assets/vector17.png")}
        />
      </View>
      <Image
        style={[styles.flashOnIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/flash-on.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  backBtnPosition: {
    bottom: "5.63%",
    position: "absolute",
  },
  childShadowBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(186, 175, 175, 0.5)",
    backgroundColor: Color.labelColorDarkPrimary,
    borderRadius: Border.br_3xs,
    right: "0%",
    height: "100%",
    bottom: "0%",
    top: "0%",
    position: "absolute",
  },
  parkeringskylt1Icon: {
    height: "106.36%",
    width: "113.28%",
    right: "-13.28%",
    bottom: "-6.36%",
    left: "0%",
    top: "0%",
    maxWidth: "100%",
    position: "absolute",
  },
  homeIndicator: {
    borderRadius: Border.br_3xl,
    backgroundColor: Color.lightgray,
    width: 134,
    height: 5,
  },
  homeindicator: {
    height: "2.46%",
    width: "95.9%",
    top: "97.54%",
    right: "1.79%",
    left: "2.31%",
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: Padding.p_2xs,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: "0%",
    position: "absolute",
  },
  backBtnChild: {
    left: "88.3%",
    width: "11.7%",
  },
  groupChild: {
    left: "0%",
    width: "100%",
  },
  vectorIcon: {
    height: "45%",
    width: "27.5%",
    top: "27.5%",
    right: "40%",
    bottom: "27.5%",
    left: "32.5%",
    position: "absolute",
  },
  rectangleParent: {
    right: "88.3%",
    width: "11.7%",
    height: "100%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  backBtn: {
    height: "4.69%",
    width: "87.02%",
    top: "89.67%",
    right: "6.62%",
    left: "6.36%",
  },
  iphone14Pro15Child: {
    height: "12.09%",
    width: "26.21%",
    top: "82.28%",
    right: "37.15%",
    left: "36.64%",
  },
  vectorIcon1: {
    width: 53,
    height: 53,
  },
  nounScan23885591: {
    height: "6.26%",
    width: "18.34%",
    top: "85.16%",
    right: "40.91%",
    bottom: "8.58%",
    left: "40.75%",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
  },
  flashOnIcon: {
    height: "2.93%",
    width: "6.36%",
    top: "90.61%",
    right: "8.4%",
    bottom: "6.46%",
    left: "85.24%",
    position: "absolute",
  },
  iphone14Pro15: {
    backgroundColor: "#dffffe",
    flex: 1,
    height: 849,
    overflow: "hidden",
    width: "100%",
  },
});

export default IPhone14Pro15;
