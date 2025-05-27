import { Button } from "react-native-paper"
import { StyleSheet } from 'react-native';

type Props ={
    mode?: 'text' | 'outlined' | 'contained'
    onPress: () => void
    title: string
    disabled?:boolean
}

const FormButton = ({mode, onPress, title,disabled=false}: Props) => {
    return (
        <Button 
        mode={mode}
         onPress={onPress}
         disabled={disabled}
         style={styles.button}
         >
            {title}
        </Button>
    )
}

export default FormButton

const styles = StyleSheet.create({
    button: {
        marginTop: 8
    }
})