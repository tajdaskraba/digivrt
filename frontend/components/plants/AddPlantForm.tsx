import { Alert, Dimensions, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, View, ViewStyle, TextStyle, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HStack } from '@/components/ui/hstack';
import { useAppTheme } from '@/context/theme-context';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

interface AddPlantFormProps {
  visible: boolean;
  onClose: () => void;
}

interface DynamicStyles {
  container: ViewStyle;
  topBar: ViewStyle;
  backButton: ViewStyle;
  titleContainer: ViewStyle;
  titleInput: TextStyle;
  imageContainer: ViewStyle;
  addImageButton: ViewStyle;
  addImageText: TextStyle;
}

export default function AddPlantForm({ visible, onClose }: AddPlantFormProps) {
  const { theme } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Moja rastlina');
  const [dynamicStyles, setDynamicStyles] = useState<DynamicStyles>({} as DynamicStyles);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setDynamicStyles(createDynamicStyles(theme));
  }, [theme]);

  const handleTitlePress = () => {
    setIsEditing(true);
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please grant camera permission to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
  
    return true;
  };
  
  
  const takePhoto = async () => {
    if (!(await requestCameraPermission())) return;
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
  
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };  

  const handleAddImage = () => {
    console.log('Add image pressed');
    takePhoto();
  };  

  const createDynamicStyles = (currentTheme: string): DynamicStyles => {
    const isDark = currentTheme === 'dark';
    
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
      },
      topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 48,
        paddingHorizontal: 16,
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
        elevation: 4,
      },
      backButton: {
        padding: 10,
      },
      titleContainer: {
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        width: screenWidth - 32,   
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: isDark ? '#333' : '#e0e0e0',
        borderRadius: 8,
      },
      titleInput: {
        fontSize: 32,
        fontWeight: '700',
        color: isDark ? '#fff' : '#000',
        padding: 0,
        margin: 0,
      },
      imageContainer: {
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        width: screenWidth - 32,
        height: 200,
        marginHorizontal: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: isDark ? '#333' : '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addImageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      addImageText: {
        marginTop: 8,
        color: isDark ? '#aaa' : '#666',
        fontSize: 16,
      }
    });
  };

  return (
      <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={onClose}
      >
        <View style={dynamicStyles.topBar}>
          <TouchableOpacity style={dynamicStyles.backButton} onPress={onClose}>
            <IconSymbol name="arrow.left" size={28} color={theme === 'dark' ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>

        <ScrollView style={dynamicStyles.container}>
          <ThemedView style={dynamicStyles.titleContainer}>
            <HStack space="md">
              {isEditing ? (
                  <TextInput
                      value={title}
                      onChangeText={setTitle}
                      onBlur={handleTitleSubmit}
                      onSubmitEditing={handleTitleSubmit}
                      autoFocus
                      style={dynamicStyles.titleInput}
                  />
              ) : (
                  <ThemedText type="title" onPress={handleTitlePress}>
                    {title}
                  </ThemedText>
              )}
            </HStack>
          </ThemedView>

          <TouchableOpacity 
            style={dynamicStyles.imageContainer}
            onPress={handleAddImage}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : (
              <View style={dynamicStyles.addImageButton}>
                <IconSymbol name="photo" size={48} color={theme === 'dark' ? '#aaa' : '#666'} />
                <ThemedText style={dynamicStyles.addImageText}>
                  Dodaj sliko
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Modal>
  );
}