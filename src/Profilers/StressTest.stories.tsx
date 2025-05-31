import { Meta } from "@storybook/react";
import ProfileTest from "./profiler"
import ContainerProvider from "../components/ContainerProvider";

const meta: Meta = {
  component: ContainerProvider
};

export default meta;

export const StressTest = () => {
  return <ProfileTest />
}