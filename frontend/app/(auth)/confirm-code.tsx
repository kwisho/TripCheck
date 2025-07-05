import { confirmSignUp } from '@/auth/confirmSignUp';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function ConfirmCodeScreen() {
  const [code, setCode] = useState('');
  const { email } = useLocalSearchParams();

  const onPressConfirm = async () => {
    if (!email || !code) {
      Alert.alert('メールアドレスとパスワードを確認して下さい。');
    }
    try {
      await confirmSignUp(email as string, code);
      Alert.alert('成功！');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput label="確認コード" value={code} onChangeText={setCode} keyboardType="numeric" />
      <Button onPress={onPressConfirm} disabled={!email || !code}>
        確認
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
