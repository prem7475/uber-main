import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  TextInput,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "payment" | "safety" | "account";
}

const HelpSupport = () => {
  const { signOut } = useAuth();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [message, setMessage] = useState("");
  const [scaleAnim] = useState(new Animated.Value(1));

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I book a ride?",
      answer:
        "Open the app, enter your destination, select your preferred ride type, and confirm. You'll be matched with a driver within seconds.",
      category: "booking",
    },
    {
      id: "2",
      question: "Can I schedule a ride in advance?",
      answer:
        "Yes! You can schedule rides up to 30 days in advance. Go to Book > Select date and time > Confirm your booking.",
      category: "booking",
    },
    {
      id: "3",
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, digital wallets, and cash payments. You can manage your payment methods in Settings > Payment Methods.",
      category: "payment",
    },
    {
      id: "4",
      question: "How do refunds work?",
      answer:
        "If you cancel before a driver accepts, you get a full refund. If you cancel after acceptance, cancellation fees may apply based on timing.",
      category: "payment",
    },
    {
      id: "5",
      question: "Is my ride safe?",
      answer:
        "Yes! All drivers are background-checked and verified. You can share live trip details with friends, and 24/7 support is available.",
      category: "safety",
    },
    {
      id: "6",
      question: "What if I left something in the car?",
      answer:
        "Go to Help > Lost Items and select your recent ride. We'll help you contact the driver and retrieve your belongings.",
      category: "safety",
    },
    {
      id: "7",
      question: "How do I change my profile information?",
      answer:
        "Go to Profile > Edit Profile. You can update your name, email, and phone number. Changes take effect immediately.",
      category: "account",
    },
    {
      id: "8",
      question: "Can I have multiple accounts?",
      answer:
        "One account per email address. If you need a separate account, use a different email.",
      category: "account",
    },
  ];

  const contactOptions = [
    { id: "1", icon: "💬", title: "Chat Support", description: "24/7 chat", action: "chat" },
    { id: "2", icon: "📞", title: "Call Us", description: "1-800-UBER", action: "call" },
    { id: "3", icon: "📧", title: "Email", description: "support@ridehub.com", action: "email" },
    { id: "4", icon: "🌐", title: "Website", description: "Help Center", action: "web" },
  ];

  const filteredFAQs =
    selectedCategory === "all" ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  const handleContact = (action: string) => {
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

    switch (action) {
      case "call":
        Linking.openURL("tel:1-800-8237");
        break;
      case "email":
        Linking.openURL("mailto:support@ridehub.com");
        break;
      case "chat":
        Alert.alert("Chat Support", "Our support team will respond within 2 minutes.");
        break;
      case "web":
        Linking.openURL("https://help.uber.com");
        break;
    }
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View className="bg-gradient-to-b from-blue-600 to-blue-700 px-6 pt-8 pb-12 shadow-2xl">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-4xl font-JakartaBold text-white mb-2">❓ Help & Support</Text>
          <Text className="text-sm font-JakartaRegular text-blue-100">
            Get answers to your questions
          </Text>
        </View>

        {/* Quick Contact Section */}
        <View className="px-6 pt-8 pb-6">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Get Help Now</Text>
          <View className="flex flex-row flex-wrap gap-3">
            {contactOptions.map((option) => (
              <Animated.View
                key={option.id}
                style={{ transform: [{ scale: scaleAnim }] }}
                className="flex-1 min-w-[45%]"
              >
                <TouchableOpacity
                  onPress={() => handleContact(option.action)}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-4 border-2 border-blue-200 active:opacity-80"
                  activeOpacity={0.85}
                >
                  <Text className="text-3xl mb-2">{option.icon}</Text>
                  <Text className="font-JakartaBold text-gray-800 text-sm">{option.title}</Text>
                  <Text className="font-JakartaRegular text-gray-600 text-xs mt-1">
                    {option.description}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Category Filter */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Browse FAQs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
            {["all", "booking", "payment", "safety", "account"].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-JakartaBold ${
                    selectedCategory === category ? "text-white" : "text-gray-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ Section */}
        <View className="px-6 pb-8">
          {filteredFAQs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              onPress={() => toggleFAQ(faq.id)}
              className="mb-3 bg-white border-2 border-gray-200 rounded-3xl overflow-hidden"
              activeOpacity={0.85}
            >
              <View className="px-6 py-5 flex flex-row items-center justify-between">
                <Text className="font-JakartaSemiBold text-gray-800 flex-1 pr-4">
                  {faq.question}
                </Text>
                <Text className={`text-2xl ${expandedFAQ === faq.id ? "rotate-180" : ""}`}>
                  ▼
                </Text>
              </View>

              {expandedFAQ === faq.id && (
                <View className="bg-gray-50 px-6 py-5 border-t border-gray-200">
                  <Text className="font-JakartaRegular text-gray-700 leading-6">
                    {faq.answer}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Report Issue Section */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
            🐛 Report an Issue
          </Text>
          <View className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 border-2 border-red-200">
            <Text className="font-JakartaBold text-red-900 mb-3">Tell us what went wrong</Text>
            <TextInput
              placeholder="Describe your issue..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              className="bg-white rounded-2xl px-4 py-3 mb-4 font-JakartaRegular text-gray-800 border border-red-200"
              placeholderTextColor="#999"
            />
            <TouchableOpacity className="bg-red-600 rounded-3xl py-4 flex items-center justify-center active:opacity-80">
              <Text className="font-JakartaBold text-white">Send Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Resources */}
        <View className="px-6 pb-12">
          <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Resources</Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400">
              <Text className="font-JakartaSemiBold text-gray-800">📱 Community Guidelines</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400">
              <Text className="font-JakartaSemiBold text-gray-800">🔒 Safety Tips</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-gray-400">
              <Text className="font-JakartaSemiBold text-gray-800">👨‍⚖️ Legal & Privacy</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;
