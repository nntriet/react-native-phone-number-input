import { PhoneNumberUtil } from 'google-libphonenumber';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import {
  CountryModalProvider,
  DEFAULT_THEME,
  Flag,
  getCallingCode,
  type CallingCode,
  type Country,
  type CountryCode,
} from './countryPickerModal';
import type { CountryFilterProps } from './countryPickerModal/CountryFilter';
import CountryPicker, {
  type CountryPickerProps,
} from './countryPickerModal/CountryPicker';
import styles from './styles';

const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';
const phoneUtil = PhoneNumberUtil.getInstance();

export type PhoneInputProps = {
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
  countryPickerProps?: CountryPickerProps;
  flagSize?: number;
};

export type PhoneInputRefType = {
  getCountryCode: () => CountryCode;
  getCallingCode: () => CallingCode | undefined;
  isValidNumber: (number: string) => boolean;
  getNumberAfterPossiblyEliminatingZero: () => {
    number: string;
    formattedNumber: string;
  };
};

const PhoneInput = forwardRef<PhoneInputRefType, PhoneInputProps>(
  (props, ref) => {
    const [code, setCode] = useState<string | undefined>(
      props.defaultCode ? undefined : '91'
    );
    const [number, setNumber] = useState<string>(
      props.value || props.defaultValue || ''
    );
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<CountryCode>(
      props.defaultCode || 'IN'
    );
    const [disabled, setDisabled] = useState<boolean>(props.disabled || false);

    useEffect(() => {
      const loadDefaultCode = async () => {
        if (props.defaultCode) {
          const callingCode = await getCallingCode(props.defaultCode);
          setCode(callingCode);
        }
      };
      loadDefaultCode();
    }, [props.defaultCode]);

    useEffect(() => {
      if (props.disabled !== disabled) {
        if ((props.value || props.value === '') && props.value !== number) {
          setDisabled(props.disabled || false);
          setNumber(props.value);
        }
      }
    }, [props.disabled, props.value]);

    const onSelect = (country: Country) => {
      setCountryCode(country.cca2);
      setCode(country.callingCode[0]);

      if (props.onChangeFormattedText) {
        if (country.callingCode[0]) {
          props.onChangeFormattedText(`+${country.callingCode[0]}${number}`);
        } else {
          props.onChangeFormattedText(number);
        }
      }

      if (props.onChangeCountry) {
        props.onChangeCountry(country);
      }
    };

    const onChangeText = (text: string) => {
      setNumber(text);
      if (props.onChangeText) {
        props.onChangeText(text);
      }
      if (props.onChangeFormattedText) {
        if (code) {
          props.onChangeFormattedText(
            text.length > 0 ? `+${code}${text}` : text
          );
        } else {
          props.onChangeFormattedText(text);
        }
      }
    };

    const renderDropdownImage = () => {
      return (
        <Image
          source={{ uri: dropDown }}
          resizeMode="contain"
          style={styles.dropDownImage}
        />
      );
    };

    const renderFlagButton = () => {
      const { layout = 'first', flagSize } = props;
      if (layout === 'first') {
        return (
          <Flag
            countryCode={countryCode}
            flagSize={flagSize || DEFAULT_THEME.flagSize}
          />
        );
      }
      return <View />;
    };

    useImperativeHandle(ref, () => ({
      getCountryCode: () => countryCode,
      getCallingCode: () => code,
      isValidNumber: (phoneNumber: string) => {
        try {
          const parsedNumber = phoneUtil.parse(phoneNumber, countryCode);
          return phoneUtil.isValidNumber(parsedNumber);
        } catch (err) {
          return false;
        }
      },
      getNumberAfterPossiblyEliminatingZero: () => {
        let currentNumber = number;
        if (currentNumber.length > 0 && currentNumber.startsWith('0')) {
          currentNumber = currentNumber.substr(1);
        }
        return {
          number: currentNumber,
          formattedNumber: code ? `+${code}${currentNumber}` : currentNumber,
        };
      },
    }));

    const {
      withShadow,
      withDarkTheme,
      codeTextStyle,
      textInputProps,
      textInputStyle,
      autoFocus,
      placeholder,
      disableArrowIcon,
      flagButtonStyle,
      containerStyle,
      textContainerStyle,
      renderDropdownImage: customDropdownImage,
      countryPickerProps = {},
      filterProps = {},
      countryPickerButtonStyle,
      layout = 'first',
    } = props;

    return (
      <CountryModalProvider>
        <View
          style={[
            styles.container,
            withShadow && styles.shadow,
            containerStyle,
          ]}
        >
          <TouchableOpacity
            style={[
              styles.flagButtonView,
              layout === 'second' && styles.flagButtonExtraWidth,
              flagButtonStyle,
              countryPickerButtonStyle,
            ]}
            disabled={disabled}
            onPress={() => setModalVisible(true)}
          >
            <CountryPicker
              onSelect={onSelect}
              withEmoji
              withFilter
              withFlag
              filterProps={filterProps}
              countryCode={countryCode}
              withCallingCode
              disableNativeModal={disabled}
              visible={modalVisible}
              // theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
              renderFlagButton={renderFlagButton}
              onClose={() => setModalVisible(false)}
              {...countryPickerProps}
            />
            {code && layout === 'second' && (
              <Text style={[styles.codeText, codeTextStyle]}>{`+${code}`}</Text>
            )}
            {!disableArrowIcon && (
              <>{customDropdownImage || renderDropdownImage()}</>
            )}
          </TouchableOpacity>
          <View style={[styles.textContainer, textContainerStyle]}>
            {code && layout === 'first' && (
              <Text style={[styles.codeText, codeTextStyle]}>{`+${code}`}</Text>
            )}
            <TextInput
              style={[styles.numberText, textInputStyle]}
              placeholder={placeholder || 'Phone Number'}
              onChangeText={onChangeText}
              value={number}
              editable={!disabled}
              selectionColor="black"
              keyboardAppearance={withDarkTheme ? 'dark' : 'default'}
              keyboardType="number-pad"
              autoFocus={autoFocus}
              {...textInputProps}
            />
          </View>
        </View>
      </CountryModalProvider>
    );
  }
);

export default PhoneInput;

export const isValidNumber = (number: string, countryCode: string): boolean => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};
