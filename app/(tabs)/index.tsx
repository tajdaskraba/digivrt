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

const componentDescriptions: Record<string, string> = {
  USB1: "USB (tip C) konektor - preko njega lahko digivrt napajamo, uporabimo pa ga tudi za nalaganje kode.",
  P1: "P1 - konektor, kamor lahko povežemo baterijo, če ne uporabljamo USB napajanja.",
  U1: "U1 - mikrokrmilnik ESP32 S3 - prebira informacije s senzorjev in jih brezžično pošilja v aplikacijo.",
  ENABLE: "ENABLE stikalo - resetira kodo, ki je na mikrokontrolerju.",
  BOOT: "BOOT stikalo - pritisk pred vklopom omogoči nalaganje nove kode.",
  U3: "U3 - regulator napetosti. Pretvarja 5V napetost, ki je prejme USB v 3,7 V, ki jo uporabljajo senzorji in mikrokrmilnik.",
  I2C: "I2C - konektor, kamor lahko povežemo dodatne senzorje (npr. za temperature zraka, pritisk...)",
  P2: "P2 - konektor za fotoupor, senzor s katerim lahko merimo svetlobo.",
  MOIST: "MOIST - konektor, ki ga lahko uporabimo, da vrednost senzorja preberemo direktno z drugim mikrokrmilnikom.",
  LED: "LED - RGB led dioda, ki sporoča stanje vlage v zemlji (rdeča: presuho, zelena: na meji, modra: prevelika količina vlage).",
  AKTUATOR: "AKTUATOR - sem lahko povežemo ventil ali črpalko, ki lahko rastlino avtomatsko zalije.",
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
      
      <View style={styles.imageWrapper}>
        <Image
          source={selectedComponent ? componentImages[selectedComponent] : require('@/assets/images/PCB/PCB-white.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.textContainer}>
        <ThemedText>
          {selectedComponent 
            ? componentDescriptions[selectedComponent]
            : "Izberi komponento in spoznaj njeno nalogo."}
        </ThemedText>
      </View>


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
  image: {
    width: 330,
    height: 330,
    resizeMode: 'contain',
  },
  textContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginTop: 24,
    width: '100%',
    minHeight: 60,
    justifyContent: 'center',
  },
});