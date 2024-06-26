// postcard.jsx

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useRef } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const PostCard = ({ post: { title, thumbnail, video, creator } }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setPlay(false);
      videoRef.current.stopAsync();
    }
  };

  // Ensure creator exists before accessing its properties
  const username = creator ? creator.username : "Unknown User";
  const avatar = creator ? creator.avatar : null; // Assuming avatar is part of creator

  return (
    <View className="flex-col items-center p-4 rounded-lg">
      <View className="flex-row items-start gap-3">
        <View className="items-center flex-row flex-1">
          <View className="w-[50px] h-[50px] rounded-lg items-center justify-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center ml-2">
            <Text
              numberOfLines={1}
              className="text-sm text-white font-psemibold"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-sm text-secondary font-psemibold"
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="w-8 h-8 rounded-lg items-center justify-center">
          <Image source={icons.menu} resizeMode="contain" className="w-6 h-6" />
        </View>
      </View>

      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: video }}
          className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 mt-3 justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-lg mt-2"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
