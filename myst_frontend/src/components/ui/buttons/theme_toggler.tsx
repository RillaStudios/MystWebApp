import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "../../../css/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
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
