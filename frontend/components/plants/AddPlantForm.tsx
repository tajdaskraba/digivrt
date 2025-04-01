import { StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView, Modal, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from "@/components/ui/image";
import { HStack } from '@/components/ui/hstack';

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

  return (
      <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={onClose}
      >
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <IconSymbol name="arrow.left" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <HStack space="md">
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
              {selectedImage && (
                  <Image source={{ uri: selectedImage }} alt="Plant Image" style={styles.image} />
              )}
            </HStack>
          </ThemedView>
        </ScrollView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    elevation: 4,
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  titleInput: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});