import { View, Text, TouchableOpacity } from "react-native";

interface ProfessionalCardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outline" | "gradient";
  gradient?: {
    from: string;
    to: string;
  };
  children?: React.ReactNode;
  className?: string;
}

const ProfessionalCard = ({
  title,
  subtitle,
  icon,
  onPress,
  variant = "default",
  gradient = { from: "from-blue-50", to: "to-blue-100" },
  children,
  className,
}: ProfessionalCardProps) => {
  const getCardStyle = () => {
    switch (variant) {
      case "elevated":
        return "bg-white border-0 shadow-lg";
      case "outline":
        return "bg-white border-2 border-gray-200";
      case "gradient":
        return `bg-gradient-to-br ${gradient.from} ${gradient.to} border-2 ${
          gradient.from.includes("gray") ? "border-gray-300" : "border-blue-300"
        }`;
      case "default":
      default:
        return "bg-white border-2 border-gray-100";
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className={`rounded-3xl p-6 ${getCardStyle()} ${className}`}
        style={{
        shadowColor: variant === "elevated" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: variant === "elevated" ? 0.15 : 0,
        shadowRadius: 8,
        elevation: variant === "elevated" ? 4 : 0,
      }}
    >
      {(title || icon) && (
        <View className="flex flex-row items-center gap-3 mb-3">
          {icon && <Text className="text-2xl">{icon}</Text>}
          {title && (
            <Text className="text-lg font-JakartaBold text-gray-900 flex-1">
              {title}
            </Text>
          )}
        </View>
      )}

      {subtitle && (
        <Text className="text-sm font-JakartaRegular text-gray-600 mb-4">
          {subtitle}
        </Text>
      )}

      {children}
    </TouchableOpacity>
    );
  }

  return (
    <View
      className={`rounded-3xl p-6 ${getCardStyle()} ${className}`}
      style={{
        shadowColor: variant === "elevated" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: variant === "elevated" ? 0.15 : 0,
        shadowRadius: 8,
        elevation: variant === "elevated" ? 4 : 0,
      }}
    >
      {(title || icon) && (
        <View className="flex flex-row items-center gap-3 mb-3">
          {icon && <Text className="text-2xl">{icon}</Text>}
          {title && (
            <Text className="text-lg font-JakartaBold text-gray-900 flex-1">
              {title}
            </Text>
          )}
        </View>
      )}

      {subtitle && (
        <Text className="text-sm font-JakartaRegular text-gray-600 mb-4">
          {subtitle}
        </Text>
      )}

      {children}
    </View>
  );
};

export default ProfessionalCard;
