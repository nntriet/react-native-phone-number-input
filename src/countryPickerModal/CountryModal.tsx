import * as React from "react";
import { type ModalProps, Platform, SafeAreaView, StyleSheet } from "react-native";
import AnimatedModal from "./AnimatedModal";
import { CountryModalContext } from "./CountryModalProvider";
import { useTheme } from "./CountryTheme";
import { Modal } from "./Modal";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const CountryModal = ({
    animationType = "slide",
    withModal = true,
    disableNativeModal = false,
    children,
    ...props
}: ModalProps & {
    children: React.ReactNode;
    withModal?: boolean;
    disableNativeModal?: boolean;
}) => {
    const { backgroundColor } = useTheme();
    const { teleport } = React.useContext(CountryModalContext);
    const content = <SafeAreaView style={[styles.container, { backgroundColor }]}>{children}</SafeAreaView>;
    React.useEffect(() => {
        if (disableNativeModal) {
            teleport!(<AnimatedModal {...props}>{content}</AnimatedModal>);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disableNativeModal]);
    if (withModal) {
        if (Platform.OS === "web") {
            return (
                <Modal animationType={animationType} {...props}>
                    {content}
                </Modal>
            );
        }
        if (disableNativeModal) {
            return null;
        }
        return (
            <Modal animationType={animationType} {...props}>
                {content}
            </Modal>
        );
    }
    return content;
};

export default CountryModal;
