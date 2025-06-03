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

/* 
A React component that displays a comment section for product reviews.
This component includes the reviewer's name, review text, rating, and the date of the review.
It is styled using Mantine's Paper, Group, and Typography components.

@author IFD
*/
export function Comment({
  reviewerName,
  reviewText,
  rating,
  createdDate,
}: {
  reviewerName?: string;
  reviewText: string;
  rating: number;
  createdDate?: Date;
}) {
  return (
    <Paper withBorder radius="md" className={classes.comment} w={300}>
      <Group>
        <Avatar alt={reviewerName || "Reviewer"} radius="xl" />
        <Text fz="sm">{reviewerName || "Anonymous"}</Text>
      </Group>
      <Stack gap={10} className={classes.body} pt={5}>
        <Group gap={5} align="center">
          <IconRosetteDiscountCheckFilled size={16} />
          <Text fz="xs" c="dimmed">
            Verified Buyer
          </Text>
        </Group>
        <Rating defaultValue={rating} readOnly />
      </Stack>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>
          {reviewText || "No comment provided."}
        </div>
      </TypographyStylesProvider>
      <Group justify="end" pt={5}>
        <Text c="dimmed" size="sm" style={{ fontStyle: "italic" }}>
          -{" "}
          {createdDate
            ? createdDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "May 23, 2025"}
        </Text>
      </Group>
    </Paper>
  );
}
