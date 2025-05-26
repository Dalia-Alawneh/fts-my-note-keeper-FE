import type { Meta, StoryObj } from '@storybook/react';
import ColorSelect from './ColorSelect';
import { noteColors } from '@/fixtures';

const colors = noteColors;

const meta = {
  title: 'Components/ColorSelect',
  component: ColorSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSelect>;

export default meta;

type Story = StoryObj<typeof ColorSelect>;

export const Default: Story = {
  argTypes: {
    value: {
      options: Object.values(colors),
      control: {
        type: 'select',
        labels: {
          '#FFF59D': 'yellow',
          '#F48FB1': 'pink',
          '#A5D6A7': 'green',
          '#90CAF9': 'blue',
          '#CE93D8': 'purple',
          '#FFCC80': 'orange',
          '#D3D3D3': 'grey',
        },
      },
      onChange: { action: 'changed' },
    },
  },
  args: {
    colors: colors,
    value: '#CE93D8',
  },
};

export const SelectedValue: Story = {
  args: {
    colors,
    value: '#FFCC80',
    onChange: () => {},
  },
};

export const WithErrorAndHelperText: Story = {
  args: {
    colors,
    value: '',
    error: true,
    helperText: 'Helper text',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    colors,
    value: '#FFCC80',
    disabled: true,
    onChange: () => {},
  },
};

export const CustomLabel: Story = {
  args: {
    colors,
    value: '',
    label: 'Choose Color',
    onChange: () => {},
  },
};
