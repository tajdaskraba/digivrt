import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { colorScheme } from 'nativewind';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent, AccordionContentText } from '@/components/ui/accordion';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/ui/icon';

const THEME_STORAGE_KEY = 'user-theme-preference';
const screenWidth = Dimensions.get('window').width;


export default function SettingsTab() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    (async () => {
      await loadThemePreference();
    })();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        const isDark = savedTheme === 'dark';
        setIsDarkMode(isDark);
        colorScheme.set(isDark ? 'dark' : 'light');
      } else {
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
      colorScheme.set(newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Nastavitve</ThemedText>
        </ThemedView>

        <Accordion
            size="md"
            variant="unfilled"
            type="single"
            isCollapsible={true}
            className="border border-outline-200"
            style={styles.accordion}
        >
          <AccordionItem value="dark-mode">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => (
                    <>
                      <AccordionTitleText>Temni način</AccordionTitleText>
                      {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                          <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                      )}
                    </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <ThemedView style={styles.settingRow}>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: '#0a7ea4' }}
                    thumbColor={'#f4f3f4'}
                />
              </ThemedView>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion
            size="md"
            variant="unfilled"
            type="single"
            isCollapsible={true}
            isDisabled={false}
            className="m-5 border border-outline-200"
            style={styles.accordion}
        >
          <AccordionItem value="a">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => (
                    <>
                      <AccordionTitleText>
                        Pomoč
                      </AccordionTitleText>
                      {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                          <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                      )}
                    </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionContentText>
                Pomoč pride kmalu.
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    backgroundColor: 'transparent',
    paddingTop: 112,
    paddingRight: 32,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  accordion: {
    marginTop: 16,
    width: screenWidth - 32,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
});
