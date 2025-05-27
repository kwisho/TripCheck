import * as React from 'react';
import { TextInput } from 'react-native-paper';

type Props = {
    label: string
    value: string
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' 
}

const FormInput = ({label, value, onChangeText, keyboardType='default' }: Props) : React.JSX.Element=> {
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    )
}
export default FormInput