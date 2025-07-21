import { navigate } from 'expo-router/build/global-state/routing';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      {/* ユーザーアイコン */}
      <Avatar.Image
        size={96}
        source={require('@/assets/images/avatar.png')}
        style={styles.avatar}
      />

      {/* ユーザー名 */}
      <Text variant="titleLarge" style={styles.name}>
        kawai_shota
      </Text>

      {/* メールアドレス */}
      <Text variant="bodyMedium" style={styles.email}>
        example@example.com
      </Text>

      {/* プロフィールを編集 */}
      <Button mode="outlined" onPress={() => console.log('プロフィール編集')} style={styles.button}>
        プロフィールを編集
      </Button>

      {/* 設定へ遷移 */}
      <Button mode="outlined" onPress={() => navigate('/setting/account')} style={styles.button}>
        設定
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 24,
    color: '#666',
  },
  button: {
    width: '90%',
    marginBottom: 12,
  },
});
