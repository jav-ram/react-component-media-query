import { Profiler, ProfilerOnRenderCallback } from "react";
import Row from "../stories/ContainerProviderStory/Row";
import ContainerProvider from "../components/BatchMediaContainer";
import { Grid } from "@mui/material";
import FrameRequestContainerProvider from "../components/BatchMediaContainer";

const ProfileTest = () => {
  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    console.log(`${id} took ${actualDuration}ms to ${phase}`);
  };

  return (
    <Profiler id="ContainerMediaStressTest" onRender={onRender}>
      {[...Array(1000)].map((_, i) => (
        <FrameRequestContainerProvider>
          <Grid container spacing="8px">
            <Row rowIndex={i} />
          </Grid>
        </FrameRequestContainerProvider>
      ))}
    </Profiler>
  );
}

export default ProfileTest;
