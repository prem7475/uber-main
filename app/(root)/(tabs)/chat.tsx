import { ScrollView, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "driver";
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  driverId: string;
  driverName: string;
  driverRating: number;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount: number;
}

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      driverId: "driver1",
      driverName: "John Smith",
      driverRating: 4.9,
      lastMessage: "I'm 2 minutes away",
      timestamp: "2 min ago",
      avatar: "👨",
      isOnline: true,
      unreadCount: 0,
    },
    {
      id: "2",
      driverId: "driver2",
      driverName: "Sarah Johnson",
      driverRating: 4.8,
      lastMessage: "Thank you for the ride!",
      timestamp: "15 min ago",
      avatar: "👩",
      isOnline: false,
      unreadCount: 2,
    },
    {
      id: "3",
      driverId: "driver3",
      driverName: "Mike Chen",
      driverRating: 5.0,
      lastMessage: "Great pickup location",
      timestamp: "1 hour ago",
      avatar: "👨",
      isOnline: true,
      unreadCount: 0,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "driver",
      text: "Hi! I'm on my way to pick you up",
      timestamp: "10:30 AM",
      read: true,
    },
    {
      id: "2",
      sender: "user",
      text: "Thanks! Where are you now?",
      timestamp: "10:31 AM",
      read: true,
    },
    {
      id: "3",
      sender: "driver",
      text: "I'm 5 minutes away",
      timestamp: "10:32 AM",
      read: true,
    },
    {
      id: "4",
      sender: "driver",
      text: "I'm 2 minutes away",
      timestamp: "10:34 AM",
      read: true,
    },
    {
      id: "5",
      sender: "user",
      text: "Perfect, I'll be ready!",
      timestamp: "10:35 AM",
      read: true,
    },
  ];

  const currentConversation = selectedConversation
    ? conversations.find((c) => c.id === selectedConversation)
    : null;

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  if (currentConversation) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Chat Header */}
        <View className="bg-gradient-to-b from-blue-600 to-blue-700 px-6 pt-6 pb-4 shadow-2xl flex flex-row items-center justify-between">
          <TouchableOpacity onPress={() => setSelectedConversation(null)}>
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <View className="flex-1 mx-4">
            <Text className="text-white font-JakartaBold text-lg">
              {currentConversation.driverName}
            </Text>
            <Text className="text-blue-100 text-xs font-JakartaRegular">
              {currentConversation.isOnline ? "🟢 Online" : "🟡 Away"}
            </Text>
          </View>
          <View className="flex flex-row gap-3">
            <TouchableOpacity className="bg-white/20 rounded-full p-3 active:opacity-70">
              <Text className="text-white text-lg">📞</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/20 rounded-full p-3 active:opacity-70">
              <Text className="text-white text-lg">ℹ️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className={`mx-4 my-2 flex flex-row ${
                item.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <View
                className={`max-w-xs rounded-3xl px-4 py-2.5 ${
                  item.sender === "user"
                    ? "bg-blue-600 rounded-br-none"
                    : "bg-gray-200 rounded-bl-none"
                }`}
              >
                <Text
                  className={`font-JakartaRegular ${
                    item.sender === "user"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {item.text}
                </Text>
                <Text
                  className={`text-xs font-JakartaRegular mt-1 ${
                    item.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-600"
                  }`}
                >
                  {item.timestamp}
                </Text>
              </View>
            </View>
          )}
          scrollEnabled
          className="flex-1 px-2"
          contentContainerStyle={{ paddingVertical: 12 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input */}
        <View className="px-6 py-4 bg-white border-t border-gray-200">
          <View className="flex flex-row items-center gap-3">
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={messageInput}
              onChangeText={setMessageInput}
              className="flex-1 bg-gray-100 border-2 border-gray-200 rounded-3xl px-4 py-3 font-JakartaRegular text-gray-800"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-blue-600 rounded-full p-3 active:opacity-70"
              activeOpacity={0.85}
            >
              <Text className="text-white text-xl">📤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Header */}
        <View className="bg-gradient-to-b from-blue-600 to-blue-700 px-6 pt-6 pb-10 shadow-2xl">
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            💬 Messages
          </Text>
          <Text className="text-sm font-JakartaRegular text-blue-100 leading-5">
            Real-time chat with your drivers
          </Text>

          {/* Status Badge */}
          <View className="mt-6 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20 flex flex-row items-center gap-2">
            <Text className="text-blue-100 text-xs font-JakartaRegular uppercase tracking-wide">
              Status
            </Text>
            <Text className="text-white text-sm font-JakartaBold">
              🟢 Ready to receive messages
            </Text>
          </View>
        </View>

        {conversations.length > 0 ? (
          <View className="px-6 pt-8 pb-8">
            <Text className="text-lg font-JakartaBold text-gray-800 mb-4">
              Active Conversations
            </Text>
            <View className="space-y-3">
              {conversations.map((conv) => (
                <TouchableOpacity
                  key={conv.id}
                  onPress={() => setSelectedConversation(conv.id)}
                  className="bg-white border-2 border-gray-200 rounded-3xl p-5 flex flex-row items-center gap-4 active:border-blue-400"
                  activeOpacity={0.85}
                >
                  <View className="relative">
                    <View className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                      <Text>{conv.avatar}</Text>
                    </View>
                    {conv.isOnline && (
                      <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </View>

                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2 mb-1">
                      <Text className="font-JakartaBold text-gray-900">
                        {conv.driverName}
                      </Text>
                      <Text className="text-yellow-500">⭐</Text>
                      <Text className="text-gray-600 font-JakartaRegular text-sm">
                        {conv.driverRating}
                      </Text>
                    </View>
                    <Text className="text-gray-600 font-JakartaRegular text-sm">
                      {conv.lastMessage}
                    </Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-gray-500 text-xs font-JakartaRegular mb-2">
                      {conv.timestamp}
                    </Text>
                    {conv.unreadCount > 0 && (
                      <View className="bg-blue-600 rounded-full px-2.5 py-1">
                        <Text className="text-white text-xs font-JakartaBold">
                          {conv.unreadCount}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="flex flex-1 items-center justify-center px-6 py-20">
            <View className="w-24 h-24 rounded-3xl bg-blue-100 flex items-center justify-center mb-8 shadow-lg">
              <Text className="text-5xl">💬</Text>
            </View>

            <Text className="text-3xl font-JakartaBold text-black text-center leading-tight mb-4">
              No Messages Yet
            </Text>

            <Text className="text-gray-600 font-JakartaRegular text-center mb-8 text-sm leading-6 px-2">
              Once you complete your first ride, you'll be able to chat with drivers in real-time.
            </Text>

            <TouchableOpacity className="w-full bg-blue-600 rounded-3xl py-5 items-center justify-center shadow-xl active:opacity-90">
              <Text className="font-JakartaBold text-white text-base">
                🚕 Book Your First Ride
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
