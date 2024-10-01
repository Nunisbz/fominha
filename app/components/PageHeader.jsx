import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const PageHeader = ({ navigationLink, pageTitle }) => {
    return (
        <View style={styles.headerContainer}>
            <Link href={navigationLink}>
                <Image style={styles.backIcon} source={require('../assets/seta.png')} />
            </Link>
            <Text style={styles.headerText}>{pageTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#4682B4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        height: 120,
    },
    backIcon: {
        width: 40,
        height: 40,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default PageHeader;
