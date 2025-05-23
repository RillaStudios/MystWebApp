import { IconBrandFacebook } from "@tabler/icons-react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "../../css/Footer.module.css";
import { HashLink } from "react-router-hash-link";
import MystLogo from "../ui/logo";

const data = [
  {
    title: "Navigation",
    links: [
      { label: "Home", link: "/" },
      { label: "Mystle", link: "/#mystle" },
      { label: "Contact", link: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", link: "/privacy" },
      { label: "Terms & Conditions", link: "/terms" },
      { label: "Refund Policy", link: "/refund" },
      { label: "Shipping & Delivery", link: "/shipping" },
      { label: "Warranty Information", link: "/warranty" },
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
    const links = group.links.map((link, index) =>
      link.label === "Contact" || link.label === "Mystle" ? (
        <Text
          key={index}
          className={classes.link}
          component={HashLink}
          smooth
          to={link.link}
        >
          {link.label}
        </Text>
      ) : (
        <Text
          key={index}
          className={classes.link}
          component="a"
          href={link.link}
        >
          {link.label}
        </Text>
      ),
    );

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
