// @ts-nocheck
import { FeatureCard, RegularCard } from "@/component/Card";
import Filters from "@/component/filters";
import Search from "@/component/Search";
import icons from "@/constants/icons";
// import images from "@/constants/images";
// import images from "@/constants/images";
// import { getCurrentUser } from "@/lib/Appwrite";
import { useGlobalContext } from "@/lib/global-provider";
// import { Link } from "expo-router";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getProperties } from "@/lib/Appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import NoResult from "@/component/NoResult";


export default function Explore() {
  const params = useLocalSearchParams<{ filter?: string, query?: string }>();

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter,
      query: params.query,
      limit: 20
    },
    // skip: true
  })

  useEffect(() => {
    refetch({
      filter: params.filter,
      query: params.query,
    });
  }, [params.filter, params.query])

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="seed" onPress={seed}/> */}
      <
        FlatList
        data={properties}
        renderItem={({item}) => (
            <RegularCard item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator className="text-primary-300 mt-5" size="large" />
          ) : <NoResult />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for your ideal home
              </Text>
              <Image source={icons.bell} className="w-6 h-6"/>
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
        />
    </SafeAreaView>
  );
}

