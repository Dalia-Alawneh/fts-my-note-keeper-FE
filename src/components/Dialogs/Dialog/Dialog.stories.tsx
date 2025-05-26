import type { Meta, StoryObj } from '@storybook/react';
import AppDialog from './Dialog';
import { Button } from '@mui/material';
const meta: Meta<typeof AppDialog> = {
  title: 'Components/AppDialog',
  component: AppDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AppDialog>;
export const Default: Story = {
  args: {
    open: true,
    handleClose: () => {},
    children: (
      <>
        <AppDialog.Title>Title</AppDialog.Title>
        <AppDialog.Content>Dialog content Dialog content Dialog content</AppDialog.Content>
        <AppDialog.Actions>
          <Button onClick={() => alert('Clicked')}>OK</Button>
        </AppDialog.Actions>
      </>
    ),
  },
};
