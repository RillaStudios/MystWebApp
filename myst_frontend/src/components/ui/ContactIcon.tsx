import { IconAt, IconSun } from "@tabler/icons-react";
import { Box, Stack, Text } from "@mantine/core";
import classes from "../../css/ContactIcons.module.css";

// A type definition for the props of the ContactIcon component
interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

/* 
A React component that displays a contact icon with a title and description.
This component is used to show contact information such as email, phone, or address.

@author IFD
*/
function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "mystdetailing@gmail.com", icon: IconAt },
  // { title: "Phone", description: "+49 (800) 335 35 35", icon: IconPhone },
  // { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
