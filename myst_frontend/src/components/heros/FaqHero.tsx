import { IconPlus } from "@tabler/icons-react";
import { Accordion, Anchor, Container, ThemeIcon, Title } from "@mantine/core";
import classes from "../../css/Faq.module.css";

const qaOne = {
  question: "Do you ship worldwide?",
  answer:
    "Yes — and it’s completely free! We proudly offer free worldwide shipping on every order, no matter where you live. Once your order is placed, we’ll handle the rest and get it moving to your doorstep as quickly as possible. No hidden fees, no complicated shipping tiers — just simple, global delivery at no cost to you.",
};

const qaTwo = {
  question: "How long does shipping take?",
  answer:
    "We ship out your order the next business day after it's placed. While we can’t guarantee exact delivery times due to varying international shipping speeds and customs processes, most orders arrive within 5–14 business days. You’ll receive tracking info as soon as your order ships so you can monitor its progress in real-time.",
};

const qaThree = {
  question: "What is included?",
  answer: (
    <>
      <p style={{ paddingTop: 0, marginTop: 0 }}>
        Every Myst kit comes fully equipped and ready to use right out of the
        box. Here's what's inside:
      </p>
      <ul>
        <li>
          25ft durable water line – flexible and built to last under regular use
        </li>
        <li>
          Multiple connector attachments – compatible with most home vacuum
          systems and water sources
        </li>
        <li>
          High-powered vacuum head – engineered for strong, consistent suction
        </li>
        <li>Precision spray nozzle – designed for even misting and control</li>
        <li>
          10ft anti-crush vacuum hose – prevents collapse and keeps airflow
          steady under pressure
        </li>
      </ul>
      <p style={{ paddingBottom: 0, marginBottom: 0 }}>
        Each component is selected for performance, durability, and ease of use
        — everything you need for a complete and effective cleaning experience.
      </p>
    </>
  ),
};

const qaFour = {
  question: "Is there a warranty?",
  answer: (
    <>
      Yes, every Myst system is covered by our 1-year limited warranty. We stand
      behind our products — if something goes wrong due to a manufacturing
      defect within the first year, we’ll make it right. You can review the full
      warranty details, including what's covered and how to make a claim at{" "}
      <Anchor component="a" href="/warranty">
        https://mystdetailing.ca/warranty
      </Anchor>
    </>
  ),
};

const qaFive = {
  question: "Can The Mystle be used indoors and outdoors?",
  answer:
    "Yes — Myst is built for both indoor and outdoor use. Whether you're deep-cleaning a car interior, refreshing patio furniture, or tackling tough spots inside your home, Myst handles it all with high-pressure misting and strong suction.",
};

export function FaqWithBg() {
  return (
    <div className={classes.wrapper}>
      <Container size="sm">
        <Title ta="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion
          chevronPosition="right"
          defaultValue="reset-password"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
          styles={{
            label: { color: "var(--mantine-color-black)" },
            item: { border: 0 },
          }}
          chevron={
            <ThemeIcon radius="xl" className={classes.gradient} size={26}>
              <IconPlus size={18} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control>{qaOne.question}</Accordion.Control>
            <Accordion.Panel>{qaOne.answer}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="another-account">
            <Accordion.Control>{qaTwo.question}</Accordion.Control>
            <Accordion.Panel>{qaTwo.answer}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="newsletter">
            <Accordion.Control>{qaThree.question}</Accordion.Control>
            <Accordion.Panel>{qaThree.answer}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="credit-card">
            <Accordion.Control>{qaFour.question}</Accordion.Control>
            <Accordion.Panel>{qaFour.answer}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="payment">
            <Accordion.Control>{qaFive.question}</Accordion.Control>
            <Accordion.Panel>{qaFive.answer}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}
