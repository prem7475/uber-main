import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, Animated, TouchableOpacity } from "react-native";
import { useState } from "react";

import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const [scaleAnim] = useState(new Animated.Value(1));

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];

  return (
    <RideLayout title="Book Your Ride">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} bounces={false}>
        {/* Driver Card - Premium */}
        <View className="flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-black via-gray-800 to-black rounded-3xl p-8 shadow-xl border-2 border-gray-700">
          {/* Driver Avatar */}
          <View className="relative mb-6">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              className="w-36 h-36 rounded-full border-4 border-white shadow-2xl"
            />
            <View className="absolute bottom-0 right-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-3 border-4 border-white shadow-lg">
              <Text className="text-white text-lg">✓</Text>
            </View>
          </View>

          {/* Driver Info */}
          <View className="items-center mb-4">
            <View className="flex flex-row items-center justify-center gap-3 mb-2">
              <Text className="text-3xl font-JakartaBold text-white">
                {driverDetails?.title}
              </Text>
              <View className="flex flex-row items-center gap-1 bg-yellow-400 px-3 py-2 rounded-full shadow-lg">
                <Image
                  source={icons.star}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
                <Text className="text-base font-JakartaBold text-yellow-900">
                  {driverDetails?.rating}
                </Text>
              </View>
            </View>
            <Text className="text-gray-300 text-sm font-JakartaRegular">
              Professional & Verified Driver
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="w-full flex flex-row gap-3 pt-4 border-t border-gray-600">
            <View className="flex-1 items-center py-3">
              <Text className="text-2xl mb-1">🎯</Text>
              <Text className="text-gray-400 text-xs font-JakartaRegular">Trips</Text>
              <Text className="text-white text-lg font-JakartaBold">1,200+</Text>
            </View>
            <View className="flex-1 items-center py-3 border-l border-gray-600">
              <Text className="text-2xl mb-1">⏰</Text>
              <Text className="text-gray-400 text-xs font-JakartaRegular">Avg. Time</Text>
              <Text className="text-white text-lg font-JakartaBold">2 min</Text>
            </View>
            <View className="flex-1 items-center py-3 border-l border-gray-600">
              <Text className="text-2xl mb-1">👥</Text>
              <Text className="text-gray-400 text-xs font-JakartaRegular">Capacity</Text>
              <Text className="text-white text-lg font-JakartaBold">{driverDetails?.car_seats}</Text>
            </View>
          </View>
        </View>

        {/* Ride Details Card */}
        <View className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-7 mb-6 shadow-xl border-2 border-blue-600">
          <Text className="text-white text-lg font-JakartaBold mb-6">
            💰 Ride Details
          </Text>

          <View className="space-y-5">
            {/* Price */}
            <View className="flex flex-row items-center justify-between bg-white/10 backdrop-blur rounded-2xl px-5 py-4">
              <Text className="text-white font-JakartaRegular">
                Base Fare + Tax
              </Text>
              <Text className="text-2xl font-JakartaBold text-green-300">
                ${driverDetails?.price}
              </Text>
            </View>

            {/* Pickup Time */}
            <View className="flex flex-row items-center justify-between bg-white/10 backdrop-blur rounded-2xl px-5 py-4">
              <Text className="text-white font-JakartaRegular">
                Driver ETA
              </Text>
              <Text className="text-xl font-JakartaBold text-white">
                {formatTime(driverDetails?.time!)}
              </Text>
            </View>

            {/* Estimated Duration */}
            <View className="flex flex-row items-center justify-between bg-white/10 backdrop-blur rounded-2xl px-5 py-4">
              <Text className="text-white font-JakartaRegular">
                Ride Duration
              </Text>
              <Text className="text-xl font-JakartaBold text-white">
                ~28 min
              </Text>
            </View>
          </View>
        </View>

        {/* Location Details */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg border-2 border-gray-100">
          <Text className="text-lg font-JakartaBold text-black mb-6">
            📍 Trip Details
          </Text>

          <View className="space-y-5">
            {/* Pickup */}
            <View className="flex flex-row items-start gap-4 pb-5 border-b-2 border-gray-200">
              <View className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Text className="text-2xl">📍</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-JakartaSemiBold text-gray-500 uppercase tracking-wide mb-1">
                  Pickup Location
                </Text>
                <Text className="text-base font-JakartaBold text-black">
                  {typeof userAddress === "string" ? userAddress : userAddress}
                </Text>
              </View>
            </View>

            {/* Destination */}
            <View className="flex flex-row items-start gap-4">
              <View className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Text className="text-2xl">🎯</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-JakartaSemiBold text-gray-500 uppercase tracking-wide mb-1">
                  Destination
                </Text>
                <Text className="text-base font-JakartaBold text-black">
                  {typeof destinationAddress === "string" ? destinationAddress : destinationAddress}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Safety Info */}
        <View className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 mb-8 border-2 border-green-300 shadow-sm">
          <View className="flex flex-row items-start gap-3">
            <Text className="text-2xl">🛡️</Text>
            <View className="flex-1">
              <Text className="font-JakartaBold text-green-900 text-sm mb-2">
                Your Safety is Our Priority
              </Text>
              <Text className="text-xs font-JakartaRegular text-green-800 leading-4">
                All drivers are verified. Ride is insured. Share trip details with family.
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Section */}
        <Payment
          fullName={user?.fullName!}
          email={user?.emailAddresses[0].emailAddress!}
          amount={driverDetails?.price!}
          driverId={driverDetails?.id}
          rideTime={driverDetails?.time!}
        />
      </ScrollView>
    </RideLayout>
  );
};

export default BookRide;
