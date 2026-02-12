import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface OnboardingItem {
  id: string;
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
}

const slides: OnboardingItem[] = [
  {
    id: "1",
    emoji: "🚗",
    title: "Book a Ride",
    description: "Request a safe, reliable ride in just a few taps. Choose your preferred vehicle type and pay securely.",
    gradient: "from-blue-600 to-cyan-500",
    accentColor: "bg-blue-100",
  },
  {
    id: "2",
    emoji: "💳",
    title: "Flexible Payments",
    description: "Pay with your preferred method. Split fares with friends, add wallet balance, or use loyalty points.",
    gradient: "from-purple-600 to-pink-500",
    accentColor: "bg-purple-100",
  },
  {
    id: "3",
    emoji: "⭐",
    title: "Trusted Drivers",
    description: "Verified drivers with excellent ratings. Every ride is insured. Share trip details with your loved ones.",
    gradient: "from-orange-600 to-red-500",
    accentColor: "bg-orange-100",
  },
  {
    id: "4",
    emoji: "🛡️",
    title: "Your Safety Matters",
    description: "24/7 support, emergency assistance, and detailed ride history for complete peace of mind.",
    gradient: "from-green-600 to-emerald-500",
    accentColor: "bg-green-100",
  },
];

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollIndicatorAnimation = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);

    Animated.timing(scrollIndicatorAnimation, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/(auth)/sign-up");
    }
  };

  const RenderSlide = ({ item }: { item: OnboardingItem }) => (
    <View style={{ width }} className="flex-1 items-center justify-center px-6 pb-20">
      {/* Background Gradient Circles */}
      <View className="absolute top-20 right-10 w-40 h-40 rounded-full bg-blue-200 opacity-10" />
      <View className="absolute bottom-40 left-0 w-32 h-32 rounded-full bg-purple-200 opacity-10" />

      {/* Content Container */}
      <View className="relative z-10 items-center">
        {/* Icon with Animated Background */}
        <View
          className={`${item.accentColor} w-28 h-28 rounded-3xl flex items-center justify-center mb-12 shadow-xl`}
        >
          <Text className="text-6xl">{item.emoji}</Text>
        </View>

        {/* Step Indicator */}
        <Text className="text-sm font-JakartaSemiBold text-gray-500 tracking-wider uppercase mb-4">
          Step {activeIndex + 1} of {slides.length}
        </Text>

        {/* Title */}
        <Text className="text-5xl font-JakartaBold text-black text-center leading-tight mb-6">
          {item.title}
        </Text>

        {/* Description */}
        <Text className="text-lg font-JakartaRegular text-gray-600 text-center leading-7">
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Slide Content */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={RenderSlide}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEnabled={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
      />

      {/* Bottom Navigation Bar */}
      <View className="px-6 pb-8">
        {/* Progress Indicators */}
        <View className="flex flex-row justify-center gap-2 mb-10">
          {slides.map((_, index) => (
            <Animated.View
              key={index}
              className={`${
                index === activeIndex ? "bg-black" : "bg-gray-300"
              } rounded-full`}
              style={{
                width: index === activeIndex ? 32 : 8,
                height: 8,
                opacity: scrollIndicatorAnimation.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.4, 1, 0.4],
                  extrapolate: "clamp",
                }),
              }}
            />
          ))}
        </View>

        {/* Action Buttons */}
        {activeIndex === slides.length - 1 ? (
          // Last Slide - Get Started CTA
          <View className="gap-4">
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/sign-up")}
              className="bg-black rounded-3xl py-5 active:opacity-70 shadow-xl"
            >
              <Text className="text-white font-JakartaBold text-center text-lg">
                ✨ Get Started
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row gap-3 items-center justify-center">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-500 font-JakartaMedium text-xs uppercase">
                Already a member?
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <TouchableOpacity
              onPress={() => router.replace("/(auth)/sign-in")}
              className="border-2 border-black rounded-3xl py-4 active:opacity-70"
            >
              <Text className="text-black font-JakartaBold text-center text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Other Slides - Next + Skip
          <View className="gap-3">
            <TouchableOpacity
              onPress={handleNext}
              className="bg-black rounded-3xl py-5 active:opacity-70 shadow-xl"
            >
              <Text className="text-white font-JakartaBold text-center text-lg">
                Next →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/(auth)/sign-up")}
              className="py-4 active:opacity-70"
            >
              <Text className="text-black font-JakartaSemiBold text-center text-base">
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer Text */}
        <Text className="text-center text-gray-500 font-JakartaRegular text-xs mt-8 leading-5">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
