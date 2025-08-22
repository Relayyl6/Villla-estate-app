// @ts-nocheck
import { FeatureCard, RegularCard } from "@/component/Card";
import Filters from "@/component/filters";
import Search from "@/component/Search";
import icons from "@/constants/icons";
// import images from "@/constants/images";
// import { getCurrentUser } from "@/lib/Appwrite";
import { useGlobalContext } from "@/lib/global-provider";
// import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const { user } = useGlobalContext();
  // const user = await account.get()
  console.log("Avatar URL:", name, user.email)
  return (
    <SafeAreaView className="bg-white h-full">
      <
        FlatList
        data={[1, 2, 3, 4]}
        renderItem={(item) => <RegularCard />}
        keyExtractor={(item) => item.toString() }
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user.avatar }}
                  alt="Profile picture"
                  // style={{ width: 50, height: 50 }}
                  className="size-12 border-black rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user.name}</Text>
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

              {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-5 mt-5">
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                </View>
              </ScrollView> */}
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={(item) => <FeatureCard/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="mt-5 gap-5 mt-5"
                // rowsWr="flex flex-row gap-5"
                bounces={false}
              />
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-blue-700">See All</Text>
              </TouchableOpacity>
            </View>

            <Filters />

            {/* <View className="flex-row flex-wrap gap-5 mt-2.5"> */}
              {/* <View className="w-1/2"> */}
                {/* <RegularCard /> */}
              {/* </View> */}
              {/* <View className="w-1/2"> */}
                {/* <RegularCard /> */}
              {/* </View> */}
            {/* </View> */}
            {/* <FeatureCard />
            <RegularCard /> */}
          </View>
        }
        />
    </SafeAreaView>
  );
}

