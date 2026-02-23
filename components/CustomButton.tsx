import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300";
    case "danger":
      return "bg-gradient-to-r from-red-500 to-red-600";
    case "success":
      return "bg-gradient-to-r from-green-500 to-green-600";
    case "outline":
      return "bg-transparent border-2 border-gray-400";
    case "ghost":
      return "bg-transparent";
    case "premium":
      return "bg-gradient-to-r from-blue-600 to-purple-600";
    default:
      return "bg-gradient-to-r from-black to-gray-800";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-700";
    case "danger":
      return "text-white";
    case "success":
      return "text-white";
    case "light":
      return "text-gray-600";
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
  loading = false,
  size = "lg",
  fullWidth = true,
  ...props
}: ButtonProps & { loading?: boolean; size?: "sm" | "md" | "lg"; fullWidth?: boolean }) => {
  const sizeStyles = {
    sm: "py-2 px-4 rounded-lg",
    md: "py-3 px-5 rounded-xl",
    lg: "py-4 px-6 rounded-2xl",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={`flex flex-row justify-center items-center gap-3
        ${getBgVariantStyle(bgVariant)}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-60" : ""}
        ${className}`}
      style={{
        shadowColor: bgVariant === "primary" || bgVariant === "premium" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: bgVariant === "primary" || bgVariant === "premium" ? 0.2 : 0,
        shadowRadius: 8,
        elevation: bgVariant === "primary" || bgVariant === "premium" ? 5 : 0,
      }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textVariant === "secondary" ? "#4B5563" : "#FFFFFF"}
        />
      ) : (
        <>
          {IconLeft && <IconLeft />}
          <Text
            className={`font-JakartaBold ${getTextVariantStyle(textVariant)} ${textSizes[size]}`}
            numberOfLines={1}
          >
            {title}
          </Text>
          {IconRight && <IconRight />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
