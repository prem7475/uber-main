import { View, ActivityIndicator, Text } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = "large",
  color = "#000000",
  message,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const container = fullScreen
    ? "flex-1 justify-center items-center bg-white/50 backdrop-blur"
    : "justify-center items-center py-12";

  return (
    <View className={container}>
      <View className="items-center gap-4">
        <View className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 flex items-center justify-center">
          <ActivityIndicator size={size} color={color} />
        </View>
        {message && (
          <Text className="text-gray-600 font-JakartaMedium text-center">{message}</Text>
        )}
      </View>
    </View>
  );
};

export default LoadingSpinner;
