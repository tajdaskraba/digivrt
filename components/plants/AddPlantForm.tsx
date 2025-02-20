import { StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from "@/components/ui/image";

interface AddPlantFormProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddPlantForm({ visible, onClose }: AddPlantFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Moja rastlina');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleTitlePress = () => {
    setIsEditing(true);
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
  };

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== 'granted' || galleryPermission.status !== 'granted') {
      Alert.alert(
        'Permissions required',
        'Please grant camera and gallery permissions to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    if (!(await requestPermissions())) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    if (!(await requestPermissions())) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleImagePress = () => {
    Alert.alert(
      'Naloži fotografijo',
      'Izberi med opcijami',
      [
        { text: 'Posnami fotografijo', onPress: takePhoto },
        { text: 'Izberi iz galerije', onPress: pickImage },
        { text: 'Prekliči', style: 'cancel' },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <IconSymbol name="chevron.left" size={24} color="#000" />
        <ThemedText>Nazaj</ThemedText>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
          {selectedImage ? (
            <Image 
              source={{ uri: selectedImage }} 
              alt="Selected plant image"
              style={styles.headerImage}
              size="full"
            />
          ) : (
            <IconSymbol
              size={310}
              color="#808080"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.headerIcon}
            />
          )}
        </TouchableOpacity>

        <ThemedView style={styles.titleContainer}>
          {isEditing ? (
            <TextInput
              value={title}
              onChangeText={setTitle}
              onBlur={handleTitleSubmit}
              onSubmitEditing={handleTitleSubmit}
              autoFocus
              style={styles.titleInput}
            />
          ) : (
            <ThemedText type="title" onPress={handleTitlePress}>
              {title}
            </ThemedText>
          )}
        </ThemedView>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerIcon: {
    color: '#808080',
    position: 'absolute',
  },
  titleContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  titleInput: {
    paddingBottom: 16,
    fontSize: 32,
    fontWeight: '700',
    padding: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    padding: 10,
    color: '#000',
  },
});
