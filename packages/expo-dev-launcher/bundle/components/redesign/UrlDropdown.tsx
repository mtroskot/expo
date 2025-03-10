import {
  Button,
  Text,
  TextInput,
  Row,
  Spacer,
  View,
  useExpoTheme,
  ChevronRightIcon,
} from 'expo-dev-client-components';
import * as React from 'react';
import { TextInput as NativeTextInput, Platform } from 'react-native';

import { validateUrl } from '../../functions/validateUrl';
import { useThrottle } from '../../hooks/useDebounce';
import { clientUrlScheme } from '../../native-modules/DevLauncherInternal';

type UrlDropdownProps = {
  onSubmit: (url: string) => void;
};

export function UrlDropdown({ onSubmit }: UrlDropdownProps) {
  const theme = useExpoTheme();
  const ref = React.useRef<NativeTextInput>();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const rotate = open ? '90deg' : '0deg';
  // slight visual adjustment for centering icon
  const translateX = -3;
  const arrowStyle = { transform: [{ translateX }, { rotate }] };

  const onConnectPress = () => {
    onSubmit(inputValue);
    ref.current.blur();
  };

  const onTogglePress = () => {
    setOpen(!open);
  };

  const isValidUrl = useThrottle(validateUrl(inputValue), 500);

  return (
    <View rounded="large">
      <Button.ScaleOnPressContainer
        onPress={onTogglePress}
        bg="default"
        roundedTop="none"
        roundedBottom={open ? 'none' : 'large'}>
        <Row align="center" padding="medium">
          <ChevronRightIcon style={arrowStyle} />
          <Spacer.Horizontal size="tiny" />
          <Text size="large">Enter URL manually</Text>
        </Row>
      </Button.ScaleOnPressContainer>

      {open && (
        <View px="medium" py="medium" bg="default" roundedBottom="large">
          <View
            border="default"
            rounded="medium"
            py={Platform.select({ android: 'tiny', ios: 'medium' })}
            px="medium"
            shadow="micro">
            <TextInput
              autoFocus
              clearButtonMode="while-editing"
              keyboardType="url"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              placeholder={`${clientUrlScheme || 'myapp'}://expo-development-client/...`}
              placeholderTextColor={theme.text.secondary}
              ref={ref as any}
              value={inputValue}
              onChangeText={setInputValue}
            />
            <View style={{ position: 'absolute', bottom: -20 }}>
              {!isValidUrl && inputValue !== '' && (
                <Text color="error" size="small">
                  Invalid URL
                </Text>
              )}
            </View>
          </View>

          <Spacer.Vertical size="xl" />

          <Button.ScaleOnPressContainer
            bg={isValidUrl ? 'tertiary' : 'disabled'}
            shadow="button"
            rounded="medium"
            disabled={!isValidUrl}
            onPress={onConnectPress}>
            <View py="small">
              <Button.Text align="center" weight="semibold" color="tertiary">
                Connect
              </Button.Text>
            </View>
          </Button.ScaleOnPressContainer>
        </View>
      )}
    </View>
  );
}
