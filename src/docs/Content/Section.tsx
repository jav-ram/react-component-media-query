import { styled, Typography } from "@mui/material";
import palette from "../../palette";
import React from "react";

const Heading = styled(Typography)`
  color: ${palette.primary};
`;

type SectionProptType = {
  title: string,
  href: string,
  children: React.ReactElement
};
const Section = ({
  title,
  href,
  children,
}: SectionProptType) => {
  return (
    <section>
      <Heading id={href} typography="h3">{title}</Heading>
      {children}
    </section>
  )
};

export default Section;
