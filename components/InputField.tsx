import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Animated,
} from "react-native";
import { useState } from "react";

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
  error,
  success,
  disabled = false,
  ...props
}: InputFieldProps & { error?: string; success?: boolean; disabled?: boolean }) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return "border-red-500";
    if (success) return "border-green-500";
    if (isFocused) return "border-blue-500";
    return "border-gray-200";
  };

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-50";
    if (isFocused) return "bg-white";
    return "bg-gray-50";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`w-full mb-5 ${className}`}>
          {label && (
            <View className="flex flex-row items-center justify-between mb-3">
              <Text
                className={`text-sm font-JakartaSemiBold ${
                  disabled ? "text-gray-400" : "text-gray-800"
                } ${labelStyle}`}
              >
                {label}
              </Text>
              {success && <Text className="text-green-600 text-xs font-JakartaSemiBold">✓ Valid</Text>}
            </View>
          )}

          <View
            className={`flex flex-row justify-start items-center ${getBackgroundColor()} rounded-xl border-2 ${getBorderColor()} px-4 py-3 transition-colors ${containerStyle}`}
            style={{
              shadowColor: isFocused ? "#3B82F6" : "#000",
              shadowOffset: { width: 0, height: isFocused ? 4 : 1 },
              shadowOpacity: isFocused ? 0.15 : 0.05,
              shadowRadius: isFocused ? 8 : 4,
              elevation: isFocused ? 4 : 1,
            }}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-5 h-5 mr-3 ${iconStyle}`}
                tintColor={isFocused ? "#3B82F6" : disabled ? "#D1D5DB" : "#9CA3AF"}
              />
            )}
            <TextInput
              className={`rounded-xl py-2 flex-1 font-JakartaMedium text-base ${
                disabled
                  ? "text-gray-400 placeholder:text-gray-300"
                  : "text-gray-900 placeholder:text-gray-400"
              } ${inputStyle}`}
              placeholderTextColor={disabled ? "#D1D5DB" : "#D1D5DB"}
              secureTextEntry={secureTextEntry}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              editable={!disabled}
              {...props}
            />
          </View>

          {error && (
            <View className="flex flex-row items-center gap-2 mt-2 px-2">
              <Text className="text-red-500 text-sm">⚠️</Text>
              <Text className="text-red-500 font-JakartaMedium text-xs">{error}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
