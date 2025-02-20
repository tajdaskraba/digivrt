import React, { useState } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { DigiVrtAnimation } from '@/components/DigiVrtAnimation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from '@/components/ui/pressable';

const componentImages: Record<string, any> = {
  USB1: require('@/assets/images/PCB/PCB-USB1.png'),
  P1: require('@/assets/images/PCB/PCB-P1.png'),
  U1: require('@/assets/images/PCB/PCB-U1.png'),
  ENABLE: require('@/assets/images/PCB/PCB-ENABLE.png'),
  BOOT: require('@/assets/images/PCB/PCB-BOOT.png'),
  U3: require('@/assets/images/PCB/PCB-U3.png'),
  I2C: require('@/assets/images/PCB/PCB-I2C.png'),
  P2: require('@/assets/images/PCB/PCB-P2.png'),
  MOIST: require('@/assets/images/PCB/PCB-MOIST.png'),
  LED: require('@/assets/images/PCB/PCB-LED.png'),
  AKTUATOR: require('@/assets/images/PCB/PCB-AKTUATOR.png'),
};

const components = Object.keys(componentImages);

export default function HomeTab() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.rowContainer}>
        <ThemedText type="title">Komponente</ThemedText>
        <DigiVrtAnimation />
      </ThemedView>
      
      <FlatList
        data={components}
        horizontal
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.componentBox, selectedComponent === item && styles.selectedBox]}
            onPress={() => setSelectedComponent(item as string)}
          >
            <ThemedText>{item}</ThemedText>
          </Pressable>
        )}
      />
      
      <View style={styles.imageWrapper}>
        <Image
        source={selectedComponent ? componentImages[selectedComponent] : require('@/assets/images/PCB/PCB-white.png')}
        style={styles.slideshowImage}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'transparent',
    paddingTop: 112,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  rowContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  componentBox: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  selectedBox: {
    borderColor: '#007bff',
  },
  imageWrapper: {
    paddingTop: 8,
    width: 330,
    alignItems: 'center',
    marginVertical: 16,
  },
  slideshowImage: {
    width: 330,
    height: 330,
    resizeMode: 'contain',
  },
});