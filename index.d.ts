import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type {
  CallingCode,
  Country,
  CountryCode,
  CountryFilterProps,
  CountryPickerModalProps,
  Region,
  Subregion,
} from './src/countryPickerModal';

export interface PhoneInputProps {
  withDarkTheme?: boolean;
  withShadow?: boolean;
  autoFocus?: boolean;
  defaultCode?: CountryCode;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  disableArrowIcon?: boolean;
  placeholder?: string;
  onChangeCountry?: (country: Country) => void;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  renderDropdownImage?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  textInputStyle?: StyleProp<TextStyle>;
  codeTextStyle?: StyleProp<TextStyle>;
  flagButtonStyle?: StyleProp<ViewStyle>;
  countryPickerButtonStyle?: StyleProp<ViewStyle>;
  layout?: 'first' | 'second';
  filterProps?: CountryFilterProps;
  countryPickerProps?: CountryPickerModalProps;
  flagSize?: number;
  showCountryCode?: boolean;
}

export interface PhoneInputRefType {
  getCountryCode: () => CountryCode;
  getCallingCode: () => CallingCode | undefined;
  isValidNumber: (number: string) => boolean;
  getNumberAfterPossiblyEliminatingZero: () => {
    number: string;
    formattedNumber: string;
  };
}

declare const PhoneInput: ForwardRefExoticComponent<
  PhoneInputProps & RefAttributes<PhoneInputRefType>
>;

export default PhoneInput;
