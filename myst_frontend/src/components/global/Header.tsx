import { useState } from "react";
import {
  Box,
  Burger,
  Divider,
  Drawer,
  Grid,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import classes from "../../css/Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import MystLogo from "../ui/logo";
import ThemeToggle from "../ui/buttons/theme_toggler";
import { Link } from "react-router-dom";
import CountryPicker from "../ui/CountryPicker";
import { HashLink } from "react-router-hash-link";

// Hardcoded links for the header navigation
const links = [
  { link: "/", label: "Home" },
  { link: "/#mystle", label: "Mystle" },
  { link: "/#contact", label: "Contact" },
];

/* 
A React component for the header of the Myst Detailing website.
This header includes navigation links, a logo, a theme toggle button, and a country picker.
It features a responsive design with a drawer for mobile view, allowing users to navigate the site easily.

@author IFD
*/
export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) =>
    link.label === "Contact" || link.label === "Mystle" ? (
      <Text
        key={link.label}
        className={classes.link}
        component={HashLink}
        smooth
        to={link.link}
      >
        {link.label}
      </Text>
    ) : (
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
    ),
  );

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
            <Group>
              <CountryPicker />
              <ThemeToggle />
            </Group>
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
