import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View, TouchableOpacity, Animated } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const scaleAnim = new Animated.Value(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (value.length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
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
    if (value.length > 0 && !validatePassword(value)) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(form.email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!validatePassword(form.password)) {
      setPasswordError("Password must be at least 8 characters");
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
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    if (verification.code.length !== 6) {
      setVerification({
        ...verification,
        error: "Enter the complete 6-digit code",
      });
      return;
    }

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        console.log("User registered via email:", {
          name: form.name,
          email: form.email,
          clerkId: completeSignUp.createdUserId,
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
        setShowSuccessModal(true);
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Hero Section */}
        <View className="bg-gradient-to-b from-black via-gray-900 to-black px-6 pt-8 pb-12 shadow-2xl">
          <View className="mb-2 flex items-center justify-center">
            <View className="w-16 h-16 rounded-3xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl mb-6">
              <Text className="text-3xl">✨</Text>
            </View>
          </View>

          <Text className="text-5xl font-JakartaBold text-white text-center leading-tight mb-3">
            Create Account
          </Text>
          <Text className="text-base font-JakartaRegular text-gray-300 text-center leading-6">
            Join millions of riders and get your first ride today
          </Text>
        </View>

        {/* Form Container */}
        <View className="px-6 py-10">
          {/* Name Section */}
          <View className="mb-6">
            <View className="flex flex-row items-center justify-between mb-4">
              <View className="flex flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Text className="text-lg">👤</Text>
                </View>
                <Text className="text-sm font-JakartaSemiBold text-gray-700">
                  Full Name
                </Text>
              </View>
              {form.name && !nameError && (
                <Text className="text-green-600 text-sm font-JakartaSemiBold">✓</Text>
              )}
            </View>
            <InputField
              placeholder="John Doe"
              icon={icons.person}
              value={form.name}
              onChangeText={handleNameChange}
            />
            {nameError && (
              <View className="flex flex-row items-center gap-2 mt-3 bg-red-50 px-4 py-3 rounded-2xl border border-red-200">
                <Text className="text-red-600 text-sm font-JakartaMedium">
                  ⚠️ {nameError}
                </Text>
              </View>
            )}
          </View>

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
              placeholder="you@example.com"
              icon={icons.email}
              textContentType="emailAddress"
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
          <View className="mb-8">
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
              secureTextEntry={true}
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
            <Text className="text-gray-500 text-xs font-JakartaRegular mt-3">
              💡 Use at least 8 characters for security
            </Text>
          </View>

          {/* Create Account Button */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <CustomButton
              title={isLoading ? "⏳ Creating account..." : "✨ Create Account"}
              onPress={onSignUpPress}
              className="mb-6 shadow-lg"
            />
          </Animated.View>

          {/* Or Divider */}
          <View className="flex flex-row items-center gap-4 my-8">
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Text className="text-gray-500 font-JakartaSemiBold text-xs uppercase tracking-wider">
              or sign up with
            </Text>
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </View>

          {/* Social Login */}
          <View className="mb-10">
            <OAuth />
          </View>

          {/* Sign In Link CTA */}
          <View className="flex items-center bg-gradient-to-r from-blue-50 to-blue-50 rounded-3xl p-6 border border-blue-200">
            <View className="flex flex-row items-center justify-center gap-2 mb-4">
              <View className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Text className="text-lg">🔑</Text>
              </View>
              <Text className="text-gray-700 font-JakartaRegular text-sm">
                Already have an account?
              </Text>
            </View>
            <Link href="/sign-in">
              <View className="bg-black rounded-2xl px-8 py-3 mb-3">
                <Text className="text-white font-JakartaBold text-center text-sm">
                  Sign In Instead
                </Text>
              </View>
            </Link>
            <Text className="text-gray-600 font-JakartaRegular text-xs text-center">
              Welcome back! Let's get you riding
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="flex-1 justify-center px-4">
          <View className="bg-white rounded-3xl p-8 shadow-2xl">
            <View className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 self-center">
              <Text className="text-3xl">📬</Text>
            </View>

            <Text className="text-2xl font-JakartaBold text-black text-center mb-2">
              Verify Email
            </Text>
            <Text className="text-gray-600 font-JakartaRegular text-center mb-8 text-sm leading-5">
              We sent a 6-digit code to {"\n"}
              <Text className="font-JakartaBold text-black">{form.email}</Text>
            </Text>

            <InputField
              label="Verification Code"
              icon={icons.lock}
              placeholder="000000"
              value={verification.code}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(code) =>
                setVerification({ ...verification, code, error: "" })
              }
            />

            {verification.error && (
              <View className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 mt-4">
                <Text className="text-red-700 font-JakartaMedium text-sm">
                  ❌ {verification.error}
                </Text>
              </View>
            )}

            <CustomButton
              title={isLoading ? "⏳ Verifying..." : "✅ Verify Code"}
              onPress={onPressVerify}
              className="mb-4"
            />

            <TouchableOpacity
              onPress={() => setVerification({ ...verification, state: "default" })}
              className="py-3 active:opacity-70"
            >
              <Text className="text-center text-gray-600 font-JakartaSemiBold text-sm">
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal
        isVisible={showSuccessModal}
        backdropOpacity={0.5}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View className="flex-1 justify-center px-4">
          <View className="bg-white rounded-3xl p-8 shadow-2xl items-center">
            <View className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-8">
              <Text className="text-5xl">🎉</Text>
            </View>

            <Text className="text-3xl font-JakartaBold text-black text-center mb-3">
              Welcome!
            </Text>

            <Text className="text-gray-600 font-JakartaRegular text-center mb-10 text-sm leading-5">
              Your account is all set. Let's get you{"\n"}on the road and riding!
            </Text>

            <CustomButton
              title="🚗 Start Riding"
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/home");
              }}
              className="w-full"
            />
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default SignUp;
