import { IconBrandFacebook } from "@tabler/icons-react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "../../css/Footer.module.css";
import MystLogo from "../ui/logo";

const data = [
  {
    title: "Navigation",
    links: [
      { label: "Home", link: "#" },
      { label: "Mystle", link: "#" },
      { label: "Contact", link: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", link: "#" },
      { label: "Terms & Conditions", link: "#" },
      { label: "Refund Policy", link: "#" },
      { label: "Shipping & Delivery", link: "#" },
      { label: "Warranty Information", link: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Your Order", link: "#" },
      { label: "User Manual", link: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <MystLogo />
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 Myst Detailing. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <a
              href="https://www.facebook.com/MYSTDetailing.PEI"
              target="_blank"
              style={{ color: "inherit", textDecoration: "none" }}
              rel="noopener noreferrer"
            >
              <IconBrandFacebook size={18} stroke={1.5} />
            </a>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
