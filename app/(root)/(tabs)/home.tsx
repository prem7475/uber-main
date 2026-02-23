import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import ProfessionalHeader from "@/components/ProfessionalHeader";
import ProfessionalCard from "@/components/ProfessionalCard";
import ProfessionalBadge from "@/components/ProfessionalBadge";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";

const { width } = Dimensions.get("window");

const MOCK_RECENT_RIDES: Ride[] = [
  {
    id: "1",
    origin_address: "123 Main St, New York, NY",
    destination_address: "456 Park Ave, New York, NY",
    origin_latitude: 40.7128,
    origin_longitude: -74.0060,
    destination_latitude: 40.7350,
    destination_longitude: -74.0100,
    ride_time: 25,
    fare_price: 25.50,
    payment_status: "paid",
    driver_id: 1,
    user_id: "user1",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    origin_address: "789 Broadway, New York, NY",
    destination_address: "321 5th Ave, New York, NY",
    origin_latitude: 40.7450,
    origin_longitude: -74.0080,
    destination_latitude: 40.7550,
    destination_longitude: -74.0120,
    ride_time: 18,
    fare_price: 18.75,
    payment_status: "paid",
    driver_id: 2,
    user_id: "user1",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [recentRides, setRecentRides] = useState<Ride[]>(MOCK_RECENT_RIDES);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  const handleBookPress = () => {
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
    ]).start();
    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Hero Header */}
        <View className="bg-gradient-to-b from-black via-gray-800 to-gray-900 px-6 pt-6 pb-12 shadow-2xl">
          {/* Top Row: Greeting + Logout */}
          <View className="flex flex-row items-start justify-between mb-8">
            <View className="flex-1 pr-4">
              <Text className="text-5xl font-JakartaBold text-white leading-tight mb-1">
                Hey {user?.firstName}! 👋
              </Text>
              <Text className="text-sm font-JakartaRegular text-gray-300 leading-5">
                Ready for your next journey?
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSignOut}
              className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center active:bg-red-500/30 shadow-lg"
              activeOpacity={0.7}
            >
              <Text className="text-2xl">🚪</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Info Pills */}
          <View className="flex flex-row gap-3">
            <View className="flex-1 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
              <Text className="text-gray-300 text-xs font-JakartaRegular uppercase tracking-wide">
                Rating
              </Text>
              <Text className="text-white text-xl font-JakartaBold mt-1">
                ⭐ 4.8
              </Text>
            </View>
            <View className="flex-1 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
              <Text className="text-gray-300 text-xs font-JakartaRegular uppercase tracking-wide">
                Status
              </Text>
              <Text className="text-green-400 text-xl font-JakartaBold mt-1">
                🟢 Online
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar Section */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-sm font-JakartaSemiBold text-gray-600 uppercase tracking-wider mb-4">
            Where to?
          </Text>
          <GoogleTextInput
            icon={icons.search}
            containerStyle="bg-white border-2 border-gray-200 rounded-3xl shadow-lg"
            handlePress={handleDestinationPress}
          />
        </View>

        {/* Premium Book Ride CTA Card */}
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="px-6 pb-8"
        >
          <TouchableOpacity
            className="flex flex-row items-center gap-5 bg-gradient-to-r from-black via-gray-800 to-black rounded-3xl p-6 shadow-2xl active:opacity-90 border border-gray-700"
            onPress={handleBookPress}
            activeOpacity={0.85}
          >
            <View className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl">
              <Text className="text-white text-3xl font-bold">🚕</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-xs font-JakartaSemiBold uppercase tracking-widest">
                Quick Action
              </Text>
              <Text className="text-white text-xl font-JakartaBold mt-2">
                Book a Ride Now
              </Text>
              <Text className="text-gray-400 text-xs font-JakartaRegular mt-1">
                Get matched in seconds
              </Text>
            </View>
            <View className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <Text className="text-white text-xl font-bold">→</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Map Section with Premium Container */}
        <View className="px-6 pb-8">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-xl font-JakartaBold text-black">
              🗺️ Live Map
            </Text>
            <View className="bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <Text className="text-green-700 text-xs font-JakartaSemiBold">
                🟢 3 nearby
              </Text>
            </View>
          </View>
          <View className="rounded-3xl overflow-hidden bg-gray-100 h-72 shadow-2xl border-4 border-gray-200">
            <Map />
          </View>
        </View>

        {/* Premium Stats Cards */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-JakartaBold text-black mb-4">
            Your Stats
          </Text>
          <View className="flex flex-row gap-4">
            {/* Total Trips */}
            <TouchableOpacity 
              activeOpacity={0.85}
              className="flex-1 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl p-6 shadow-lg border-2 border-blue-300 active:opacity-85"
            >
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-4xl">🚗</Text>
                <View className="bg-blue-600 rounded-full px-2.5 py-1">
                  <Text className="text-white text-xs font-JakartaBold">↑ 8%</Text>
                </View>
              </View>
              <Text className="text-gray-600 text-xs font-JakartaSemiBold uppercase tracking-wide">
                Total Trips
              </Text>
              <Text className="text-blue-900 text-4xl font-JakartaBold mt-2">
                42
              </Text>
              <Text className="text-gray-600 text-xs font-JakartaRegular mt-2">
                📊 This month: 8 rides
              </Text>
            </TouchableOpacity>

            {/* Credits/Wallet */}
            <TouchableOpacity 
              activeOpacity={0.85}
              className="flex-1 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-3xl p-6 shadow-lg border-2 border-orange-600 active:opacity-85"
            >
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-4xl">💳</Text>
                <View className="bg-white/20 backdrop-blur rounded-full px-2.5 py-1">
                  <Text className="text-white text-xs font-JakartaBold">Pro</Text>
                </View>
              </View>
              <Text className="text-white text-xs font-JakartaSemiBold uppercase tracking-wide">
                Credits
              </Text>
              <Text className="text-white text-4xl font-JakartaBold mt-2">
                $45
              </Text>
              <Text className="text-white text-xs font-JakartaRegular mt-2 opacity-95">
                ✓ Valid 30 days
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Rides Section */}
        <View className="px-6 pb-4">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-JakartaBold text-black">
                🚗 Recent Rides
              </Text>
              <Text className="text-gray-500 text-xs font-JakartaRegular mt-1">
                Your travel history
              </Text>
            </View>
            <TouchableOpacity 
              activeOpacity={0.7}
              className="bg-black px-4 py-2 rounded-full"
            >
              <Text className="text-white font-JakartaSemiBold text-xs">
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Rides List */}
        <View className="px-6">
          {loading ? (
            <View className="flex items-center justify-center py-12">
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : recentRides.length > 0 ? (
            recentRides.map((ride, index) => (
              <View key={ride.id} className={`${index < recentRides.length - 1 ? "mb-4" : ""}`}>
                <RideCard ride={ride} />
              </View>
            ))
          ) : (
            <View className="flex items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200">
              <Text className="text-6xl mb-4">🚫</Text>
              <Text className="text-gray-700 font-JakartaBold text-lg text-center">
                No rides yet
              </Text>
              <Text className="text-gray-500 text-sm font-JakartaRegular mt-2 text-center px-4">
                Start your first ride today and build your travel history
              </Text>
              <TouchableOpacity
                onPress={handleBookPress}
                className="bg-black mt-6 px-8 py-3 rounded-2xl"
              >
                <Text className="text-white font-JakartaBold text-sm">
                  Book Now →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
