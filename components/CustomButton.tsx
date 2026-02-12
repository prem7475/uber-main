import { TouchableOpacity, Text, View } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-200";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-2 border-gray-400";
    default:
      return "bg-black";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-600";
    case "danger":
      return "text-white";
    case "success":
      return "text-white";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className={`w-full rounded-2xl py-4 px-6 flex flex-row justify-center items-center gap-3 
        ${getBgVariantStyle(bgVariant)} 
        ${disabled ? "opacity-50" : ""}
        ${className}`}
      style={{
        shadowColor: bgVariant === "primary" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: bgVariant === "primary" ? 0.15 : 0,
        shadowRadius: 8,
        elevation: bgVariant === "primary" ? 3 : 0,
      }}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
