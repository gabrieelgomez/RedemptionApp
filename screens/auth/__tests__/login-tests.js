import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../LoginScreen';

// Verify changing username field updates local property
it('update username onChange', () => {
    let loginComponent = renderer.create(<LoginScreen/>).getInstance()
    
    loginComponent.handleUsernameChange('some_username')

    expect(loginComponent.state.username).toEqual('some_username')
})

// Verify changing password field updates local property
it('update password onChange', () => {
    let loginComponent = renderer.create(<LoginScreen/>).getInstance()
    
    loginComponent.handlePasswordChange('some_password')

    expect(loginComponent.state.password).toEqual('some_password')
})