import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
// import { useLocalSearchParams } from 'expo-router'
import images from '@/constants/images';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertiesPage } from '@/lib/Appwrite';
import { router, useLocalSearchParams } from 'expo-router';
import icons from '@/constants/icons';
import { facilities } from '@/constants/data';
// @ts-nocheck

const Property = () => {

    const { id } = useLocalSearchParams();
    // console.log(id);

    // const id = (await params).id;

    const { data: property , loading, refetch } = useAppwrite({
      fn: getPropertiesPage,
      params: {
        propertyId: id as string,
      }
    })

    const windowsHeight = Dimensions.get("window").height

    // in trying to figure out how to use a section list
    //
    // const DATA = [
    //   {
    //     title: "fruits",
    //     data: [
    //       'Apple',
    //       'Orange',
    //       'Banana',
    //       'Orange',
    //     ]
    //   },
    //   {
    //     title: "Vegetable",
    //     data: [
    //       'Apple',
    //       'Orange',
    //       'Banana',
    //       'Orange',
    //     ]
    //   }
    // ]

  return (
    <ScrollView className='bg-white h-full relative'>
      <View className='relative w-full' style={{
        height: windowsHeight/2
      }}>
        <Image
          source={{ uri: property?.image }}
          className='size-full'
          resizeMode='cover'
        />
        <Image
          source={images.whiteGradient}
          className='absolute top-0 w-full z-40'
        />

        <View
          className='z-50 absolute inset-x-5'
          style={{
            top: Platform.OS === 'ios' ? 70 : 20
          }}>
          <View className='flex flex-row items-center w-full top-10 justify-between'>
            <TouchableOpacity
              onPress={() => router.back()}
              className='flex flex-row bg-blue-300 rounded-full size-11 items-center justify-center'
              >
                <Image source={icons.backArrow} className='size-5' />
            </TouchableOpacity>

            <View className='flex flex-row items-center gap-3'>
              <Image
                source={icons.heart}
                className='size-7'
                tintColor={"#191D31"}
              />
              <Image
                source={icons.send}
                className='size-7'
              />
            </View>
          </View>
        </View>
      </View>

      <View className='px-5 mt-7 flex gap-2'>
        <Text className='text-2xl font-rubik-bold'>{property?.name}</Text>
        <View className='flex flex-row items-center gap-3'>
          <View className='flex flex-row items-center justify-center px-4 py-2 bg-blue-100 rounded-full'>
            <Text className='text-xs font-rubik-extrabold text-primary-300 rounded-full flex items-center justify-center'>{property?.type}</Text>
          </View>

          <View className='flex flex-row items-center gap-2'>
            <Image
              source={icons.star}
              className='size-5'
            />
            <Text className='text-black-200 text-sm mt-1 font-rubik-medium flex items-center justify-center'>
              {property?.rating} ({property?.review?.length}){" "} reviews
            </Text>
          </View>
        </View>

        <View className='flex flex-row items-center mt-5'>
          <View className='flex flex-row items-center justify-center bg-blue-100 rounded-full size-10'>
            <Image
              source={icons.bed}
              className='size-4'
            />
          </View>

          <Text className='text-black-300 text-sm font-rubik-medium ml-2'>
            {property?.bedrooms}{" "}{
              property?.bedrooms?.length > 0 ? "Beds" : "Bed"
            }
          </Text>


          <View className='flex flex-row items-center justify-center bg-blue-100 rounded-full size-10 ml-7'>
            <Image
              source={icons.bath}
              className='size-4'
            />
          </View>

          <Text>
            {property?.bathroom.length}{" "}{
              property?.bathroom.length > 0 ? "reviews" : "review"
            }
          </Text>


          <View className='flex flex-row items-center justify-center bg-blue-100 rounded-full size-10 ml-7'>
            <Image
              source={icons.area}
              className='size-4'
            />
          </View>

          <Text className='text-black-300 text-sm font-rubik-medium ml-2'>
            {property?.area} sqft
          </Text>
        </View>

        
        <View className='flex flex-col items-start justify-center mt-5 pt-7 border-t-2 border-t-black-300'>
          <Text className='text-black-300 text-xl font-rubik-bold'>
            Agent
          </Text>

          <View className='flex flex-row items-center justify-between mt-4'>
            <View className='flex flex-row items-center'>
              <Image
                source={{ uri: property?.agent.avatar }}
                className='size-14 rounded-full'
              />
              <View className='flex flex-col items-start justify-center ml-3'>
                <Text className='text-black-300 text-lg text-start font-rubik-bold'>
                  {property?.agent.name}
                </Text>
                <Text className='text-black-300 text-lg text-start font-rubik-medium'>
                  {property?.agent.email}
                </Text>
              </View>
            </View>

            <View className='flex flex-row items-center gap-3 ml-3'>
              <Image
                source={icons.chat}
                className='size-7'
              />
              <Image
                source={icons.phone}
                className='size-7'
              />
            </View>
          </View>
        </View>

        <View className='mt-7'>
          <Text className='text-black-300 text-xl font-rubik-bold'>
            Overview
          </Text>

          <Text className='text-black-200 text-base font-rubik mt-2'>
            {property?.description}
          </Text>
        </View>

        <View className='mt-7'>
          <Text className='text-black-300 text-xl font-rubik-bold'>
            Facilities
          </Text>

          {
            property?.facilities.length > 0 && (
              <View className='flex flex-row flex-wrap items-start justify-start mt-2 gap-5'>
                {
                  property?.facilities.map(
                    (item: string, index: number) => {
                      const facility = facilities.find(
                        (facility) => facility.title === item
                      );

                      return (
                        <View key={index} className='flex flex-1 flex-col items-center min-w-16 max-w-20'>
                          <View className="size-14 bg-blue-100 rounded-full justify-center items-center flex">
                            <Image
                              source={facility ? facility.icon : icons.info}
                              className='size-6'
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            className='text-black-300 text-sm text-center font-rubik mt-1.5'
                            >
                              {item}
                          </Text>
                        </View>
                      )
                    }
                  )
                }
              </View>
            )
          }
        </View>
      </View>

      {/* {

      } */}
    </ScrollView>
  )
}

export default Property