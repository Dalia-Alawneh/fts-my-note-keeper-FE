import { getContrastRatio } from '@mui/material/styles';

export const getTextColor = (backgroundColor: string) => {
  return getContrastRatio(backgroundColor, '#4d4d4d') > 4.5 ? '#4d4d4d' : '#FFF';
};
