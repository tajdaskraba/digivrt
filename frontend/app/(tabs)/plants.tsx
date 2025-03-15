import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import AddPlantForm from '@/components/plants/AddPlantForm';
import { AddIcon } from "@/components/ui/icon";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PlantsTab() {
  const [showAddPlant, setShowAddPlant] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const handleAddPlant = () => {
    setShowAddPlant(true);
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Moje rastline</ThemedText>
      </ThemedView>
      <Fab
        size="lg"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={handleAddPlant}
        style={[styles.plus, { marginBottom: tabBarHeight + 16 }]}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Dodaj rastlino</FabLabel>
      </Fab>

      {showAddPlant && (
        <AddPlantForm
          visible={showAddPlant}
          onClose={() => setShowAddPlant(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'transparent',
    paddingTop: 112,
    paddingRight: 32,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plus: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  }
});
