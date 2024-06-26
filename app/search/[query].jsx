import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppwrite";
import PostCard from "../../components/PostCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  useEffect(() => {
    if (!query) {
      Alert.alert("Please enter a search query");
    }
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="p-2"
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="">
              <Text className="text-lg text-gray-100 font-pmedium">
                Search results for
              </Text>
              <Text className="text-3xl text-gray-100 font-psemibold">
                {query}
              </Text>
              <View className="mt-4 mb-6">
                <SearchInput
                  initialQuery={query}
                  placeholder={"Search for the posts"}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos Found"}
            description={"Search Instead for something else"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
