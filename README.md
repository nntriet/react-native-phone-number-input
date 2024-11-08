<div align="center">
  <h1>📱 React Native Phone Number Input</h1>
  <p><strong>A powerful, customizable phone input component for React Native</strong></p>

  <div>
    <img src="./gif/Phone_Number_Input_Layout_1.gif" height="400" style="margin: 0 10px; border-radius: 10px; box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
    <img src="./gif/Phone_Number_Input_Layout_2.gif" height="400" style="margin: 0 10px; border-radius: 10px; box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
  </div>

  <p>
    <a href="https://www.npmjs.com/package/react-native-phone-number-input">
      <img src="https://img.shields.io/npm/v/react-native-phone-number-input.svg" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/react-native-phone-number-input">
      <img src="https://img.shields.io/npm/dm/react-native-phone-number-input.svg" alt="npm downloads">
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

bash
Using npm
npm install react-native-phone-number-input
Using yarn
yarn add react-native-phone-number-input

## 💡 Usage

```tsx
import PhoneInput from "react-native-phone-number-input";
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

| Prop | Type | Description |
|------|------|-------------|
| `defaultCode` | `CountryCode` | Default country code |
| `defaultValue` | `string` | Default phone number |
| `layout` | `"first" \| "second"` | Layout style |
| `withDarkTheme` | `boolean` | Enable dark theme |
| `withShadow` | `boolean` | Add shadow effect |
| `withFlag` | `boolean` | Show country flag |
| `autoFocus` | `boolean` | Auto focus input |
| `disabled` | `boolean` | Disable input |

[View all props →](./docs/PROPS.md)

## 🔧 Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getCountryCode` | `CountryCode` | Get selected country code |
| `getCallingCode` | `string` | Get country calling code |
| `isValidNumber` | `boolean` | Validate phone number |

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
