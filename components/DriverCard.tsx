import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  const driverName = item.first_name && item.last_name 
    ? `${item.first_name} ${item.last_name}`
    : item.title || "Driver";
  
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`rounded-3xl mb-4 overflow-hidden transition-all ${
        selected === item.id ? "bg-black" : "bg-white border border-gray-200"
      }`}
      style={{
        shadowColor: selected === item.id ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: selected === item.id ? 0.15 : 0,
        shadowRadius: 12,
        elevation: selected === item.id ? 4 : 1,
      }}
    >
      <View className="flex flex-row items-center p-5 gap-4">
        {/* Driver Photo */}
        <Image
          source={{ uri: item.profile_image_url }}
          className="w-16 h-16 rounded-full"
        />

        {/* Driver Info */}
        <View className="flex-1 flex flex-col justify-center">
          <View className="flex flex-row items-center justify-start mb-2">
            <Text className={`text-lg font-JakartaBold ${
              selected === item.id ? "text-white" : "text-gray-900"
            }`}>
              {driverName}
            </Text>

            <View className="flex flex-row items-center gap-1 ml-3 bg-yellow-50 px-2 py-1 rounded-full">
              <Text className="text-yellow-600 text-sm font-JakartaBold">
                ⭐ {item.rating || 5.0}
              </Text>
            </View>
          </View>

          <View className={`flex flex-row items-center justify-start gap-3 text-sm ${
            selected === item.id ? "text-white" : "text-gray-600"
          }`}>
            <View className="flex flex-row items-center gap-1">
              <Image source={icons.dollar} className="w-4 h-4" tintColor={selected === item.id ? "#fff" : "#6B7280"} />
              <Text className={`font-JakartaSemiBold ${
                selected === item.id ? "text-white" : "text-gray-900"
              }`}>
                ${item.price || "0"}
              </Text>
            </View>

            <View className={`w-1 h-1 rounded-full ${
              selected === item.id ? "bg-white/40" : "bg-gray-300"
            }`} />

            <Text className={`font-JakartaRegular ${
              selected === item.id ? "text-white" : "text-gray-600"
            }`}>
              {formatTime(item.time || 0)} away
            </Text>

            <View className={`w-1 h-1 rounded-full ${
              selected === item.id ? "bg-white/40" : "bg-gray-300"
            }`} />

            <Text className={`font-JakartaRegular ${
              selected === item.id ? "text-white" : "text-gray-600"
            }`}>
              {item.car_seats} seats
            </Text>
          </View>
        </View>

        {/* Car Image */}
        <Image
          source={{ uri: item.car_image_url }}
          className="h-16 w-16"
          resizeMode="contain"
          style={{
            opacity: 0.8,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
