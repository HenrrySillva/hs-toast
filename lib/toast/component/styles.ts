import { StyleSheet, Dimensions } from 'react-native';
import { TypeToast } from "../../utils/@types";
import { HEIGHT_TOOLBAR } from '../../utils/@const';

const height = Dimensions.get('screen').height;
const _calHeightTop = height - HEIGHT_TOOLBAR;
const _calHeightCenter = (height / 2) + HEIGHT_TOOLBAR;


export const createStylesToastContainer = ({ index, theme, position }: TypeToast.ParamsStyleSheet) => {

    const _bottomValue: Record<number, number> = {
        0: _calHeightCenter - (index * 53),
        1: _calHeightTop - (index * 53),
        2: 47 + (index * 60)
    };

    return StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: _bottomValue[position],
            flexDirection: 'row',
            gap: 6,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 25,
            paddingRight: 25,
            alignSelf: 'center',
            backgroundColor: theme === 'dark' ? '#000000' : '#CCCCCC',
            borderRadius: 20,
            zIndex: 99999,
            height: 45,
            marginLeft: 10,
            marginRight: 10,
        },
        text: {
            fontSize: 16,
            color: theme === 'dark' ? '#FFFFFF' : '#000000',
            textAlign: 'center'
        },
        shadowStyle: {
            shadowColor: theme === 'dark' ? '#000000' : '#CCCCCC',
            shadowOffset: {
                width: 4,
                height: 4
            },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 10
        }
    })
}