import { View, Text } from "react-native";

interface ProfessionalBadgeProps {
  text: string;
  variant?: "default" | "success" | "danger" | "warning" | "info" | "primary";
  size?: "sm" | "md" | "lg";
  icon?: string;
  className?: string;
}

const ProfessionalBadge = ({
  text,
  variant = "default",
  size = "md",
  icon,
  className,
}: ProfessionalBadgeProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 border border-green-300";
      case "danger":
        return "bg-red-100 border border-red-300";
      case "warning":
        return "bg-yellow-100 border border-yellow-300";
      case "info":
        return "bg-blue-100 border border-blue-300";
      case "primary":
        return "bg-black text-white";
      case "default":
      default:
        return "bg-gray-100 border border-gray-300";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "success":
        return "text-green-700";
      case "danger":
        return "text-red-700";
      case "warning":
        return "text-yellow-700";
      case "info":
        return "text-blue-700";
      case "primary":
        return "text-white";
      case "default":
      default:
        return "text-gray-700";
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 rounded-full";
      case "lg":
        return "px-4 py-2 rounded-xl";
      case "md":
      default:
        return "px-3 py-1.5 rounded-lg";
    }
  };

  return (
    <View
      className={`flex flex-row items-center gap-1.5 ${getSizeStyle()} ${getVariantStyle()} ${className}`}
    >
      {icon && <Text className="text-sm">{icon}</Text>}
      <Text
        className={`font-JakartaSemiBold ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
        } ${getTextColor()}`}
      >
        {text}
      </Text>
    </View>
  );
};

export default ProfessionalBadge;
