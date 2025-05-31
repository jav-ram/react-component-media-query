import { Profiler, ProfilerOnRenderCallback } from "react";
import Row from "../stories/ContainerProviderStory/Row";
import ContainerProvider from "../components/ContainerProvider";
import { Grid } from "@mui/material";
import FrameRequestContainerProvider from "../components/ContainerProvider";

const ProfileTest = () => {
  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    console.log(`${id} took ${actualDuration}ms to ${phase}`);
  };

  return (
    <Profiler id="ContainerMediaStressTest" onRender={onRender}>
      <FrameRequestContainerProvider>
        <Grid container spacing="8px">
          {[...Array(500)].map((_, i) => (
            <Row rowIndex={i} />
          ))}
        </Grid>
      </FrameRequestContainerProvider>
    </Profiler>
  );
}

export default ProfileTest;
