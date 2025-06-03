import type { Meta, StoryObj } from '@storybook/react';
import NoteCard from './NoteCard';
import { noteColors } from '@/fixtures';
import type { Note } from '@/types';

const meta: Meta = {
  component: NoteCard,
  tags: ['autoDocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    color: { control: 'color' },
    createdAt: { control: 'date' },
  },
};

export default meta;

const note = {
  _id: '1',
  title: 'Note 1',
  content: 'Content 1',
  color: noteColors.green,
  createdAt: '2025-05-23T12:29:50.217Z',
};

type Story = StoryObj<typeof NoteCard>;
export const Default: Story = {
  args: {
    isLoading: false,
    note: note,
  },
};

export const LongText: Story = {
  args: {
    isLoading: false,
    note: {
      ...note,
      content: `This is an example of a very long note text to test how the component handles overflow and responsiveness, 
      This is an example of a very long note text to test how the component handles overflow and responsiveness`,
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    note: note,
  },
};

export const EditableNote = {
  args: {
    title: 'Editable title',
    content: 'Editable content',
    color: noteColors.green,
    createdAt: new Date('2025-05-23T12:29:50.217Z'),
  },
  render: ({ title, content, color, createdAt }: Note) => (
    <NoteCard
      isLoading={false}
      refetchNotes={() => Promise.resolve()}
      note={{
        _id: '1',
        title,
        content,
        color,
        createdAt: new Date(createdAt).toISOString(),
      }}
    />
  ),
};
