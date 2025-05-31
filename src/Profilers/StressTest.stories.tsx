import { Meta } from "@storybook/react";
import ProfileTest from "./profiler"
import ContainerProvider from "../components/BatchMediaContainer";
import ProfileMediaContainer from "./ProfilerMediaContainer";

const meta: Meta = {
  component: ContainerProvider
};

export default meta;

export const StressTest = () => {
  return <ProfileTest />
}

export const StressTestMedia = () => {
  return <ProfileMediaContainer />
}