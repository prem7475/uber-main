import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full mb-5">
          {label && (
            <Text className={`text-base font-JakartaSemiBold mb-3 text-gray-800 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center bg-gray-100 rounded-2xl border border-gray-200 px-4 ${containerStyle}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            {icon && (
              <Image 
                source={icon} 
                className={`w-5 h-5 mr-3 ${iconStyle}`}
                tintColor="#9CA3AF"
              />
            )}
            <TextInput
              className={`rounded-2xl py-4 flex-1 font-JakartaMedium text-base text-gray-900 placeholder:text-gray-400 ${inputStyle}`}
              placeholderTextColor="#D1D5DB"
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
