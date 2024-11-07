import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { TextInputProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  CountryCode,
  CallingCode,
  Country,
} from 'react-native-country-picker-modal';
import { CountryFilterProps } from 'react-native-country-picker-modal/lib/CountryFilter';

declare const PhoneInput: ForwardRefExoticComponent<
  PhoneInputProps & RefAttributes<PhoneInputRefType>
>;

export default PhoneInput;

export function isValidNumber(
  number: string,
  countryCode: CountryCode
): boolean;
