import { IconButton } from '@mui/material';
import type { IconButtonProps } from '@mui/material';

interface HoverIconButtonProps extends IconButtonProps {
  children: React.ReactNode;
}

const CustomIconButton = ({ children, ...rest }: HoverIconButtonProps) => {
  return (
    <IconButton {...rest}>
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
