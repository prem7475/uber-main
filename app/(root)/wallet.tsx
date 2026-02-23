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
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface PaymentMethod {
  id: string;
  type: "card" | "wallet" | "bank";
  icon: string;
  name: string;
  lastDigits?: string;
  isDefault: boolean;
  expiryDate?: string;
}

interface Transaction {
  id: string;
  type: "ride" | "refund" | "topup" | "subscription";
  icon: string;
  title: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const Wallet = () => {
  const [balance, setBalance] = useState(45.5);
  const [activeTab, setActiveTab] = useState<"overview" | "methods" | "history">("overview");
  const [topupAmount, setTopupAmount] = useState("");
  const [scaleAnim] = useState(new Animated.Value(1));

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      icon: "💳",
      name: "Visa",
      lastDigits: "4242",
      isDefault: true,
      expiryDate: "12/25",
    },
    {
      id: "2",
      type: "card",
      icon: "💳",
      name: "Mastercard",
      lastDigits: "5555",
      isDefault: false,
      expiryDate: "08/24",
    },
    {
      id: "3",
      type: "wallet",
      icon: "💰",
      name: "PayPal",
      lastDigits: "example@email.com",
      isDefault: false,
    },
    {
      id: "4",
      type: "bank",
      icon: "🏦",
      name: "Bank Account",
      lastDigits: "9876",
      isDefault: false,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "ride",
      icon: "🚗",
      title: "Ride to Airport",
      amount: -35.5,
      date: "Today at 2:30 PM",
      status: "completed",
    },
    {
      id: "2",
      type: "topup",
      icon: "➕",
      title: "Wallet Top-up",
      amount: 100.0,
      date: "Yesterday at 5:15 PM",
      status: "completed",
    },
    {
      id: "3",
      type: "ride",
      icon: "🚗",
      title: "Ride to Work",
      amount: -18.75,
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "refund",
      icon: "💵",
      title: "Cancellation Refund",
      amount: 12.0,
      date: "3 days ago",
      status: "completed",
    },
    {
      id: "5",
      type: "subscription",
      icon: "👑",
      title: "Premium Membership",
      amount: -9.99,
      date: "5 days ago",
      status: "completed",
    },
    {
      id: "6",
      type: "ride",
      icon: "🚗",
      title: "Ride Downtown",
      amount: -22.5,
      date: "1 week ago",
      status: "completed",
    },
  ];

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

  const handleTopup = () => {
    handleScaleAnimation();
    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }
    setBalance(balance + amount);
    setTopupAmount("");
    Alert.alert("Success", `$${amount.toFixed(2)} added to your wallet!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View className="bg-gradient-to-b from-orange-600 to-orange-700 px-6 pt-8 pb-12 shadow-2xl">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-4xl font-JakartaBold text-white mb-2">💳 Wallet</Text>
          <Text className="text-sm font-JakartaRegular text-orange-100">
            Manage payments & balance
          </Text>
        </View>

        {/* Balance Card */}
        <View className="px-6 -mt-6 mb-8">
          <View className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl border-2 border-orange-600">
            <View className="mb-8">
              <Text className="text-orange-100 text-sm font-JakartaRegular uppercase tracking-wide mb-2">
                Wallet Balance
              </Text>
              <Text className="text-white text-5xl font-JakartaBold">
                ${balance.toFixed(2)}
              </Text>
              <Text className="text-orange-100 text-xs font-JakartaRegular mt-2">
                Available for rides
              </Text>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleScaleAnimation}
                className="bg-white rounded-2xl py-3 items-center justify-center active:opacity-80"
                activeOpacity={0.85}
              >
                <Text className="font-JakartaBold text-orange-600">+ Add Money</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="px-6 pb-6 flex flex-row gap-3">
          {([
            { key: "overview", label: "Overview" },
            { key: "methods", label: "Methods" },
            { key: "history", label: "History" },
          ] as const).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 rounded-2xl border-2 ${
                activeTab === tab.key
                  ? "bg-orange-600 border-orange-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-JakartaBold text-center ${
                  activeTab === tab.key ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "overview" && (
          <>
            {/* Quick Actions */}
            <View className="px-6 pb-6">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">Quick Actions</Text>
              <View className="flex flex-row gap-3">
                <TouchableOpacity
                  onPress={() => {
                    handleScaleAnimation();
                    Alert.alert("Scheduled Rides", "Feature coming soon!");
                  }}
                  className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-4 border-2 border-blue-200 active:opacity-80"
                  activeOpacity={0.85}
                >
                  <Text className="text-2xl mb-2">📅</Text>
                  <Text className="font-JakartaSemiBold text-gray-800 text-sm">Schedule</Text>
                  <Text className="font-JakartaRegular text-gray-600 text-xs mt-1">
                    Plan ahead
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleScaleAnimation();
                    Alert.alert("Split Fare", "Feature coming soon!");
                  }}
                  className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-4 border-2 border-purple-200 active:opacity-80"
                  activeOpacity={0.85}
                >
                  <Text className="text-2xl mb-2">👥</Text>
                  <Text className="font-JakartaSemiBold text-gray-800 text-sm">Split</Text>
                  <Text className="font-JakartaRegular text-gray-600 text-xs mt-1">
                    Share rides
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleScaleAnimation();
                    Alert.alert("Gift Card", "Coming soon!");
                  }}
                  className="flex-1 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-4 border-2 border-pink-200 active:opacity-80"
                  activeOpacity={0.85}
                >
                  <Text className="text-2xl mb-2">🎁</Text>
                  <Text className="font-JakartaSemiBold text-gray-800 text-sm">Gift</Text>
                  <Text className="font-JakartaRegular text-gray-600 text-xs mt-1">
                    Send rides
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Transactions */}
            <View className="px-6 pb-8">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-lg font-JakartaBold text-gray-800">
                  Recent Transactions
                </Text>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-JakartaSemiBold text-sm">View All</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-2">
                {transactions.slice(0, 3).map((transaction) => (
                  <TouchableOpacity
                    key={transaction.id}
                    className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-orange-400"
                    activeOpacity={0.85}
                  >
                    <View className="flex-1 flex flex-row items-center gap-4">
                      <Text className="text-3xl">{transaction.icon}</Text>
                      <View>
                        <Text className="font-JakartaSemiBold text-gray-900">
                          {transaction.title}
                        </Text>
                        <Text className="text-gray-600 text-xs font-JakartaRegular mt-1">
                          {transaction.date}
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={`font-JakartaBold text-lg ${
                        transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {activeTab === "methods" && (
          <>
            {/* Payment Methods List */}
            <View className="px-6 pb-8">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-lg font-JakartaBold text-gray-800">
                  Payment Methods
                </Text>
                <TouchableOpacity className="bg-orange-600 rounded-full px-3 py-1">
                  <Text className="text-white font-JakartaSemiBold text-xs">+ Add</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-3">
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    className={`rounded-3xl p-4 border-2 flex flex-row items-center justify-between active:opacity-80 ${
                      method.isDefault
                        ? "bg-orange-50 border-orange-200"
                        : "bg-white border-gray-200"
                    }`}
                    activeOpacity={0.85}
                  >
                    <View className="flex-1 flex flex-row items-center gap-4">
                      <Text className="text-3xl">{method.icon}</Text>
                      <View>
                        <Text className="font-JakartaBold text-gray-900">
                          {method.name}
                          {method.lastDigits && ` •••• ${method.lastDigits}`}
                        </Text>
                        {method.expiryDate && (
                          <Text className="text-gray-600 text-xs font-JakartaRegular mt-1">
                            Expires {method.expiryDate}
                          </Text>
                        )}
                      </View>
                    </View>
                    {method.isDefault && (
                      <View className="bg-orange-600 rounded-full px-3 py-1">
                        <Text className="text-white text-xs font-JakartaBold">Default</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Add New Payment Method */}
            <View className="px-6 pb-8">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
                Add Payment Method
              </Text>
              <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border-2 border-blue-200">
                <View className="space-y-3 mb-6">
                  <TextInput
                    placeholder="Card Number"
                    placeholderTextColor="#999"
                    className="bg-white rounded-2xl px-4 py-3 font-JakartaRegular text-gray-800 border border-blue-200"
                  />
                  <View className="flex flex-row gap-3">
                    <TextInput
                      placeholder="MM/YY"
                      placeholderTextColor="#999"
                      className="flex-1 bg-white rounded-2xl px-4 py-3 font-JakartaRegular text-gray-800 border border-blue-200"
                    />
                    <TextInput
                      placeholder="CVC"
                      placeholderTextColor="#999"
                      className="flex-1 bg-white rounded-2xl px-4 py-3 font-JakartaRegular text-gray-800 border border-blue-200"
                    />
                  </View>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    className="bg-white rounded-2xl px-4 py-3 font-JakartaRegular text-gray-800 border border-blue-200"
                  />
                </View>

                <TouchableOpacity className="bg-blue-600 rounded-3xl py-4 items-center justify-center active:opacity-80">
                  <Text className="font-JakartaBold text-white">Add Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {activeTab === "history" && (
          <>
            {/* Transaction History */}
            <View className="px-6 pb-8">
              <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
                Transaction History
              </Text>

              <View className="space-y-2">
                {transactions.map((transaction) => (
                  <TouchableOpacity
                    key={transaction.id}
                    className="bg-white border-2 border-gray-200 rounded-3xl p-4 flex flex-row items-center justify-between active:border-orange-400"
                    activeOpacity={0.85}
                  >
                    <View className="flex-1 flex flex-row items-center gap-4">
                      <Text className="text-3xl">{transaction.icon}</Text>
                      <View className="flex-1">
                        <Text className="font-JakartaSemiBold text-gray-900">
                          {transaction.title}
                        </Text>
                        <View className="flex flex-row items-center gap-2 mt-1">
                          <Text className="text-gray-600 text-xs font-JakartaRegular">
                            {transaction.date}
                          </Text>
                          <View
                            className={`px-2 py-0.5 rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-50"
                                : transaction.status === "pending"
                                  ? "bg-yellow-50"
                                  : "bg-red-50"
                            }`}
                          >
                            <Text
                              className={`text-xs font-JakartaBold ${
                                transaction.status === "completed"
                                  ? "text-green-700"
                                  : transaction.status === "pending"
                                    ? "text-yellow-700"
                                    : "text-red-700"
                              }`}
                            >
                              {transaction.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text
                      className={`font-JakartaBold text-lg ${
                        transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
