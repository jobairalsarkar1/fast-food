import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
const SignIn = () => {
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const submit = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Please fill all fields");
    setIsSubmitting(true);
    try {
      // Sign In function
      await signIn({ email, password });
      Alert.alert("Success", "You have signed in successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter you email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter you password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" isLoading={isSubmiting} onPress={submit} />

      <View className="flex justify-center mt-2 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account ?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
