import {
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppwrite";
import PostCard from "../../components/PostCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, isLoading, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="p-2"
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-start flex-row mb-2">
              <View className="">
                <Text className="text-lg text-gray-100 font-pmedium">
                  Welcome!!
                </Text>
                <Text className="text-3xl text-gray-100 font-psemibold">
                  {user?.username ?? "User"}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="container"
                  className="w-10 h-12"
                />
              </View>
            </View>

            <SearchInput placeholder={"Search for the posts"} />

            <View className=" w-full pt-5 pb-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Trending Posts
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Posts"}
            description={"Be the first one to post!!"}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
