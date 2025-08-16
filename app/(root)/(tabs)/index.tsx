// @ts-nocheck
import { FeatureCard, RegularCard } from "@/component/Card";
import Filters from "@/component/filters";
import Search from "@/component/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
// import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32'>
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
              <Image
                source={images.avatar}
                className="size-12 rounded-full" />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                <Text className="text-base font-rubik-medium text-black-300">Leonard Oseghale</Text>
              </View>
            </View>
            <Image
              source={icons.bell}
              className="size-6"
            />
          </View>


          <Search />

          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-blue-700">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View className="flex flex-row gap-5 mt-5">
                  <FeatureCard />
                  <FeatureCard />
                  <FeatureCard />
                  <FeatureCard />
              </View>
            </ScrollView>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-blue-700">See All</Text>
            </TouchableOpacity>
          </View>

          <Filters />

          <View className="flex-row flex-wrap gap-5 mt-2.5">
            {/* <View className="w-1/2"> */}
              <RegularCard />
            {/* </View> */}
            {/* <View className="w-1/2"> */}
              <RegularCard />
            {/* </View> */}
          </View>
          {/* <FeatureCard />
          <RegularCard /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

