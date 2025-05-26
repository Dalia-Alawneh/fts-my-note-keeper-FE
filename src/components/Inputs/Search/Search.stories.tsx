// SearchInput.stories.tsx

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './Search';
import { userEvent, within } from '@storybook/test';

const meta: Meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = () => {
  const [value, setValue] = useState('');

  return <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />;
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement as HTMLElement);
  const input = canvas.getByRole('textbox');

  await userEvent.type(input, 'Search any text..!');
};

export const LongText: Story = () => {
  const [value, setValue] = useState('');

  return <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />;
};

LongText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement as HTMLElement);
  const input = canvas.getByRole('textbox');

  await userEvent.type(
    input,
    'This is an example of a very long search input text to test how the component handles overflow and responsiveness.',
  );
};
