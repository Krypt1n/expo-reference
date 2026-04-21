import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {AppContext} from "../Context/AppContext";
import ChannelItem from "./ChannelItem";

const ChannelList = () => {
    const {channels} = useContext(AppContext)
    return (
            <FlatList data={channels} renderItem={({item}) => (
                <ChannelItem channelName={item} />
            )}/>
    );
};

export default ChannelList;