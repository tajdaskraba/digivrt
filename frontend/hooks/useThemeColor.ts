import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) return colorFromProps;

  const color = Colors[theme][colorName];
  const resolvedColor = typeof color === 'string' ? color : color?.[500];
  
  return resolvedColor ?? (theme === 'dark' ? Colors.dark.gray[200] : Colors.light.gray[200]);
}
