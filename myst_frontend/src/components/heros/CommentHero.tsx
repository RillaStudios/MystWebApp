import {
  Avatar,
  Group,
  Paper,
  Rating,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import classes from "../../css/Comment.module.css";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";

export function Comment() {
  return (
    <Paper withBorder radius="md" className={classes.comment} maw={300}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <Text fz="sm">Kelly O</Text>
      </Group>
      <Stack gap={10} className={classes.body} pt={5}>
        <Group gap={5} align="center">
          <IconRosetteDiscountCheckFilled size={16} />
          <Text fz="xs" c="dimmed">
            Verified Buyer
          </Text>
        </Group>
        <Rating defaultValue={5} readOnly />
      </Stack>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>
          Best extractor kit! Works awesome and arrived early.
        </div>
      </TypographyStylesProvider>
      <Group justify="end" pt={5}>
        <Text c="dimmed" size="sm" style={{ fontStyle: "italic" }}>
          - May 19, 2025
        </Text>
      </Group>
    </Paper>
  );
}
