import type { Meta, StoryObj } from '@storybook/react';

import ContainerProvider from '../../components/ContainerProvider';
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
        {Array(100).fill(0).map((v, i) => i).map((v) => (
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
