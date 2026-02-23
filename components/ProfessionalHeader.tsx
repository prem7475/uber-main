import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";

interface ProfessionalHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  variant?: "dark" | "light" | "gradient";
  gradient?: {
    from: string;
    to: string;
  };
}

const ProfessionalHeader = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  variant = "dark",
  gradient = { from: "from-black", to: "to-gray-900" },
}: ProfessionalHeaderProps) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const getHeaderStyle = () => {
    switch (variant) {
      case "light":
        return "bg-white border-b border-gray-200";
      case "gradient":
        return `bg-gradient-to-b ${gradient.from} ${gradient.to} shadow-xl`;
      case "dark":
      default:
        return "bg-gradient-to-b from-black via-gray-900 to-black shadow-2xl";
    }
  };

  const getTitleColor = () => {
    return variant === "light" ? "text-gray-900" : "text-white";
  };

  const getSubtitleColor = () => {
    return variant === "light" ? "text-gray-600" : "text-gray-300";
  };

  return (
    <View className={`${getHeaderStyle()} px-6 pt-4 pb-8`}>
      <View className="flex flex-row items-center justify-between">
        {showBack ? (
          <TouchableOpacity
            onPress={handleBackPress}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:opacity-70"
            activeOpacity={0.7}
          >
            <Text className={`text-${variant === "light" ? "gray" : "white"}-600 text-xl font-bold`}>
              ←
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <View className="flex-1 mx-4">
          <Text
            className={`text-3xl font-JakartaBold ${getTitleColor()} leading-tight`}
            numberOfLines={2}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              className={`text-sm font-JakartaRegular ${getSubtitleColor()} mt-1 leading-5`}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {rightAction ? (
          <TouchableOpacity
            onPress={rightAction.onPress}
            className={`w-10 h-10 rounded-full ${
              variant === "light" ? "bg-gray-100" : "bg-white/10"
            } flex items-center justify-center active:opacity-70`}
            activeOpacity={0.7}
          >
            <Text className="text-xl">{rightAction.icon}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default ProfessionalHeader;
