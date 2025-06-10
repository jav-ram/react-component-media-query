import type { Meta, StoryObj } from '@storybook/react';
import { useRef, Profiler, ProfilerOnRenderCallback } from 'react';

import MediaContainer from '../../components/MediaContainer';
import { Grid } from '@mui/material';

import Row from './Row';
import Item from './Item';

const meta: Meta<typeof MediaContainer> = {
  component: MediaContainer,
};

export default meta;
type Story = StoryObj<typeof MediaContainer>;

const ThousandRowContainers = () => {
  return (
    <Grid id="story" container direction="row" spacing="8px">
      {[...Array(1000)].map((_, i) => (
        <Row rowIndex={i} />
      ))}
    </Grid>
  )
}

const ProfiledThousandContainersTemplate = () => {
  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    console.log(`${id} took ${actualDuration}ms to ${phase}`);
  };

  return (
    <Profiler id="ContainerMediaStressTest" onRender={onRender}>
      <ThousandRowContainers />
    </Profiler>
  );
}

const SingleContainerTemplate = () => {
  const ref = useRef(null);
  return (
    <div style={{ resize: 'horizontal', overflow: 'scroll', border: '1px solid black', padding: '10px' }}>
      <MediaContainer ref={ref} as={Grid} container>
        <Item id='item' />
      </MediaContainer>
    </div>
  )
}

export const SingleContainer: Story = {
  name: 'Single',
  render: SingleContainerTemplate,
};

export const ThousandContainers: Story = {
  name: 'ThousandContainers',
  render: () => <ThousandRowContainers />,
};

export const ProfiledThousandContainers: Story = {
  name: 'ProfiledThousandContainers',
  render: () => <ProfiledThousandContainersTemplate />,
};
