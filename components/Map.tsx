import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, ScrollView, Image } from "react-native";

import { icons } from "@/constants";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver } from "@/types/type";

// Mock drivers data
const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    first_name: "James",
    last_name: "Wilson",
    email: "james@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=1",
    car_seats: 4,
    car_model: "Toyota Camry",
    car_year: 2022,
    car_color: "Silver",
    car_image_url: "https://via.placeholder.com/150?text=Camry",
    rating: 4.8,
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=2",
    car_seats: 4,
    car_model: "Honda Accord",
    car_year: 2023,
    car_color: "Black",
    car_image_url: "https://via.placeholder.com/150?text=Accord",
    rating: 4.9,
    latitude: 40.7250,
    longitude: -74.0100,
  },
  {
    id: 3,
    first_name: "Mike",
    last_name: "Taylor",
    email: "mike@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=3",
    car_seats: 5,
    car_model: "Tesla Model 3",
    car_year: 2023,
    car_color: "White",
    car_image_url: "https://via.placeholder.com/150?text=Tesla",
    rating: 4.7,
    latitude: 40.7050,
    longitude: -74.0150,
  },
];

const Map = () => {
  const { userLatitude, userLongitude } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDrivers(MOCK_DRIVERS as any);
  }, []);

  if (loading || (!userLatitude && !userLongitude)) {
    return (
      <View className="w-full h-64 bg-gray-100 rounded-3xl flex items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="w-full bg-white rounded-3xl overflow-hidden shadow-md" style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    }}>
      {/* Map Background */}
      <View className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
        {/* Center Marker */}
        <View className="absolute w-10 h-10 rounded-full bg-black opacity-10" />
        <View className="absolute w-6 h-6 rounded-full bg-black flex items-center justify-center">
          <View className="w-2 h-2 rounded-full bg-white" />
        </View>

        {/* Location Info */}
        <View className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 shadow-md">
          <Text className="text-xs font-JakartaRegular text-gray-600">
            Your Location
          </Text>
          <Text className="text-xs font-JakartaBold text-gray-900 mt-0.5">
            {Math.round(Math.random() * 50)}+ km away
          </Text>
        </View>

        {/* Driver Count Badge */}
        <View className="absolute top-4 right-4 bg-black rounded-xl px-4 py-2 shadow-md">
          <Text className="text-sm font-JakartaBold text-white">
            {MOCK_DRIVERS.length} Drivers
          </Text>
        </View>
      </View>

      {/* Drivers List */}
      <View className="bg-white px-4 py-4 border-t border-gray-100">
        <View className="flex flex-row items-center justify-between mb-4">
          <Text className="text-base font-JakartaBold text-gray-900">
            Available Near You
          </Text>
          <Text className="text-xs font-JakartaRegular text-gray-500">
            See all
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        >
          {MOCK_DRIVERS.map((driver) => (
            <View
              key={driver.id}
              className={`mr-3 rounded-2xl p-4 border-2 w-40 ${
                selectedDriver === +driver.id
                  ? "border-black bg-black/5"
                  : "border-gray-200 bg-white"
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: selectedDriver === +driver.id ? 0.1 : 0.05,
                shadowRadius: 4,
                elevation: selectedDriver === +driver.id ? 2 : 1,
              }}
            >
              {/* Driver Image */}
              <Image
                source={{ uri: driver.profile_image_url }}
                className="w-12 h-12 rounded-full mb-3"
              />

              {/* Driver Info */}
              <Text className="text-sm font-JakartaBold text-gray-900 mb-1">
                {driver.first_name}
              </Text>
              <Text className="text-xs font-JakartaRegular text-gray-600 mb-3">
                {driver.car_model || "Premium"}
              </Text>

              {/* Rating */}
              <View className="flex flex-row items-center gap-1">
                <Text className="text-sm font-JakartaBold text-gray-900">
                  {driver.rating}
                </Text>
                <Text className="text-lg">⭐</Text>
              </View>

              {/* Seats */}
              <Text className="text-xs font-JakartaRegular text-gray-600 mt-2">
                {driver.car_seats || 4} seats available
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Map;
