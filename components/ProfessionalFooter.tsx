import { View, Text, TouchableOpacity } from "react-native";

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  badge?: number;
  onPress: () => void;
}

interface ProfessionalFooterProps {
  menuItems: MenuItem[];
  activeItem?: string;
}

const ProfessionalFooter = ({ menuItems, activeItem }: ProfessionalFooterProps) => {
  return (
    <View className="border-t border-gray-200 bg-white px-4 py-3">
      <View className="flex flex-row justify-around items-center">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className="flex-1 items-center justify-center py-3 active:opacity-70"
            activeOpacity={0.7}
          >
            <View className="relative">
              <Text
                className={`text-2xl ${
                  activeItem === item.id ? "opacity-100" : "opacity-60"
                }`}
              >
                {item.icon}
              </Text>
              {item.badge && item.badge > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                  <Text className="text-white text-xs font-JakartaBold">
                    {item.badge > 9 ? "9+" : item.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              className={`text-xs font-JakartaSemiBold mt-1 ${
                activeItem === item.id
                  ? "text-black"
                  : "text-gray-500"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfessionalFooter;
