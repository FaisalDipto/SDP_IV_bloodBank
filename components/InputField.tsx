import { InputFieldProps } from "@/types/type";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className, // Not used with inline styling, but included if needed for refactoring
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ marginVertical: 8, width: "100%" }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "JakartaSemiBold",
            marginBottom: 12,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f5f5f5", // neutral-100
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: "#f5f5f5",
            paddingRight: 12,
          }}
        >
          {icon && (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                marginLeft: 16,
              }}
            />
          )}
          <TextInput
            secureTextEntry={secureTextEntry}
            style={{
              paddingVertical: 5, // reduced from p-4 (~16)
              paddingHorizontal: 12,
              fontFamily: "JakartaSemiBold",
              fontSize: 15,
              flex: 1,
              textAlign: "left",
            }}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
