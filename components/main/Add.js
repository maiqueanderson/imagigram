import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Image, Text, Button } from 'react-native';
//para pegar imagens do dispositivo do usuario o * serve para pegar tudo da biblioteca
import * as ImagePicker from 'expo-image-picker';


  //aqui é para pegar as permissões da camera e da galeria
export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState();
  const [type, setType] = useState(CameraType.back);

//é a primeira função a ser disparada
  useEffect(() => {
    (async () => {
      //aqui é para esperar a requisição da camera e aceitação
      const cameraRequest = await Camera.requestCameraPermissionsAsync();
      //veriricação para saber a decisão do usuario de permissão da galeria e da camera
      setHasCameraPermission(cameraRequest.status === 'granted');
      const galleryRequest = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryRequest.status === 'granted');
    })();
  }, []);

  //função para tirar a foto
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  //função para pegar imagem no dispositivo do usuario
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === null) {
    return <Text>No access to camera</Text>;
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {image ? (
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        ) : (
          //exibição da imagem da camera ou imagem selecionada na galeria
          <Camera
            ref={(ref) => setCamera(ref)}
            style={{ flex: 1, aspectRatio: 1 }}
            type={type}
            ratio={'1:1'}
          />
        )}
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button
          title='Flip Camera'
          onPress={() => {
            //aqui é para selecionar qual camera sera utilizada, a traseira ou a frontal
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
        <Button title='Take Picture' onPress={() => takePicture()} />
        <Button title='Select from the Gallery' onPress={() => pickImage()} />
        {/* aqui ele vai navegar para a tela de save para salvar a imagem escolhida pelo usuario */}
        <Button title=' Save' onPress={() => navigation.navigate('Save', { image })}/>
      </View>
    </View>
  );
}