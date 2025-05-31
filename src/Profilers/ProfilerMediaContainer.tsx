import { Profiler, ProfilerOnRenderCallback } from "react";

import { Grid } from "@mui/material";
import Row from "../stories/MediaContainer/Row";


const ProfileMediaContainer = () => {
  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    console.log(`${id} took ${actualDuration}ms to ${phase}`);
  };

  return (
    <Profiler id="ContainerMediaStressTest" onRender={onRender}>
      <Grid id="story" container direction="row" spacing="8px">
        {[...Array(1000)].map((_, i) => (
          <Row rowIndex={i} />
        ))}
      </Grid>
    </Profiler>
  );
}

export default ProfileMediaContainer;
