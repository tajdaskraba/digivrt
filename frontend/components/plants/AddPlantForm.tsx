import { Dimensions, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HStack } from '@/components/ui/hstack';

const screenWidth = Dimensions.get('window').width;
const backgroundColor = '#000';

interface AddPlantFormProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddPlantForm({ visible, onClose }: AddPlantFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Moja rastlina');

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
    width: screenWidth - 32,   
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: '700',
  },
});