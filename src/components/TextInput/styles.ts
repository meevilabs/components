import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ifStyle, switchStyle, getTheme } from '../../helpers';
import { Input as TextInputType, InputStatus } from '../../types';

type InputAreaWrapperProps = {
  multiline: boolean;
};

type BottomLineProps = {
  contrast: boolean;
  status: string;
};

const normalTextSize = 16;
const bigTextSize = 24;

const isMultiline = ifStyle('multiline');
const isBig = ifStyle('big');
const hasLabel = ifStyle('label');
const isContrast = ifStyle('contrast');
const switchStatus = switchStyle('status');
const primaryContrast = getTheme('primary.contrast');
const primaryDark = getTheme('primary.dark');
const success = getTheme('success');
const failure = getTheme('failure');
const disabled = getTheme('disabled');
const inputColor = (props: TextInputType | BottomLineProps): any =>
  switchStatus({
    [InputStatus.Success]: success,
    [InputStatus.Failure]: failure,
    [InputStatus.Default]: isContrast(primaryContrast, primaryDark)(props),
    [InputStatus.Disabled]: disabled,
  });

export const LABEL_UPPER_STYLE = {
  top: -10,
  fontSize: 14,
};

export const LABEL_LOWER_STYLE = {
  top: 20,
  fontSize: 18,
};

type WrapperProps = {
  multiline: boolean;
};

export const Wrapper = styled.View<WrapperProps>`
  height: ${hasLabel(isMultiline('auto', '89px'), '32px')};
  max-height: ${hasLabel(isMultiline('auto', '89px'), '32px')};
  min-height: ${hasLabel(isMultiline('89px', 'auto'), '32px')};
  justify-content: ${hasLabel('flex-end', 'flex-start')};
  padding-top: ${moderateScale(8)}px;
  position: relative;
  justify-content: ${hasLabel('flex-end', 'flex-start')};
`;

export const InputAreaWrapper = styled.View<InputAreaWrapperProps>`
  margin-top: 6px;
  margin-bottom: 9px;
  flex-direction: row;
`;

export const TextLabel = styled.Text<TextInputType>`
  line-height: 20px;
  position: absolute;
  color: ${inputColor};
  font-size: ${LABEL_LOWER_STYLE.fontSize}px;
  top: ${LABEL_LOWER_STYLE.top}px;
`;
export const Label = Animated.createAnimatedComponent(TextLabel);

export const TextInput = styled.TextInput.attrs((props: TextInputType) => ({
  selectionColor: props.contrast
    ? `${primaryContrast(props)}80`
    : `${primaryDark(props)}80`,
  placeholderTextColor: props.contrast
    ? `${primaryContrast(props)}60`
    : `${primaryDark(props)}60`,
}))<TextInputType>`
  padding: 0;
  flex-grow: 1;
  border-width: 0;
  min-height: 24px;
  font-weight: 700;
  color: ${inputColor};
  margin-top: ${isMultiline('16px', '0px')};
  font-size: ${isBig(bigTextSize, normalTextSize)}px;
  padding-vertical: 0;
`;

export const BottomLine = styled.View<BottomLineProps>`
  height: 1px;
  background-color: ${inputColor};
`;
