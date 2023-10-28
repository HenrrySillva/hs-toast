import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Toast } from '../lib';

Toast.addIcon(({ color }) => <MaterialCommunityIcons name='abacus' color={color} />).show('AAAAAAAAA')