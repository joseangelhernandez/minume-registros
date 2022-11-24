
// @mui material components
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export default styled(InputBase)(({ theme, ownerState }) => {
  const { palette, boxShadows, functions, typography, borders } = theme;
  const { size, error, success, iconDirection, direction, disabled } = ownerState;

  const { inputColors, grey, white, transparent } = palette;
  const { inputBoxShadow } = boxShadows;
  const { pxToRem, boxShadow } = functions;
  const { size: fontSize } = typography;
  const { borderRadius } = borders;

  // styles for the input with size="small"
  const smallStyles = () => ({
    fontSize: fontSize.xs,
    padding: `${pxToRem(4)} ${pxToRem(12)}`,
  });

  // styles for the input with size="large"
  const largeStyles = () => ({
    padding: pxToRem(12),
  });

  // styles for the focused state of the input
  let focusedBorderColorValue = inputColors.borderColor.focus;

  if (error) {
    focusedBorderColorValue = inputColors.error;
  } else if (success) {
    focusedBorderColorValue = inputColors.success;
  }

  let focusedPaddingLeftValue;

  if (direction === "rtl" && iconDirection === "left") {
    focusedPaddingLeftValue = pxToRem(12);
  } else if (direction === "rtl" && iconDirection === "right") {
    focusedPaddingLeftValue = pxToRem(12);
  } else if (direction === "ltr" && iconDirection === "right") {
    focusedPaddingLeftValue = pxToRem(12);
  } else if (direction === "ltr" && iconDirection === "left") {
    focusedPaddingLeftValue = pxToRem(12);
  }

  let focusedPaddingRightValue;

  if (direction === "rtl" && iconDirection === "left") {
    focusedPaddingRightValue = pxToRem(12);
  } else if (direction === "rtl" && iconDirection === "right") {
    focusedPaddingRightValue = pxToRem(12);
  } else if (direction === "ltr" && iconDirection === "right") {
    focusedPaddingRightValue = pxToRem(12);
  } else if (direction === "ltr" && iconDirection === "left") {
    focusedPaddingRightValue = pxToRem(12);
  }

  let focusedBoxShadowValue = boxShadow([0, 0], [0, 2], inputColors.boxShadow, 1);

  if (error) {
    focusedBoxShadowValue = inputBoxShadow.error;
  } else if (success) {
    focusedBoxShadowValue = inputBoxShadow.success;
  }

  // styles for the input with error={true}
  const errorStyles = () => ({
    borderColor: inputColors.error,
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    borderColor: inputColors.success,
  });

  // styles for the input containing an icon
  const withIconStyles = () => {
    let withIconBorderRadiusValue = `0 ${borderRadius.md} ${borderRadius.md} 0`;

    if (direction === "rtl" && iconDirection === "left") {
      withIconBorderRadiusValue = `0 ${borderRadius.md} ${borderRadius.md} 0`;
    } else if (direction === "rtl" && iconDirection === "right") {
      withIconBorderRadiusValue = `${borderRadius.md} 0 0 ${borderRadius.md}`;
    } else if (direction === "ltr" && iconDirection === "right") {
      withIconBorderRadiusValue = `${borderRadius.md} 0 0 ${borderRadius.md}`;
    }

    let withIconPaddingLeftValue;
    if (direction === "rtl" && iconDirection === "left") {
      withIconPaddingLeftValue = 0;
    } else if (direction === "rtl" && iconDirection === "right") {
      withIconPaddingLeftValue = pxToRem(12);
    } else if (direction === "ltr" && iconDirection === "right") {
      withIconPaddingLeftValue = pxToRem(12);
    } else if (direction === "ltr" && iconDirection === "left") {
      withIconPaddingLeftValue = 0;
    }

    let withIconPaddingRightValue;

    if (direction === "rtl" && iconDirection === "left") {
      withIconPaddingRightValue = pxToRem(12);
    } else if (direction === "rtl" && iconDirection === "right") {
      withIconPaddingRightValue = 0;
    } else if (direction === "ltr" && iconDirection === "right") {
      withIconPaddingRightValue = 0;
    } else if (direction === "ltr" && iconDirection === "left") {
      withIconPaddingRightValue = pxToRem(12);
    }

    return {
      borderColor: transparent.main,
      borderRadius: withIconBorderRadiusValue,
      paddingLeft: withIconPaddingLeftValue,
      paddingRight: withIconPaddingRightValue,
    };
  };

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : white.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(size === "small" && smallStyles()),
    ...(size === "large" && largeStyles()),
    ...(error && errorStyles()),
    ...(success && successStyles()),
    ...((iconDirection === "left" || iconDirection === "right") && withIconStyles()),

    "&.Mui-focused": {
      borderColor: focusedBorderColorValue,
      paddingLeft: focusedPaddingLeftValue,
      paddingRight: focusedPaddingRightValue,
      boxShadow: focusedBoxShadowValue,
      outline: 0,
    },

    "&.MuiInputBase-multiline": {
      padding: `${pxToRem(10)} ${pxToRem(12)}`,
    },
  };
});
