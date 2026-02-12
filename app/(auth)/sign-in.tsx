import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View, TouchableOpacity, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setForm({ ...form, email: value });
    if (value && !validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setForm({ ...form, password: value });
    if (value.length > 0 && value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(form.email)) {
      setEmailError("Invalid email format");
      return;
    }

    setIsLoading(true);
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

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, form]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Hero Section */}
        <View className="bg-gradient-to-b from-black via-gray-900 to-black px-6 pt-8 pb-12 shadow-2xl">
          <View className="mb-2 flex items-center justify-center">
            <View className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-xl mb-6">
              <Text className="text-3xl">🚗</Text>
            </View>
          </View>
          
          <Text className="text-5xl font-JakartaBold text-white text-center leading-tight mb-3">
            Welcome Back
          </Text>
          <Text className="text-base font-JakartaRegular text-gray-300 text-center leading-6">
            Sign in to your RideHub account and get back on the road
          </Text>
        </View>

        {/* Form Container */}
        <View className="px-6 py-10">
          {/* Email Section */}
          <View className="mb-6">
            <View className="flex flex-row items-center justify-between mb-4">
              <View className="flex flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Text className="text-lg">📧</Text>
                </View>
                <Text className="text-sm font-JakartaSemiBold text-gray-700">
                  Email Address
                </Text>
              </View>
              {form.email && !emailError && (
                <Text className="text-green-600 text-sm font-JakartaSemiBold">✓</Text>
              )}
            </View>
            <InputField
              placeholder="name@example.com"
              icon={icons.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={handleEmailChange}
            />
            {emailError && (
              <View className="flex flex-row items-center gap-2 mt-3 bg-red-50 px-4 py-3 rounded-2xl border border-red-200">
                <Text className="text-red-600 text-sm font-JakartaMedium">
                  ⚠️ {emailError}
                </Text>
              </View>
            )}
          </View>

          {/* Password Section */}
          <View className="mb-4">
            <View className="flex flex-row items-center justify-between mb-4">
              <View className="flex flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Text className="text-lg">🔐</Text>
                </View>
                <Text className="text-sm font-JakartaSemiBold text-gray-700">
                  Password
                </Text>
              </View>
              {form.password && !passwordError && (
                <Text className="text-green-600 text-sm font-JakartaSemiBold">✓</Text>
              )}
            </View>
            <InputField
              placeholder="••••••••"
              icon={icons.lock}
              secureTextEntry={!showPassword}
              textContentType="password"
              value={form.password}
              onChangeText={handlePasswordChange}
            />
            {passwordError && (
              <View className="flex flex-row items-center gap-2 mt-3 bg-red-50 px-4 py-3 rounded-2xl border border-red-200">
                <Text className="text-red-600 text-sm font-JakartaMedium">
                  ⚠️ {passwordError}
                </Text>
              </View>
            )}
          </View>

          {/* Forgot Password Link */}
          <View className="flex flex-row justify-end mb-8">
            <Link href="/">
              <View className="flex flex-row items-center gap-1">
                <Text className="text-blue-600 font-JakartaSemiBold text-sm">
                  Forgot password?
                </Text>
                <Text className="text-blue-600 text-sm">→</Text>
              </View>
            </Link>
          </View>

          {/* Sign In Button */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <CustomButton
              title={isLoading ? "⏳ Signing in..." : "🔓 Sign In"}
              onPress={onSignInPress}
              className="mb-6 shadow-lg"
            />
          </Animated.View>

          {/* Or Divider with enhanced styling */}
          <View className="flex flex-row items-center gap-4 my-8">
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Text className="text-gray-500 font-JakartaSemiBold text-xs uppercase tracking-wider">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </View>

          {/* Social Login */}
          <View className="mb-10">
            <OAuth />
          </View>

          {/* Sign Up CTA */}
          <View className="flex items-center bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <View className="flex flex-row items-center justify-center gap-2 mb-4">
              <View className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Text className="text-lg">✨</Text>
              </View>
              <Text className="text-gray-600 font-JakartaRegular text-sm">
                New to RideHub?
              </Text>
            </View>
            <Link href="/sign-up">
              <View className="bg-black rounded-2xl px-8 py-3 mb-3">
                <Text className="text-white font-JakartaBold text-center text-sm">
                  Create Account
                </Text>
              </View>
            </Link>
            <Text className="text-gray-500 font-JakartaRegular text-xs text-center">
              Get started and book your first ride
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
