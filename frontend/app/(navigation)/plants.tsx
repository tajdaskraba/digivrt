import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import AddPlantForm from '@/components/plants/AddPlantForm';
import { AddIcon } from "@/components/ui/icon";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function PlantsTab() {
  const [showAddPlant, setShowAddPlant] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const iconColor = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const resolvedIconColor = typeof iconColor === 'string' ? iconColor : iconColor[500];

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
        style={[styles.fab, { marginBottom: tabBarHeight + 16 }, { borderColor: resolvedIconColor }]}
      >
        <FabIcon style={[styles.fabIcon, { color: resolvedIconColor }]} as={AddIcon} />
        <FabLabel style={styles.fabLabel}>
          <ThemedText>
            Dodaj rastlino
          </ThemedText>
        </FabLabel>
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
  fab: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderWidth: 2,
    borderRadius: 9999,
  },
  fabLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fabIcon: {
    fontSize: 24,
  }
});
