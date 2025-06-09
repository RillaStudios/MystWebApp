import {
  Box,
  Burger,
  Divider,
  Drawer,
  Grid,
  Group,
  Space,
  Text,
} from "@mantine/core";
import classes from "../../css/Header.module.css";
import { useDisclosure } from "@mantine/hooks";
import MystLogo from "../ui/logo";
import ThemeToggle from "../ui/buttons/theme_toggler";
import { Link } from "react-router-dom";
import CountryPicker from "../ui/CountryPicker";
import { HashLink } from "react-router-hash-link";
import BuyNowButton from "../ui/buttons/buy_now_button";
import React from "react";
import useActiveLink from "../../hooks/ActiveLinkHook";

// Hardcoded links for the header navigation
const links = [
  { link: "/", label: "Home" },
  { link: "/#mystle", label: "Mystle" },
  { link: "/#contact", label: "Contact" },
];

// Hardcoded mobile links for the header navigation
const mobileLinks = [
  { link: "/", label: "Home" },
  { link: "/#mystle", label: "Mystle" },
  { link: "/#contact", label: "Contact" },
  { link: "/track-order", label: "Track Your Order" },
  { link: "/privacy", label: "Privacy Policy", legal: true },
  { link: "/terms", label: "Terms of Service", legal: true },
  { link: "/refund", label: "Refund Policy", legal: true },
  { link: "/shipping", label: "Shipping & Delivery", legal: true },
  { link: "/warranty", label: "Warranty Information", legal: true },
];

/* 
A React component for the header of the Myst Detailing website.
This header includes navigation links, a logo, a theme toggle button, and a country picker.
It features a responsive design with a drawer for mobile view, allowing users to navigate the site easily.

@modified Modified from the original Myst Frontend codebase. Made mobile links actually work, and 
fixed the active link logic.

@modified 2025-06-09

@author IFD
*/
export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
  const linksToUse = isMobile ? mobileLinks : links;

  const { active, setActive } = useActiveLink(linksToUse);

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
          title={
            <Group justify="space-between" align="center">
              <MystLogo />
              <Group>
                <CountryPicker />
                <ThemeToggle />
              </Group>
            </Group>
          }
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <Box style={{ position: "relative", height: "100%" }}>
            <Box
              style={{
                overflowY: "auto",
                paddingBottom: 80,
                height: "calc(100vh - 84px)",
              }}
            >
              <Divider mb="sm" />
              {mobileLinks.map((link) => {
                if (!link.legal) {
                  return (
                    <React.Fragment key={link.label}>
                      {
                        link.label === "Contact" || link.label === "Mystle" ? (
                          <Text
                            key={link.label}
                            className={classes.link}
                            component={HashLink}
                            smooth
                            to={link.link}
                            onClick={() => {
                              setActive(link.link);
                              closeDrawer();
                            }}
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
                        )
                      }
                      <Space h="xs" />
                    </React.Fragment>
                  );
                }
              })}

              <Divider mb="sm" />

              {mobileLinks.map((link) => {
                if (link.legal) {
                  return (
                    <React.Fragment key={link.label}>
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
                      <Space h="xs" />
                    </React.Fragment>
                  );
                }
              })}
            </Box>
            <Box
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: 16,
                background: "var(--mantine-color-body)", // optional: match Drawer bg
              }}
            >
              <BuyNowButton isMobile={true} />
            </Box>
          </Box>
        </Drawer>
      </Grid>
    </header>
  );
}
