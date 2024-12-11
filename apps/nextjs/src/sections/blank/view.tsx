"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DashboardContent } from "src/layouts/dashboard";
import { varAlpha } from "src/theme/styles";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

export function BlankView({ title = "Blank" }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) =>
            varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        }}
      />
    </DashboardContent>
  );
}
