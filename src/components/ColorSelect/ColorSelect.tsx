import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  type SelectProps,
  FormHelperText,
} from "@mui/material";

type ColorSelectProps = SelectProps & {
  colors: { [key: string]: string };
  label?: string;
  error?: boolean;
  helperText?: string;
}

const ColorSelect = ({
  value,
  onChange,
  onBlur,
  colors,
  label = "Color",
  name,
  error,
  helperText,
  ...rest
}: ColorSelectProps) => (
  <FormControl fullWidth margin="normal" error={error}>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    >
      {Object.entries(colors).map(([name, hex]) => (
        <MenuItem key={name} value={hex}>
          <Box display="flex" alignItems="center">
            <Box width="16px"
              height="16px"
              borderRadius="50%"
              bgcolor={hex}
              mr='0.5rem'
            />
            {name}
          </Box>
        </MenuItem>
      ))}
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default ColorSelect;
