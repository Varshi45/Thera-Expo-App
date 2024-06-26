import { ScrollView, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButtons";
import { signIn, createUser, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="flex-1 mx-4">
        <View className="w-full min-h-[90vh] justify-center">
          <Text className="mt-5 text-3xl font-psemibold text-white">
            Log in to <Text className="text-secondary">Thera!</Text>
          </Text>

          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <CustomButton
            title="Log in"
            containerStyles="mt-5"
            textStyles=""
            handlePress={submitForm}
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row">
            <Text className="text-white text-md font-pregular text-center mt-5">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-secondary">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
