import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButtons";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
      >
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[80px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="w-full flex items-center">
            <Text className="text-3xl text-center text-white font-bold">
              Endless Possibilities with{" "}
              <Text className="text-secondary">Thera!</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 right-14"
              resizeMode="contain"
            />
          </View>
          <Text className="text-md text-center text-white mt-4">
            Enter the world of creativity where freedom of speech is promised
            and that promise is kept!!
          </Text>

          <CustomButton
            title="Get Started with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-4"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
