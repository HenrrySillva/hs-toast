import { useEffect, useRef } from "react";
/** @ts-ignore */
import { Text, Animated, Easing } from "react-native";
import { TypeToast } from "../../utils/@types";
import { createStylesToastContainer } from "./styles";
import { TIME_ANIMATION } from "../../utils/@const";


interface IPropsToastContainer {
    message: string
    index: number
    options: TypeToast.DefaultOptions
}
export function ToastContainer({ message, index, options }: IPropsToastContainer) {

    const fade = useRef(new Animated.Value(0)).current;
    const styles = createStylesToastContainer({ index, theme: options.theme, position: options.position });

    function _handleDismount() {
        setTimeout(() => {
            Animated.timing(fade, {
                toValue: 0,
                duration: TIME_ANIMATION,
                useNativeDriver: false,
                easing: Easing.linear
            }).start();
        }, options.duration)
    }
    useEffect(() => {
        Animated.timing(fade, {
            toValue: 0.8,
            duration: TIME_ANIMATION,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease)
        }).start(options.duration ? _handleDismount : undefined);
    }, [fade])

    return (
        <Animated.View
            style={{ ...styles.container, ...styles.shadowStyle, opacity: fade }}>

            {options.Icon &&
                <options.Icon size={24} color={options.theme === 'dark' ? '#FFF' : '#000'} />
            }
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    )
}
