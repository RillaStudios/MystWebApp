import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "../../../css/ThemeToggle.module.css";

/* 
A React component that toggles the theme between light and dark modes.
This component uses Mantine's color scheme management to switch themes
and displays appropriate icons for each theme.

@author IFD
*/
export default function ThemeToggle() {
  // Use Mantine's hooks to manage the color scheme
  const { setColorScheme } = useMantineColorScheme();

  // Use a computed color scheme to determine the current theme
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      variant="default"
      size={"md"}
      p={5}
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
    >
      <IconMoon className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconSun className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
