import * as React from "react";
import { type ViewProps, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    fullWidth: {
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
        paddingHorizontal: 50
    }
});

export const Row: React.FC<ViewProps & { children?: React.ReactNode; fullWidth?: boolean }> = (props) => (
    <View {...props} style={[styles.row, props.style, props.fullWidth && styles.fullWidth]} />
);
