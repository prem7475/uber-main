import { View, Text, TouchableOpacity } from "react-native";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  actionText?: string;
  onActionPress?: () => void;
  variant?: "default" | "minimal" | "card";
  fullScreen?: boolean;
}

const EmptyState = ({
  icon,
  title,
  subtitle,
  actionText,
  onActionPress,
  variant = "default",
  fullScreen = true,
}: EmptyStateProps) => {
  const getContainerStyle = () => {
    if (fullScreen) return "flex-1 justify-center items-center px-6";
    return "items-center py-16 px-6";
  };

  const getCardStyle = () => {
    switch (variant) {
      case "minimal":
        return "bg-transparent";
      case "card":
        return "bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border-2 border-gray-200";
      case "default":
      default:
        return "bg-white rounded-3xl p-8";
    }
  };

  return (
    <View className={getContainerStyle()}>
      <View
        className={`items-center gap-4 ${getCardStyle()} w-full`}
        style={{
          shadowColor:
            variant === "card" ? "#000" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: variant === "card" ? 0.1 : 0,
          shadowRadius: 8,
          elevation: variant === "card" ? 3 : 0,
        }}
      >
        {/* Icon Container */}
        <View className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-300">
          <Text className="text-5xl">{icon}</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-JakartaBold text-gray-900 text-center leading-tight">
          {title}
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-600 font-JakartaRegular text-center leading-6 px-2">
          {subtitle}
        </Text>

        {/* Action Button */}
        {actionText && onActionPress && (
          <TouchableOpacity
            onPress={onActionPress}
            className="mt-6 bg-gradient-to-r from-black to-gray-800 rounded-2xl px-8 py-3 active:opacity-80 shadow-lg border-2 border-gray-900"
            activeOpacity={0.85}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text className="text-white font-JakartaBold text-center">
              {actionText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EmptyState;
