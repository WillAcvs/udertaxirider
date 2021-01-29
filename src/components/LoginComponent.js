import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { colors } from '../common/theme';
import { loginPage } from '../common/key';
var { width } = Dimensions.get('window');
import languageJSON from '../common/language';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: true,
            passwordValid: true,
            pwdErrorMsg: ''
        }
    }

    //validation for email
    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid })
        emailValid || this.emailInput.shake()
        return emailValid
    }

    //validation for password
    validatePassword() {
        const { complexity } = this.props
        const { password } = this.state
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if (complexity == 'any') {
            var passwordValid = password.length >= 1;
            this.setState({ pwdErrorMsg: languageJSON.password_blank_messege })
        }
        else if (complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({ pwdErrorMsg: languageJSON.password_alphaNumeric_check });
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({ pwdErrorMsg: languageJSON.password_complexity_check })
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }

    //login press for validation check
    onPressLogin() {
        const { onPressLogin } = this.props;
        LayoutAnimation.easeInEaseOut();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();

        if (emailValid && passwordValid) {
            onPressLogin(this.state.email, this.state.password);
            this.setState({ email: '', password: '' })
        }
    }

    render() {
        const { onPressRegister, onPressForgotPassword } = this.props;

        return (
            <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>

                <View style={styles.card}>
                    <Text style={styles.titleCard}>Ingresar</Text>

                    <Input
                        ref={input => (this.emailInput = input)}
                        editable
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.email_placeholder}
                        placeholderTextColor={colors.BLACK}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        // inputStyle={styles.inputTextStyle}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                        errorMessage={this.state.emailValid ? null : languageJSON.valid_email_check}
                        secureTextEntry={false}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { this.validateEmail(); this.passwordInput.focus() }}
                        errorStyle={styles.errorMessageStyle}
                        inputContainerStyle={styles.inputTextStyle}
                        containerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.password_placeholder}
                        placeholderTextColor={colors.BLACK}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        secureTextEntry={true}
                        onSubmitEditing={() => { this.validatePassword() }}
                        errorStyle={styles.errorMessageStyle}
                        inputContainerStyle={styles.inputTextStyle}
                        containerStyle={styles.inputContainerStyle}
                    />
                    <View style={{ width: "100%", padding: 15, }} />
                    <Button
                        title={languageJSON.login_button}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonTitleStyle}
                        onPress={() => { this.onPressLogin() }}
                        buttonStyle={{ marginBottom: 10 }}
                    // containerStyle={styles.loginButtonContainer}
                    />


                    <Button
                        clear
                        title={languageJSON.register_link}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.forgotTitleStyle}
                        onPress={onPressRegister}
                        buttonStyle={{ backgroundColor: "#efefef", marginBottom: 10 }}
                    />

                    <Button
                        clear
                        title={languageJSON.forgot_password_link}
                        loading={false}
                        onPress={onPressForgotPassword}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.forgotTitleStyle}
                        titleProps={{ numberOfLines: 2, ellipsizeMode: 'tail' }}
                        buttonStyle={{ backgroundColor: "white" }}
                    // containerStyle={{ flex: 1 }}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    /** Styles Card */
    card: {
        width: "100%",
        flex: 1,
        backgroundColor: "white",
        padding: 15,
        marginTop: 150,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    titleCard: {
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 10,
    },
    inputContainerStyle: {
        width: "100%",
        padding: 10,
        backgroundColor: "#efefef",
        borderRadius: 15,
        shadowColor: "#efefef",
        marginBottom: 10
    },
    inputTextStyle: {
        borderColor: "transparent",
        paddingLeft: 10
    },
    buttonContainer: {
        flexDirection: 'column',
    },
    loginButtonContainer: {
        width: "100%",
        height: "70%"
    },
    loginButtonStyle: {
        backgroundColor: colors.SKY,
        height: 45,
        borderRadius: 5,
        marginTop: 10,
        borderBottomLeftRadius: 5,
    },
    buttonStyle: {
        backgroundColor: colors.BLUE.default.secondary,
        height: "100%"
    },
    emailInputContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: colors.WHITE,
        width: "100%",
        padding: 30,
    },
    pwdInputContainer: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        width: "100%",
        padding: 30,
    },
    emailInputContainerStyle: {
        borderBottomColor: colors.BLACK,
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    errorMessageStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: "#FD2323"
    },
    inputTextStyle: {
        color: colors.BLACK,
        fontSize: 13,
        width: "100%",
        borderBottomColor: "transparent",
        backgroundColor: "#efefefef",
        paddingLeft: 15,
    },
    pwdInputContainerStyle: {
        paddingBottom: 15
    },
    buttonTitleStyle: {
        fontWeight: "700",
        width: "100%"
    },
    forgotTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        width: "100%",
        color: "black",
    },
    buttonContainerStyle: {
        flex: 1
    },

}); 
