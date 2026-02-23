import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface EarningRecord {
  id: string;
  date: string;
  trips: number;
  earnings: number;
  rating: number;
}

interface DriverBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const DriversScreen = () => {
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");
  const [scaleAnim] = useState(new Animated.Value(1));

  const earnings: EarningRecord[] = [
    { id: "1", date: "Today", trips: 8, earnings: 124.5, rating: 4.9 },
    { id: "2", date: "Yesterday", trips: 12, earnings: 186.25, rating: 4.8 },
    { id: "3", date: "Mon", trips: 10, earnings: 152.75, rating: 5.0 },
    { id: "4", date: "Sun", trips: 7, earnings: 98.5, rating: 4.7 },
    { id: "5", date: "Sat", trips: 15, earnings: 245.0, rating: 4.9 },
    { id: "6", date: "Fri", trips: 11, earnings: 168.0, rating: 4.8 },
    { id: "7", date: "Thu", trips: 9, earnings: 135.25, rating: 4.6 },
  ];

  const benefits: DriverBenefit[] = [
    {
      id: "1",
      icon: "💰",
      title: "Competitive Earnings",
      description: "Earn up to $25/hour with flexible scheduling",
    },
    {
      id: "2",
      icon: "🏥",
      title: "Health Insurance",
      description: "Access affordable health coverage plans",
    },
    {
      id: "3",
      icon: "🛡️",
      title: "Accident Coverage",
      description: "$1M coverage for driver and passenger protection",
    },
    {
      id: "4",
      icon: "⭐",
      title: "Bonus Program",
      description: "Earn extra with quest bonuses and incentives",
    },
    {
      id: "5",
      icon: "📱",
      title: "24/7 Support",
      description: "Dedicated driver support team available anytime",
    },
    {
      id: "6",
      icon: "🚗",
      title: "Vehicle Options",
      description: "Lease or use your own vehicle",
    },
  ];

  const totalEarningsThisWeek = earnings.reduce((sum, e) => sum + e.earnings, 0);
  const totalTripsThisWeek = earnings.reduce((sum, e) => sum + e.trips, 0);
  const averageRating =
    (earnings.reduce((sum, e) => sum + e.rating, 0) / earnings.length).toFixed(1);

  const handleScaleAnimation = () => {
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
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View className="bg-gradient-to-b from-green-600 to-green-700 px-6 pt-8 pb-12 shadow-2xl">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            🚗 Earn with Us
          </Text>
          <Text className="text-sm font-JakartaRegular text-green-100">
            {isDriverMode ? "Your earnings dashboard" : "Join our growing driver community"}
          </Text>
        </View>

        {isDriverMode ? (
          <>
            {/* Driver Mode - Earnings Dashboard */}

            {/* Stats Overview */}
            <View className="px-6 pt-8 pb-6">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
                This Week's Summary
              </Text>
              <View className="flex flex-row gap-3">
                <View className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-5 border-2 border-green-200">
                  <Text className="text-gray-600 text-xs font-JakartaRegular uppercase tracking-wide mb-2">
                    Total Earnings
                  </Text>
                  <Text className="text-green-900 text-2xl font-JakartaBold">
                    ${totalEarningsThisWeek.toFixed(2)}
                  </Text>
                  <Text className="text-green-700 text-xs font-JakartaRegular mt-2">
                    ↑ 12% from last week
                  </Text>
                </View>

                <View className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-5 border-2 border-blue-200">
                  <Text className="text-gray-600 text-xs font-JakartaRegular uppercase tracking-wide mb-2">
                    Total Trips
                  </Text>
                  <Text className="text-blue-900 text-2xl font-JakartaBold">
                    {totalTripsThisWeek}
                  </Text>
                  <Text className="text-blue-700 text-xs font-JakartaRegular mt-2">
                    Avg: ${(totalEarningsThisWeek / totalTripsThisWeek).toFixed(2)}/trip
                  </Text>
                </View>

                <View className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-5 border-2 border-purple-200">
                  <Text className="text-gray-600 text-xs font-JakartaRegular uppercase tracking-wide mb-2">
                    Rating
                  </Text>
                  <Text className="text-purple-900 text-2xl font-JakartaBold">
                    ⭐ {averageRating}
                  </Text>
                  <Text className="text-purple-700 text-xs font-JakartaRegular mt-2">
                    Excellent review
                  </Text>
                </View>
              </View>
            </View>

            {/* Period Selector */}
            <View className="px-6 pb-6 flex flex-row gap-3">
              <TouchableOpacity
                onPress={() => setSelectedPeriod("week")}
                className={`flex-1 py-3 rounded-2xl border-2 ${
                  selectedPeriod === "week"
                    ? "bg-green-600 border-green-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-JakartaBold text-center ${
                    selectedPeriod === "week" ? "text-white" : "text-gray-700"
                  }`}
                >
                  This Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPeriod("month")}
                className={`flex-1 py-3 rounded-2xl border-2 ${
                  selectedPeriod === "month"
                    ? "bg-green-600 border-green-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-JakartaBold text-center ${
                    selectedPeriod === "month" ? "text-white" : "text-gray-700"
                  }`}
                >
                  This Month
                </Text>
              </TouchableOpacity>
            </View>

            {/* Daily Earnings */}
            <View className="px-6 pb-8">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Daily Breakdown</Text>
              <View className="space-y-2">
                {earnings.map((earning) => (
                  <TouchableOpacity
                    key={earning.id}
                    className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-green-400"
                    activeOpacity={0.85}
                  >
                    <View className="flex-1">
                      <Text className="font-JakartaBold text-gray-900 text-base">
                        {earning.date}
                      </Text>
                      <Text className="text-gray-600 font-JakartaRegular text-xs mt-1">
                        {earning.trips} trips • ⭐ {earning.rating}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-JakartaBold text-green-600 text-lg">
                        ${earning.earnings.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="px-6 pb-8 flex flex-row gap-3">
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }} className="flex-1">
                <TouchableOpacity
                  onPress={handleScaleAnimation}
                  className="bg-green-600 rounded-3xl py-4 items-center justify-center active:opacity-80 shadow-lg border-2 border-green-700"
                  activeOpacity={0.85}
                >
                  <Text className="font-JakartaBold text-white text-base">Go Online</Text>
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity
                onPress={() => setIsDriverMode(false)}
                className="flex-1 bg-white border-2 border-gray-200 rounded-3xl py-4 items-center justify-center active:border-gray-400"
                activeOpacity={0.85}
              >
                <Text className="font-JakartaBold text-gray-700 text-base">Back</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Driver Signup / Information Mode */}

            {/* Hero CTA */}
            <View className="px-6 pt-8 pb-6">
              <View className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 items-center shadow-xl border-2 border-green-700">
                <Text className="text-6xl mb-4">🚗</Text>
                <Text className="text-2xl font-JakartaBold text-white text-center mb-3">
                  Earn on Your Own Schedule
                </Text>
                <Text className="text-white font-JakartaRegular text-center text-sm leading-5 mb-8">
                  Be your own boss and earn up to $25/hour with flexible hours
                </Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleScaleAnimation();
                      setIsDriverMode(true);
                    }}
                    className="bg-white rounded-3xl px-12 py-4 active:opacity-80"
                    activeOpacity={0.85}
                  >
                    <Text className="font-JakartaBold text-green-600 text-base">
                      Start Driving Today
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>

            {/* Driver Benefits */}
            <View className="px-6 pb-8">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Why Drive With Us?</Text>
              <View className="space-y-3">
                {benefits.map((benefit) => (
                  <View
                    key={benefit.id}
                    className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row gap-4"
                  >
                    <Text className="text-3xl">{benefit.icon}</Text>
                    <View className="flex-1">
                      <Text className="font-JakartaBold text-gray-900 text-base">
                        {benefit.title}
                      </Text>
                      <Text className="text-gray-600 font-JakartaRegular text-xs mt-1">
                        {benefit.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Requirements */}
            <View className="px-6 pb-8">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Requirements</Text>
              <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border-2 border-blue-200">
                <View className="space-y-3">
                  <View className="flex flex-row gap-3 items-center">
                    <Text className="text-green-600 text-xl">✓</Text>
                    <Text className="font-JakartaRegular text-gray-800 flex-1">
                      18+ years old with valid driver's license
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3 items-center">
                    <Text className="text-green-600 text-xl">✓</Text>
                    <Text className="font-JakartaRegular text-gray-800 flex-1">
                      Vehicle less than 10 years old (well-maintained)
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3 items-center">
                    <Text className="text-green-600 text-xl">✓</Text>
                    <Text className="font-JakartaRegular text-gray-800 flex-1">
                      Valid auto insurance and registration
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3 items-center">
                    <Text className="text-green-600 text-xl">✓</Text>
                    <Text className="font-JakartaRegular text-gray-800 flex-1">
                      Clean driving record (5 years)
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3 items-center">
                    <Text className="text-green-600 text-xl">✓</Text>
                    <Text className="font-JakartaRegular text-gray-800 flex-1">
                      Background check clearance
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* FAQ */}
            <View className="px-6 pb-12">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Quick Questions</Text>
              <View className="space-y-3">
                <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 active:border-gray-400">
                  <Text className="font-JakartaSemiBold text-gray-800">
                    How do I apply to become a driver?
                  </Text>
                  <Text className="text-gray-600 font-JakartaRegular text-sm mt-2">
                    Tap "Start Driving Today" and complete our quick application process.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 active:border-gray-400">
                  <Text className="font-JakartaSemiBold text-gray-800">
                    What's the approval timeline?
                  </Text>
                  <Text className="text-gray-600 font-JakartaRegular text-sm mt-2">
                    Most applications are approved within 2-3 business days after verification.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 active:border-gray-400">
                  <Text className="font-JakartaSemiBold text-gray-800">
                    Can I use a leased or financed vehicle?
                  </Text>
                  <Text className="text-gray-600 font-JakartaRegular text-sm mt-2">
                    Yes, as long as you have permission from the lender.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriversScreen;
