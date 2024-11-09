import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type {
  CallingCode,
  Country,
  CountryCode,
  CountryFilterProps,
  CountryPickerModalProps,
  Region,
  Subregion,
  Translation,
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
  renderDropdownImage?: JSX.Element;
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
}

export interface PhoneInputRefType {
  getValue: () => string;
  getCountryCode: () => string;
  isValidNumber: (number: string) => boolean;
}

declare const PhoneInput: ForwardRefExoticComponent<
  PhoneInputProps & RefAttributes<PhoneInputRefType>
>;

export default PhoneInput;
