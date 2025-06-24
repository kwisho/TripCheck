import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: TextInputProps['returnKeyType'];
};

const FormInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  returnKeyType,
}: Props): React.JSX.Element => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
    />
  );
};
export default FormInput;
