import type { Meta, StoryObj } from '@storybook/react';

import ContainerProvider from '../../components/BatchMediaContainer';
import { Grid } from '@mui/material';

import Row from './Row';

const meta: Meta<typeof ContainerProvider> = {
  component: ContainerProvider,
};

export default meta;
type Story = StoryObj<typeof ContainerProvider>;

const GridProvider = () => {
  return (
    <ContainerProvider>
      <Grid container spacing="8px">
        {Array(1000).fill(0).map((_, i) => i).map((v) => (
          <Row rowIndex={v} />
        ))}
      </Grid>
    </ContainerProvider>
  )
}

export const Primary: Story = {
  name: 'ContainerProvider',
  render: () => <GridProvider />,
};
