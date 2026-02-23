import { router } from "expo-router";
import { FlatList, View, Text, TouchableOpacity, Animated } from "react-native";
import { useState } from "react";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleSelectDriver = (driverId: number) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedDriver(driverId);
    });
  };

  const handleBookRide = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (selectedDriver) router.push("/(root)/book-ride");
    });
  };

  return (
    <RideLayout title="Choose Your Driver" snapPoints={["65%", "85%"]}>
      <View className="flex-1">
        {/* Header Info */}
        <View className="px-5 pb-6 border-b-2 border-gray-200 mb-4">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Text className="text-lg">🚗</Text>
            </View>
            <View className="flex-1">
              <Text className="font-JakartaBold text-gray-900 text-base">
                {drivers?.length} Drivers Available
              </Text>
              <Text className="text-xs font-JakartaRegular text-gray-600">
                Average rating: 4.8⭐
              </Text>
            </View>
          </View>

          {selectedDriver && (
            <View className="bg-green-50 border-2 border-green-300 rounded-2xl px-4 py-2">
              <Text className="text-green-700 text-xs font-JakartaSemiBold">
                ✓ Driver selected - Ready to book
              </Text>
            </View>
          )}
        </View>

        {/* Drivers List */}
        <FlatList
          data={drivers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelectDriver(item.id!)}
              activeOpacity={0.7}
              className={`mx-5 mb-4 rounded-3xl overflow-hidden border-2 ${
                selectedDriver === item.id
                  ? "border-black bg-black/5"
                  : "border-gray-200"
              }`}
            >
              <DriverCard
                item={item}
                selected={selectedDriver!}
                setSelected={() => handleSelectDriver(item.id!)}
              />
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Action Button */}
        <View className="px-5 py-6 border-t-2 border-gray-200 bg-white">
          {selectedDriver ? (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleBookRide}
                className="bg-gradient-to-r from-black to-gray-800 rounded-3xl py-5 items-center justify-center shadow-xl active:opacity-90 border-2 border-gray-700"
                activeOpacity={0.85}
              >
                <Text className="font-JakartaBold text-white text-lg">
                  ✅ Confirm & Book This Driver
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View className="bg-gray-100 rounded-3xl py-5 items-center justify-center border-2 border-gray-300">
              <Text className="font-JakartaBold text-gray-500 text-lg">
                👆 Select a Driver First
              </Text>
            </View>
          )}

          {/* Info Text */}
          <Text className="text-center text-gray-500 text-xs font-JakartaRegular mt-4">
            💡 Driver ratings and prices vary. Select based on your preference.
          </Text>
        </View>
      </View>
    </RideLayout>
  );
};

export default ConfirmRide;
