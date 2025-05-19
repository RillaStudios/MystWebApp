import { useState } from "react";
import {
  Box,
  Burger,
  Divider,
  Drawer,
  Grid,
  Group,
  ScrollArea,
} from "@mantine/core";
import classes from "../../css/Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import MystLogo from "../ui/logo";
import ThemeToggle from "../ui/buttons/theme_toggler";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Contact" },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
        closeDrawer();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Grid w={"100%"} className={classes.inner} px={20}>
        <Grid.Col
          span={3}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <MystLogo />
        </Grid.Col>
        <Grid.Col
          span={6}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Group gap={5} visibleFrom="sm" justify="center">
            {items}
          </Group>
        </Grid.Col>
        <Grid.Col
          span={3}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            visibleFrom="sm"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ThemeToggle />
          </Box>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
        </Grid.Col>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px)" mx="-md">
            <Divider my="sm" />
            {links.map((link) => (
              <a
                key={link.label}
                href={link.link}
                className={classes.link}
                data-active={active === link.link || undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(link.link);
                  closeDrawer();
                }}
              >
                {link.label}
              </a>
            ))}

            <Divider my="sm" />
          </ScrollArea>
        </Drawer>
      </Grid>
    </header>
  );
}
