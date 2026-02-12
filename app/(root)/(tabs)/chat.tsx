import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Header */}
        <View className="bg-gradient-to-b from-black via-gray-800 to-gray-900 px-6 pt-6 pb-10 shadow-2xl">
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            💬 Messages
          </Text>
          <Text className="text-sm font-JakartaRegular text-gray-300 leading-5">
            Real-time chat with drivers
          </Text>

          {/* Status Badge */}
          <View className="mt-6 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20 flex flex-row items-center gap-2">
            <Text className="text-gray-300 text-xs font-JakartaRegular uppercase tracking-wide">
              Status
            </Text>
            <Text className="text-white text-sm font-JakartaBold">
              🟢 Ready to receive messages
            </Text>
          </View>
        </View>

        {/* Empty State */}
        <View className="flex flex-1 items-center justify-center px-6 py-20">
          <View className="w-24 h-24 rounded-3xl bg-blue-100 flex items-center justify-center mb-8 shadow-lg">
            <Text className="text-5xl">💬</Text>
          </View>

          {/* Main Message */}
          <Text className="text-3xl font-JakartaBold text-black text-center leading-tight mb-4">
            No Messages Yet
          </Text>

          {/* Subtitle */}
          <Text className="text-gray-600 font-JakartaRegular text-center mb-8 text-sm leading-6 px-2">
            Once you complete your first ride, you'll be able to chat with drivers in real-time for updates and coordination.
          </Text>

          {/* How It Works Card */}
          <View className="w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl p-6 mb-10 shadow-lg border-2 border-blue-300">
            <View className="flex flex-row items-center gap-3 mb-5">
              <View className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Text className="text-white text-lg font-bold">?</Text>
              </View>
              <Text className="text-base font-JakartaBold text-blue-900">
                How Messaging Works
              </Text>
            </View>

            <View className="space-y-4">
              <View className="flex flex-row gap-4">
                <View className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                  <Text className="text-white font-JakartaBold text-sm">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-JakartaSemiBold text-blue-900 text-sm mb-1">
                    Book a Ride
                  </Text>
                  <Text className="text-xs font-JakartaRegular text-blue-800">
                    Request your first ride to unlock messaging
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-4">
                <View className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                  <Text className="text-white font-JakartaBold text-sm">2</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-JakartaSemiBold text-blue-900 text-sm mb-1">
                    Get Driver Info
                  </Text>
                  <Text className="text-xs font-JakartaRegular text-blue-800">
                    Receive real-time driver location & ETA
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-4">
                <View className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                  <Text className="text-white font-JakartaBold text-sm">3</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-JakartaSemiBold text-blue-900 text-sm mb-1">
                    Direct Chat
                  </Text>
                  <Text className="text-xs font-JakartaRegular text-blue-800">
                    Message safely with encrypted chat
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Features Grid */}
          <View className="w-full mb-8">
            <Text className="text-sm font-JakartaBold text-gray-700 uppercase tracking-wider mb-4">
              Chat Features
            </Text>

            <View className="flex flex-row gap-3">
              <View className="flex-1 bg-white border-2 border-gray-200 rounded-3xl p-4 items-center">
                <Text className="text-2xl mb-2">📍</Text>
                <Text className="text-xs font-JakartaSemiBold text-gray-800 text-center">
                  Live Location
                </Text>
              </View>

              <View className="flex-1 bg-white border-2 border-gray-200 rounded-3xl p-4 items-center">
                <Text className="text-2xl mb-2">⏱️</Text>
                <Text className="text-xs font-JakartaSemiBold text-gray-800 text-center">
                  ETA Updates
                </Text>
              </View>

              <View className="flex-1 bg-white border-2 border-gray-200 rounded-3xl p-4 items-center">
                <Text className="text-2xl mb-2">🔒</Text>
                <Text className="text-xs font-JakartaSemiBold text-gray-800 text-center">
                  Secure Chat
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity className="w-full bg-black rounded-3xl py-5 items-center justify-center shadow-xl active:opacity-90">
            <Text className="font-JakartaBold text-white text-base">
              🚕 Book Your First Ride
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
