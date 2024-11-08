import { memo } from 'react';
import { Text } from 'react-native';

const Emoji = memo(({ name }: { name: string }) => {
  const countryCode = name.replace('flag-', '').toUpperCase();
  const emoji = countryCode
    .split('')
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
  return <Text allowFontScaling={false}>{emoji}</Text>;
});

export { Emoji };
