import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleLogout = () => {
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
      signOut();
      router.replace("/(auth)/sign-in");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Header */}
        <View className="bg-gradient-to-b from-black via-gray-800 to-gray-900 px-6 pt-6 pb-12 shadow-2xl">
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            👤 My Profile
          </Text>
          <Text className="text-sm font-JakartaRegular text-gray-300 leading-5">
            Manage your account & preferences
          </Text>
        </View>

        {/* Avatar Section */}
        <View className="px-6 -mt-8 mb-8">
          <View className="flex items-center justify-center">
            <View className="relative">
              <View className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white">
                <Image
                  source={{
                    uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                  }}
                  style={{ width: 128, height: 128, borderRadius: 64 }}
                />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-4 shadow-xl border-4 border-white active:opacity-80">
                <Text className="text-white text-xl">📷</Text>
              </TouchableOpacity>
            </View>

            {/* User Name */}
            <View className="mt-6 text-center">
              <Text className="text-2xl font-JakartaBold text-black">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm font-JakartaRegular text-gray-600 mt-1">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>

            {/* Status Badge */}
            <View className="mt-4 bg-green-50 border-2 border-green-300 rounded-full px-4 py-2 flex flex-row items-center gap-2">
              <Text className="text-green-700 text-sm font-JakartaBold">
                🟢 Active Member
              </Text>
            </View>
          </View>
        </View>

        {/* Account Info Cards */}
        <View className="px-6 pb-8">
          <Text className="text-base font-JakartaBold text-gray-700 uppercase tracking-wider mb-4">
            Account Information
          </Text>

          <View className="space-y-4">
            {/* First Name */}
            <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-5 border-2 border-blue-200 shadow-sm">
              <Text className="text-xs font-JakartaSemiBold text-gray-600 uppercase tracking-wide mb-2">
                📝 First Name
              </Text>
              <Text className="text-lg font-JakartaBold text-blue-900">
                {user?.firstName || "Not Found"}
              </Text>
            </View>

            {/* Last Name */}
            <View className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-5 border-2 border-purple-200 shadow-sm">
              <Text className="text-xs font-JakartaSemiBold text-gray-600 uppercase tracking-wide mb-2">
                📝 Last Name
              </Text>
              <Text className="text-lg font-JakartaBold text-purple-900">
                {user?.lastName || "Not Found"}
              </Text>
            </View>

            {/* Email */}
            <View className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-5 border-2 border-pink-200 shadow-sm">
              <Text className="text-xs font-JakartaSemiBold text-gray-600 uppercase tracking-wide mb-2">
                📧 Email Address
              </Text>
              <Text className="text-lg font-JakartaBold text-pink-900 break-words">
                {user?.primaryEmailAddress?.emailAddress || "Not Found"}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pb-8">
          <Text className="text-base font-JakartaBold text-gray-700 uppercase tracking-wider mb-4">
            Quick Actions
          </Text>

          <View className="flex flex-row gap-3">
            <TouchableOpacity 
              activeOpacity={0.8}
              className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl py-4 items-center justify-center shadow-lg active:opacity-90 border-2 border-blue-700"
            >
              <Text className="font-JakartaBold text-white text-sm">
                ✏️ Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              className="flex-1 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl py-4 items-center justify-center shadow-lg active:opacity-90 border-2 border-green-700"
            >
              <Text className="font-JakartaBold text-white text-sm">
                🔐 Security
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment & Credits Section */}
        <View className="px-6 pb-8">
          <Text className="text-base font-JakartaBold text-gray-700 uppercase tracking-wider mb-4">
            Wallet & Offers
          </Text>

          {/* Payment Methods Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(root)/wallet" as any)}
            className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 rounded-3xl p-6 mb-4 shadow-lg border-2 border-indigo-300 active:opacity-90"
          >
            <View className="flex flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-JakartaBold text-indigo-900 text-base mb-1">
                  💳 Wallet & Payment
                </Text>
                <Text className="font-JakartaRegular text-indigo-700 text-sm">
                  Manage payment methods & balance
                </Text>
              </View>
              <Text className="text-2xl">→</Text>
            </View>
          </TouchableOpacity>

          {/* Credits Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(root)/promo-codes" as any)}
            className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-3xl p-6 shadow-lg border-2 border-orange-600 active:opacity-90"
          >
            <View className="flex flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-JakartaBold text-white text-base mb-2">
                  🎟️ Promo Codes
                </Text>
                <Text className="text-white text-3xl font-JakartaBold mb-1">
                  4 Active
                </Text>
                <Text className="font-JakartaRegular text-white text-xs opacity-90">
                  ✓ Save on your next ride
                </Text>
              </View>
              <View className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Text className="text-white text-xl">📌</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Preferences & Legal */}
        <View className="px-6 pb-8">
          <Text className="text-base font-JakartaBold text-gray-700 uppercase tracking-wider mb-4">
            More
          </Text>

          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => router.push("/(root)/drivers" as any)}
              activeOpacity={0.8}
              className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400"
            >
              <Text className="font-JakartaSemiBold text-gray-800 text-base">
                🚗 Become a Driver
              </Text>
              <Text className="text-gray-400 text-lg">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(root)/settings" as any)}
              activeOpacity={0.8}
              className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400"
            >
              <Text className="font-JakartaSemiBold text-gray-800 text-base">
                ⚙️ Settings
              </Text>
              <Text className="text-gray-400 text-lg">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(root)/help-support" as any)}
              activeOpacity={0.8}
              className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400"
            >
              <Text className="font-JakartaSemiBold text-gray-800 text-base">
                ❓ Help & Support
              </Text>
              <Text className="text-gray-400 text-lg">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400"
            >
              <Text className="font-JakartaSemiBold text-gray-800 text-base">
                📋 Terms & Privacy
              </Text>
              <Text className="text-gray-400 text-lg">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="px-6 pb-8"
        >
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl py-5 items-center justify-center active:opacity-90 shadow-xl border-2 border-red-700"
            activeOpacity={0.85}
          >
            <Text className="font-JakartaBold text-white text-base">
              🚪 Log Out
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View className="mt-6 pt-6 border-t border-gray-200 px-6 pb-4">
          <Text className="text-gray-500 text-xs font-JakartaRegular text-center">
            Uber Clone • Version 1.0.0
          </Text>
          <Text className="text-gray-400 text-xs font-JakartaRegular text-center mt-2">
            Made with ❤️ by Your Team
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
