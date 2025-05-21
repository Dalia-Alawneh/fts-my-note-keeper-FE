import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

interface ColorSelectProps {
  value: string;
  onChange: (value: string) => void;
  colors: { [key: string]: string };
  label?: string;
}

const ColorSelect = ({ value, onChange, colors, label = "Color" }: ColorSelectProps) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.entries(colors).map(([name, hex]) => (
        <MenuItem key={name} value={name}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: hex,
                mr: 1,
              }}
            />
            {name}
          </Box>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ColorSelect;
