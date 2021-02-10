import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import {FreeStyleLibreSDK} from '@kilohealth/rn-freestylelibre-sdk';

class AppV2Iso15693 extends React.Component {
  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmount() {
    this._cleanUp();
  }

  render() {
    const renderButton = (onPress, text) => (
      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={{padding: 20}}>
        <Text>NFC Demo</Text>
        {renderButton(
          () =>
            FreeStyleLibreSDK.readPatch('tag read').then((x) => console.log(x)),
          'Read patch',
        )}
        {renderButton(
          () =>
            FreeStyleLibreSDK.activatePatch('tag activation').then((x) =>
              console.log(x),
            ),
          'Activate patch',
        )}
        {renderButton(
          () =>
            FreeStyleLibreSDK.getPatchInfo('tag state').then((x) =>
              console.log(x),
            ),
          'Get sensor state',
        )}
        {renderButton(FreeStyleLibreSDK.cleanUp, 'Clean up')}
      </View>
    );
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };
}

export default AppV2Iso15693;
