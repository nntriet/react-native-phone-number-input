<div align="center">
  <h1>📱 React Native Phone Number Input</h1>
  <p><strong>A powerful, customizable phone input component for React Native</strong></p>

  <div>
    <img src="./gif/Phone_Number_Input_Layout_1.gif" height="400" style="margin: 0 10px; border-radius: 10px; box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
    <img src="./gif/Phone_Number_Input_Layout_2.gif" height="400" style="margin: 0 10px; border-radius: 10px; box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
  </div>

  <p>
    <a href="https://www.npmjs.com/package/@linhnguyen96114/react-native-phone-input">
      <img src="https://img.shields.io/npm/v/@linhnguyen96114/react-native-phone-input.svg" alt="npm version">
    </a>
    <a href="https://github.com/linhnguyen-gt/react-native-phone-number-input/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/linhnguyen-gt/react-native-phone-number-input.svg" alt="license">
    </a>
  </p>
</div>

## ✨ Features

- 📱 Cross-platform support (iOS & Android)
- 🎨 Highly customizable UI
- 🔍 Built-in country search
- ✅ Google LibPhoneNumber validation
- 🎯 TypeScript support
- 🔄 Two flexible layouts
- 🏳️ Country emoji flags support
- 📞 Automatic country detection
- 🎨 Dark theme support
- 🔧 Extensive API

## 🚀 Installation

```bash
Using npm
npm i @linhnguyen96114/react-native-phone-input
Using yarn
yarn add @linhnguyen96114/react-native-phone-input
```
## 💡 Usage

```tsx
import PhoneInput, {
  type PhoneInputRefType,
} from '@linhnguyen96114/react-native-phone-input';

const App = () => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInputRefType>(null);
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          {showMessage && (
            <View style={styles.message}>
              <Text>Country Code : {countryCode}</Text>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? 'true' : 'false'}</Text>
            </View>
          )}
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            disabled={disabled}
            withDarkTheme
            withShadow
            autoFocus
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
              let getNumberAfterPossiblyEliminatingZero =
                phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
              console.log(getNumberAfterPossiblyEliminatingZero);
            }}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, disabled ? {} : styles.redColor]}
            onPress={() => {
              setDisabled(!disabled);
            }}
          >
            <Text style={styles.buttonText}>
              {disabled ? 'Activate' : 'Disable'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </React.Fragment>
  );
};
```

## 🛠️ Props

| Prop                       | Type                         | Description                          |
|----------------------------|------------------------------|--------------------------------------|
| `withDarkTheme`            | `boolean`                    | Enable dark theme                    |
| `withShadow`               | `boolean`                    | Add shadow effect                    |
| `autoFocus`                | `boolean`                    | Auto focus input                     |
| `defaultCode`              | `CountryCode`                | Default country code                 |
| `value`                    | `string`                     | Controlled input value               |
| `defaultValue`             | `string`                     | Default phone number value           |
| `disabled`                 | `boolean`                    | Disable input                        |
| `disableArrowIcon`         | `boolean`                    | Hide the dropdown arrow icon         |
| `placeholder`              | `string`                     | Input placeholder text               |
| `onChangeCountry`          | `(country: Country) => void` | Callback when country changes        |
| `onChangeText`             | `(text: string) => void`     | Callback when input text changes     |
| `onChangeFormattedText`    | `(text: string) => void`     | Callback with formatted phone number |
| `onBlur`                   | `() => void`                 | Callback when input loses focus      |
| `onFocus`                  | `() => void`                 | Callback when input gains focus      |
| `renderDropdownImage`      | `JSX.Element`                | Custom dropdown icon component       |
| `containerStyle`           | `StyleProp<ViewStyle>`       | Container style                      |
| `textContainerStyle`       | `StyleProp<ViewStyle>`       | Text input container style           |
| `textInputProps`           | `TextInputProps`             | Additional TextInput props           |
| `textInputStyle`           | `StyleProp<TextStyle>`       | Text input style                     |
| `codeTextStyle`            | `StyleProp<TextStyle>`       | Country code text style              |
| `flagButtonStyle`          | `StyleProp<ViewStyle>`       | Flag button container style          |
| `countryPickerButtonStyle` | `StyleProp<ViewStyle>`       | Country picker button style          |
| `layout`                   | `"first" \| "second"`        | Layout style                         |
| `filterProps`              | `CountryFilterProps`         | Country filter props                 |
| `countryPickerProps`       | `CountryPickerModalProps`    | Country picker modal props           |
| `flagSize`                 | `number`                     | Size of the country flag             |

## 🔧 Methods

| Method                                  | Return Type                                    | Description                                                                                                                   |
|-----------------------------------------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `getCountryCode`                        | `CountryCode`                                  | Get the currently selected country code (e.g., 'US', 'IN')                                                                    |
| `getCallingCode`                        | `CallingCode \| undefined`                     | Get the calling code for the selected country (e.g., '1', '91')                                                               |
| `isValidNumber`                         | `boolean`                                      | Validate if the provided phone number is valid for the selected country                                                       |
| `getNumberAfterPossiblyEliminatingZero` | `{ number: string; formattedNumber: string; }` | Get the phone number with leading zero removed if present. Returns both the raw number and formatted number with country code |

> **Note**: These methods are accessible via a ref attached to the PhoneInput component.

### Example usage:
```tsx
const phoneInput = useRef<PhoneInputRefType>(null);

// Get the current country code
const countryCode = phoneInput.current?.getCountryCode();

// Check if number is valid
const isValid = phoneInput.current?.isValidNumber('+1234567890');

// Get number without leading zero
const { number, formattedNumber } = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
```

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) to learn about our development process.

## 📝 License

This project is [MIT](LICENSE) licensed.

---

 <p>
    Fork from <a href="https://github.com/garganurag893/react-native-phone-number-input">garganurag893/react-native-phone-number-input</a>
    <br/>
    Maintained with ❤️ by <a href="https://github.com/linhnguyen-gt">Linh Nguyen</a>
</p>
