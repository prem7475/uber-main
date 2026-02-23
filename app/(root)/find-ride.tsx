import { router } from "expo-router";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useState } from "react";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const [scaleAnim] = useState(new Animated.Value(1));

  const handleFindRides = () => {
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
      router.push(`/(root)/confirm-ride`);
    });
  };

  return (
    <RideLayout title="📍 Find a Ride">
      <View className="my-8 gap-8">
        {/* Pickup Location Card */}
        <View className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 border-2 border-green-300 shadow-lg">
          <View className="flex flex-row items-center gap-3 mb-5">
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <Text className="text-white font-JakartaBold text-xl">📍</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-JakartaSemiBold text-green-800 uppercase tracking-wide">
                Pickup
              </Text>
              <Text className="text-lg font-JakartaBold text-green-900">
                Your Location
              </Text>
            </View>
          </View>

          <GoogleTextInput
            icon={icons.target}
            initialLocation={userAddress!}
            containerStyle="bg-white border-2 border-green-200 rounded-3xl shadow-md"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
          />

          {userAddress && (
            <View className="mt-4 bg-white/60 backdrop-blur rounded-2xl px-4 py-3 border border-green-200">
              <Text className="text-xs font-JakartaRegular text-green-900">
                ✓ {typeof userAddress === "string" ? userAddress.substring(0, 40) : userAddress}...
              </Text>
            </View>
          )}
        </View>

        {/* Arrow Divider */}
        <View className="flex items-center justify-center">
          <View className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center shadow-xl border-4 border-white">
            <Text className="text-white text-2xl">↓</Text>
          </View>
        </View>

        {/* Destination Card */}
        <View className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 border-2 border-red-300 shadow-lg">
          <View className="flex flex-row items-center gap-3 mb-5">
            <View className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
              <Text className="text-white font-JakartaBold text-xl">📇</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-JakartaSemiBold text-red-800 uppercase tracking-wide">
                Destination
              </Text>
              <Text className="text-lg font-JakartaBold text-red-900">
                Where to?
              </Text>
            </View>
          </View>

          <GoogleTextInput
            icon={icons.map}
            initialLocation={destinationAddress!}
            containerStyle="bg-white border-2 border-red-200 rounded-3xl shadow-md"
            textInputBackgroundColor="transparent"
            handlePress={(location) => setDestinationLocation(location)}
          />

          {destinationAddress && (
            <View className="mt-4 bg-white/60 backdrop-blur rounded-2xl px-4 py-3 border border-red-200">
              <Text className="text-xs font-JakartaRegular text-red-900">
                ✓ {typeof destinationAddress === "string" ? destinationAddress.substring(0, 40) : destinationAddress}...
              </Text>
            </View>
          )}
        </View>

        {/* Trip Info Cards */}
        <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border-2 border-blue-300">
          <View className="flex flex-row gap-4">
            <View className="flex-1 items-center">
              <Text className="text-3xl mb-2">⏱️</Text>
              <Text className="text-xs font-JakartaRegular text-gray-600 mb-1">
                Est. Time
              </Text>
              <Text className="font-JakartaBold text-blue-900 text-lg">
                ~18 min
              </Text>
            </View>
            <View className="w-px bg-blue-300" />
            <View className="flex-1 items-center">
              <Text className="text-3xl mb-2">💰</Text>
              <Text className="text-xs font-JakartaRegular text-gray-600 mb-1">
                Est. Price
              </Text>
              <Text className="font-JakartaBold text-blue-900 text-lg">
                $18.50
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <CustomButton
            title="🔍 Find Nearby Drivers"
            onPress={handleFindRides}
            className="mt-2 shadow-xl"
          />
        </Animated.View>

        {/* Info Box */}
        <View className="bg-orange-50 rounded-3xl p-5 border-2 border-orange-200">
          <View className="flex flex-row items-start gap-3">
            <Text className="text-2xl mt-1">💡</Text>
            <View className="flex-1">
              <Text className="font-JakartaBold text-orange-900 text-sm mb-1">
                Tip for Faster Matching
              </Text>
              <Text className="text-xs font-JakartaRegular text-orange-800 leading-4">
                Use specific addresses for better driver matching. Common locations like landmarks help too.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RideLayout>
  );
};

export default FindRide;
