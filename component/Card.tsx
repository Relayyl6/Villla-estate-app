import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { numberWithCommas } from '@/assets/lib/utils';
// import { Models } from 'react-native-appwrite';

// interface Props {
//     onPress: () => void;
//     title: string;
//     location: string;
//     price: string;
//     rating: number;
//     image: ImageSourcePropType;
//     category?: string;
// }

interface Props {
    item: {
        title: string;
        address: string;
        price: string;
        rating: number;
        category?: string;
        image: string; 
    }// Assuming image is a URL string};
    onPress: () => void;
}

export const FeatureCard = ({ item: {title, address, price, rating, image }, onPress}: Props) => { // we couldve just taken the item, instead of speading it like { item: Models.document, onPress } to be used as {{ uri: item.image }}
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex flex-col items-start w-60 h-80 relative'
            >
            <Image
                source={{ uri: image }}
                className='rounded-2xl size-full'
                resizeMode='cover'
            />
            <Image
                source={images.cardGradient}
                className='size-full absolute bottom-0 rounded-2xl'
            />
            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image
                    source={icons.star}
                    className='size-3.5 mr-1'
                />
                <Text className='text-xs font-rubik-bold text-primary-300'>{rating}</Text>
            </View>

            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                <Text className="text-xl items-start font-rubik-extrabold text-white" numberOfLines={1}>
                    {title}
                </Text>
                <Text className="text-base fnot-rubik text-white">
                    {address}
                </Text>

                <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-xl font-rubik-extrabold text-white">
                        ${numberWithCommas(price)}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="size-5"
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}



export const RegularCard = ({ onPress, item: {title, address, price, rating, category, image }}: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'>

            <View className="flex flex-row items-center absolute px-2 top-5 left-5 bg-white/90 p-1 rounded-full z-50">
                <Text className='text-xs font-rubik-bold text-primary-300'>{category}</Text>
            </View>

            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
                <Image
                    source={icons.star}
                    className='size-2.5 mr-0.5'
                />
                <Text className='text-xs font-rubik-bold text-primary-300'>{rating}</Text>
            </View>

            <Image
                source={{  uri: image }}
                className='w-full h-40 rounded-lg'
            />

            <View className="flex flex-col mt-2">
                <Text className="text-base font-rubik-bold text-black-300">
                    {title}
                </Text>
                <Text className="text-xs font-rubik text-black-200">
                    {address}
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-200">
                        ${numberWithCommas(price)}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="w-5 h-5 mr-2"
                        tintColor="#191d31"
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

