import React from 'react';
import { Dimensions, StyleSheet, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionIcon, AccordionContent, AccordionContentText } from '@/components/ui/accordion';
import { ChevronUpIcon, ChevronDownIcon } from '@/components/ui/icon';
import { useAppTheme } from '@/context/theme-context';

const screenWidth = Dimensions.get('window').width;

export default function SettingsTab() {
  const { theme, toggleTheme } = useAppTheme();
  const isDarkMode = theme === 'dark';

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
        className="border border-outline-100"
        style={styles.accordion}
      >
        <AccordionItem value="dark-mode">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => (
                <>
                  <AccordionTitleText>Temni način</AccordionTitleText>
                  <AccordionIcon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} className="ml-3" />
                </>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <ThemedView style={styles.settingRow}>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#007A5A' }}
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
