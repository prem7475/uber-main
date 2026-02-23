import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Alert,
  Clipboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PromoCode {
  id: string;
  code: string;
  discount: string;
  description: string;
  expiresAt: string;
  icon: string;
  type: "percentage" | "fixed";
  minRideAmount?: number;
  maxUses?: number;
  usesLeft?: number;
  isActive: boolean;
}

interface AvailablePromo {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  description: string;
  expiresAt: string;
  badge?: string;
}

const PromoCodes = () => {
  const [promoInput, setPromoInput] = useState("");
  const [scaleAnim] = useState(new Animated.Value(1));
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const myCodes: PromoCode[] = [
    {
      id: "1",
      code: "WELCOME50",
      discount: "50%",
      description: "50% off your first ride",
      expiresAt: "Expires in 7 days",
      icon: "🎉",
      type: "percentage",
      minRideAmount: 10,
      maxUses: 1,
      usesLeft: 1,
      isActive: true,
    },
    {
      id: "2",
      code: "SAVE20",
      discount: "$20",
      description: "$20 off rides over $50",
      expiresAt: "Expires in 15 days",
      icon: "💰",
      type: "fixed",
      minRideAmount: 50,
      maxUses: 5,
      usesLeft: 3,
      isActive: true,
    },
    {
      id: "3",
      code: "SUMMER30",
      discount: "30%",
      description: "30% off summer rides",
      expiresAt: "Expired",
      icon: "☀️",
      type: "percentage",
      isActive: false,
    },
    {
      id: "4",
      code: "FRIEND15",
      discount: "15%",
      description: "15% off when booking for friends",
      expiresAt: "Expires in 30 days",
      icon: "👥",
      type: "percentage",
      isActive: true,
    },
  ];

  const availablePromos: AvailablePromo[] = [
    {
      id: "1",
      icon: "🎊",
      title: "New Year Special",
      subtitle: "Limited time offer",
      code: "NEWYEAR2025",
      discount: "40% off",
      description: "Get 40% off your next 3 rides",
      expiresAt: "Expires Jan 31",
      badge: "NEW",
    },
    {
      id: "2",
      icon: "💳",
      title: "Credit Card Bonus",
      subtitle: "Payment exclusive",
      code: "CREDIT25",
      discount: "$25",
      description: "Use any credit card for $25 discount",
      expiresAt: "Expires Feb 28",
    },
    {
      id: "3",
      icon: "🌙",
      title: "Night Owl",
      subtitle: "Late evening rides",
      code: "NIGHTRIDE",
      discount: "25% off",
      description: "25% off rides between 10 PM - 6 AM",
      expiresAt: "Expires monthly",
    },
    {
      id: "4",
      icon: "🚀",
      title: "Speed Delivery",
      subtitle: "Fast rides only",
      code: "FAST20",
      discount: "20% off",
      description: "20% off rides to airports",
      expiresAt: "Expires Mar 15",
    },
  ];

  const handleApplyPromo = () => {
    handleScaleAnimation();
    if (!promoInput.trim()) {
      Alert.alert("Error", "Please enter a promo code");
      return;
    }

    const isValid = myCodes.some(
      (code) =>
        code.code.toLowerCase() === promoInput.toUpperCase() && code.isActive
    );

    if (isValid) {
      setAppliedCode(promoInput.toUpperCase());
      setPromoInput("");
      Alert.alert("Success", "Promo code applied successfully!");
    } else {
      Alert.alert(
        "Invalid Code",
        "This promo code is invalid or has expired."
      );
    }
  };

  const handleCopyCode = (code: string) => {
    handleScaleAnimation();
    Clipboard.setString(code);
    Alert.alert("Copied", `"${code}" copied to clipboard`);
  };

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
        <View className="bg-gradient-to-b from-purple-600 to-purple-700 px-6 pt-8 pb-12 shadow-2xl">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            🎟️ Promo Codes
          </Text>
          <Text className="text-sm font-JakartaRegular text-purple-100">
            Save money on your rides
          </Text>
        </View>

        {/* Active Promo Banner */}
        {appliedCode && (
          <View className="px-6 pt-6 pb-2">
            <View className="bg-gradient-to-r from-green-400 to-green-500 rounded-3xl p-4 flex flex-row items-center justify-between border-2 border-green-600">
              <View className="flex-1">
                <Text className="text-white font-JakartaBold">✓ Active Promo</Text>
                <Text className="text-white font-JakartaRegular text-sm mt-1">
                  {appliedCode}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setAppliedCode(null)}
                className="text-white text-2xl"
              >
                ✕
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Promo Code Input */}
        <View className="px-6 py-6">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
            Have a Promo Code?
          </Text>
          <View className="flex flex-row gap-3">
            <TextInput
              placeholder="Enter code..."
              placeholderTextColor="#999"
              value={promoInput}
              onChangeText={setPromoInput}
              className="flex-1 bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 font-JakartaRegular text-gray-800 uppercase"
            />
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleApplyPromo}
                className="bg-purple-600 rounded-2xl px-6 py-3 items-center justify-center active:opacity-80 shadow-lg border-2 border-purple-700"
                activeOpacity={0.85}
              >
                <Text className="font-JakartaBold text-white">Apply</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* My Active Codes */}
        <View className="px-6 pb-8">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-lg font-JakartaBold text-gray-800">
              🎁 My Codes
            </Text>
            <View className="bg-purple-100 rounded-full px-3 py-1">
              <Text className="text-purple-700 text-xs font-JakartaBold">
                {myCodes.filter((c) => c.isActive).length} Active
              </Text>
            </View>
          </View>

          <View className="space-y-3">
            {myCodes.map((code) => (
              <TouchableOpacity
                key={code.id}
                onPress={() => handleCopyCode(code.code)}
                className={`rounded-3xl p-5 border-2 overflow-hidden active:opacity-80 ${
                  code.isActive
                    ? "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
                activeOpacity={0.85}
              >
                <View className="flex flex-row items-start justify-between mb-3">
                  <View className="flex-1 flex flex-row items-center gap-3">
                    <Text className="text-3xl">{code.icon}</Text>
                    <View className="flex-1">
                      <Text className="font-JakartaBold text-purple-900 text-lg">
                        {code.discount}
                      </Text>
                      <Text className="text-purple-700 font-JakartaRegular text-xs mt-0.5">
                        {code.description}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`rounded-full px-3 py-1 ${
                      code.isActive
                        ? "bg-green-100"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-JakartaBold ${
                        code.isActive ? "text-green-700" : "text-gray-700"
                      }`}
                    >
                      {code.isActive ? "✓ Active" : "Expired"}
                    </Text>
                  </View>
                </View>

                {code.isActive && (
                  <>
                    <View className="bg-white rounded-2xl px-4 py-2.5 mb-3 flex flex-row items-center justify-between border border-purple-200">
                      <Text className="text-purple-900 font-JakartaBold tracking-widest">
                        {code.code}
                      </Text>
                      <Text className="text-purple-600 text-sm">📋</Text>
                    </View>

                    <View className="flex flex-row gap-2">
                      <View className="flex-1">
                        <Text className="text-gray-600 text-xs font-JakartaRegular mb-0.5">
                          Min Ride
                        </Text>
                        <Text className="text-purple-900 font-JakartaSemiBold">
                          ${code.minRideAmount || 0}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-600 text-xs font-JakartaRegular mb-0.5">
                          Uses Left
                        </Text>
                        <Text className="text-purple-900 font-JakartaSemiBold">
                          {code.usesLeft || "∞"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-600 text-xs font-JakartaRegular mb-0.5">
                          Expires
                        </Text>
                        <Text className="text-purple-900 font-JakartaSemiBold text-sm">
                          {code.expiresAt}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Available Promos */}
        <View className="px-6 pb-8">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-lg font-JakartaBold text-gray-800">
              ✨ Available Deals
            </Text>
            <TouchableOpacity>
              <Text className="text-purple-600 font-JakartaSemiBold text-sm">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            {availablePromos.map((promo) => (
              <TouchableOpacity
                key={promo.id}
                onPress={() => handleCopyCode(promo.code)}
                className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden active:border-purple-400"
                activeOpacity={0.85}
              >
                <View className="flex flex-row items-start p-5">
                  <Text className="text-4xl mr-4 mt-1">{promo.icon}</Text>
                  <View className="flex-1 mr-4">
                    <View className="flex flex-row items-center gap-2 mb-1">
                      <Text className="font-JakartaBold text-gray-900">
                        {promo.title}
                      </Text>
                      {promo.badge && (
                        <View className="bg-red-500 rounded-full px-2 py-0.5">
                          <Text className="text-white text-xs font-JakartaBold">
                            {promo.badge}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-600 text-xs font-JakartaRegular mb-2">
                      {promo.subtitle}
                    </Text>
                    <Text className="text-gray-700 font-JakartaRegular text-sm mb-2">
                      {promo.description}
                    </Text>
                    <View className="flex flex-row items-center gap-2">
                      <View className="bg-purple-100 rounded-full px-3 py-1">
                        <Text className="text-purple-700 text-xs font-JakartaBold">
                          {promo.code}
                        </Text>
                      </View>
                      <Text className="text-gray-500 text-xs font-JakartaRegular">
                        {promo.expiresAt}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-2xl text-purple-600 font-JakartaBold">
                    {promo.discount}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View className="px-6 pb-12">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">💡 Tips</Text>
          <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border-2 border-blue-200">
            <View className="space-y-3">
              <View className="flex flex-row gap-3 items-center">
                <Text className="text-blue-600 text-lg font-JakartaBold">→</Text>
                <Text className="font-JakartaRegular text-gray-800 flex-1">
                  Stack multiple promos for bigger savings
                </Text>
              </View>
              <View className="flex flex-row gap-3 items-center">
                <Text className="text-blue-600 text-lg font-JakartaBold">→</Text>
                <Text className="font-JakartaRegular text-gray-800 flex-1">
                  Check your inbox weekly for exclusive offers
                </Text>
              </View>
              <View className="flex flex-row gap-3 items-center">
                <Text className="text-blue-600 text-lg font-JakartaBold">→</Text>
                <Text className="font-JakartaRegular text-gray-800 flex-1">
                  Refer friends and earn credits
                </Text>
              </View>
              <View className="flex flex-row gap-3 items-center">
                <Text className="text-blue-600 text-lg font-JakartaBold">→</Text>
                <Text className="font-JakartaRegular text-gray-800 flex-1">
                  Premium members get exclusive promo access
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromoCodes;
