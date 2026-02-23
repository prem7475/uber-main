import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItem {
  id: string;
  category: string;
  items: Array<{
    id: string;
    icon: string;
    title: string;
    description?: string;
    value?: boolean;
    type: "toggle" | "link" | "button";
    action?: () => void;
  }>;
}

const Settings = () => {
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emergencyShare, setEmergencyShare] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settings: SettingItem[] = [
    {
      id: "account",
      category: "Account",
      items: [
        {
          id: "edit-profile",
          icon: "👤",
          title: "Edit Profile",
          description: "Update your personal information",
          type: "link",
          action: () => router.push("/(root)/profile"),
        },
        {
          id: "security",
          icon: "🔐",
          title: "Security & Privacy",
          description: "Manage password and security settings",
          type: "link",
          action: () => Alert.alert("Security", "Security settings panel"),
        },
        {
          id: "blocked-users",
          icon: "🚫",
          title: "Blocked Users",
          description: "Manage blocked drivers and passengers",
          type: "link",
          action: () => Alert.alert("Blocked Users", "View your blocked list"),
        },
      ],
    },
    {
      id: "notifications",
      category: "Notifications & Sound",
      items: [
        {
          id: "notifications-toggle",
          icon: "🔔",
          title: "Push Notifications",
          description: "Ride updates and promotions",
          type: "toggle",
          value: notifications,
          action: () => setNotifications(!notifications),
        },
        {
          id: "sound-toggle",
          icon: "🔊",
          title: "Sound Alerts",
          description: "Driver arrival and ride updates",
          type: "toggle",
          value: soundEnabled,
          action: () => setSoundEnabled(!soundEnabled),
        },
        {
          id: "promotional",
          icon: "📢",
          title: "Promotional Emails",
          description: "Special offers and new features",
          type: "link",
          action: () => Alert.alert("Email Preferences", "Manage email subscriptions"),
        },
      ],
    },
    {
      id: "safety",
      category: "Safety & Emergency",
      items: [
        {
          id: "emergency-contacts",
          icon: "⚠️",
          title: "Emergency Contacts",
          description: "Add trusted contacts for emergencies",
          type: "link",
          action: () => Alert.alert("Emergency Contacts", "Manage your emergency contacts"),
        },
        {
          id: "location-services",
          icon: "📍",
          title: "Location Services",
          description: "Required for accurate pickups",
          type: "toggle",
          value: locationServices,
          action: () => setLocationServices(!locationServices),
        },
        {
          id: "emergency-share",
          icon: "📤",
          title: "Share Trip Details",
          description: "Share your trip with emergency contacts",
          type: "toggle",
          value: emergencyShare,
          action: () => setEmergencyShare(!emergencyShare),
        },
        {
          id: "incident-report",
          icon: "📋",
          title: "Report Safety Incident",
          description: "Report an unsafe ride or driver",
          type: "link",
          action: () => Alert.alert("Report", "Filing safety incident report"),
        },
      ],
    },
    {
      id: "privacy",
      category: "Privacy & Data",
      items: [
        {
          id: "biometric",
          icon: "👆",
          title: "Biometric Login",
          description: "Use fingerprint or face ID",
          type: "toggle",
          value: biometric,
          action: () => setBiometric(!biometric),
        },
        {
          id: "download-data",
          icon: "📥",
          title: "Download My Data",
          description: "Get a copy of your personal data",
          type: "link",
          action: () => Alert.alert("Data Download", "Preparing your data export"),
        },
        {
          id: "delete-account",
          icon: "🗑️",
          title: "Delete Account",
          description: "Permanently delete your account",
          type: "button",
          action: () => {
            Alert.alert(
              "Delete Account",
              "Are you sure? This action cannot be undone.",
              [
                { text: "Cancel", onPress: () => {} },
                {
                  text: "Delete",
                  onPress: () =>
                    Alert.alert(
                      "Account Deleted",
                      "Your account has been permanently deleted"
                    ),
                  style: "destructive",
                },
              ]
            );
          },
        },
      ],
    },
    {
      id: "display",
      category: "Display & Appearance",
      items: [
        {
          id: "dark-mode",
          icon: "🌙",
          title: "Dark Mode",
          description: "Easy on the eyes",
          type: "toggle",
          value: darkMode,
          action: () => setDarkMode(!darkMode),
        },
        {
          id: "language",
          icon: "🌐",
          title: "Language",
          description: "Change app language",
          type: "link",
          action: () => Alert.alert("Language", "Select your preferred language"),
        },
      ],
    },
    {
      id: "about",
      category: "About & Legal",
      items: [
        {
          id: "about-app",
          icon: "ℹ️",
          title: "About RideHub",
          description: "Version 1.0.0",
          type: "link",
          action: () =>
            Alert.alert(
              "About RideHub",
              "RideHub Version 1.0.0\n© 2025 RideHub Inc."
            ),
        },
        {
          id: "terms",
          icon: "📖",
          title: "Terms of Service",
          description: "Read our terms",
          type: "link",
          action: () =>
            Linking.openURL("https://www.uber.com/legal/terms/us/"),
        },
        {
          id: "privacy-policy",
          icon: "🔒",
          title: "Privacy Policy",
          description: "How we use your data",
          type: "link",
          action: () =>
            Linking.openURL("https://www.uber.com/legal/privacy/us/"),
        },
        {
          id: "licenses",
          icon: "📜",
          title: "Open Source Licenses",
          description: "Third-party licenses",
          type: "link",
          action: () => Alert.alert("Licenses", "View open source licenses"),
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Log Out",
          onPress: () => {
            signOut();
            router.replace("/(auth)/sign-in");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View className="bg-gradient-to-b from-slate-600 to-slate-700 px-6 pt-8 pb-12 shadow-2xl">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            ⚙️ Settings
          </Text>
          <Text className="text-sm font-JakartaRegular text-slate-100">
            Customize your experience
          </Text>
        </View>

        {/* Settings Sections */}
        {settings.map((section) => (
          <View key={section.id} className="px-6 pt-8 pb-2">
            <Text className="text-xs font-JakartaBold text-gray-600 uppercase tracking-widest mb-4">
              {section.category}
            </Text>

            <View className="space-y-2">
              {section.items.map((item) => {
                if (item.type === "toggle") {
                  return (
                    <View
                      key={item.id}
                      className="bg-white border-2 border-gray-200 rounded-3xl px-5 py-4 flex flex-row items-center justify-between"
                    >
                      <View className="flex-1 flex flex-row items-center gap-4">
                        <Text className="text-2xl">{item.icon}</Text>
                        <View className="flex-1">
                          <Text className="font-JakartaSemiBold text-gray-900">
                            {item.title}
                          </Text>
                          {item.description && (
                            <Text className="text-gray-600 text-xs font-JakartaRegular mt-1">
                              {item.description}
                            </Text>
                          )}
                        </View>
                      </View>
                      <Switch
                        value={item.value || false}
                        onValueChange={() => item.action?.()}
                        trackColor={{ false: "#e5e7eb", true: "#86efac" }}
                        thumbColor={
                          item.value ? "#22c55e" : "#6b7280"
                        }
                      />
                    </View>
                  );
                }

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item.action}
                    className={`rounded-3xl px-5 py-4 flex flex-row items-center justify-between border-2 active:opacity-80 ${
                      item.type === "button"
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-gray-200"
                    }`}
                    activeOpacity={0.85}
                  >
                    <View className="flex-1 flex flex-row items-center gap-4">
                      <Text className="text-2xl">{item.icon}</Text>
                      <View className="flex-1">
                        <Text
                          className={`font-JakartaSemiBold ${
                            item.type === "button"
                              ? "text-red-700"
                              : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </Text>
                        {item.description && (
                          <Text className="text-gray-600 text-xs font-JakartaRegular mt-1">
                            {item.description}
                          </Text>
                        )}
                      </View>
                    </View>
                    <Text className="text-gray-400 text-lg">→</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View className="px-6 pt-8 pb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl py-5 items-center justify-center active:opacity-90 shadow-xl border-2 border-red-700"
            activeOpacity={0.85}
          >
            <Text className="font-JakartaBold text-white text-base">
              🚪 Log Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-6 pt-6 border-t border-gray-200 px-6 pb-4">
          <Text className="text-gray-500 text-xs font-JakartaRegular text-center">
            RideHub • Version 1.0.0
          </Text>
          <Text className="text-gray-400 text-xs font-JakartaRegular text-center mt-2">
            Made with ❤️ by Your Team
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
