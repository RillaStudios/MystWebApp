import { useComputedColorScheme } from "@mantine/core";
import { useState, useEffect } from "react";
import MystBlackLogo from "../../assets/mystLogoBlack.png";
import MystWhiteLogo from "../../assets/mystLogoWhite.png";

export default function MystLogo({
  width,
  height,
  size,
  useButton = true,
}: {
  width?: number;
  height?: number;
  size?: number;
  useButton?: boolean;
}) {
  // Track component mounting state
  const [mounted, setMounted] = useState(false);
  const computedColorScheme = useComputedColorScheme("light");

  // Only apply color scheme after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // If width/height and size are both provided, throw an error
  if ((width !== undefined || height !== undefined) && size !== undefined) {
    throw new Error("Either provide width/height OR size, but not both");
  }

  // Always use light theme for initial render to match server
  const logoSrc =
    mounted && computedColorScheme === "dark" ? MystWhiteLogo : MystBlackLogo;

  return (
    // If useButton is true, render a button, otherwise render an image
    useButton ? (
      <a href="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logoSrc}
          width={size || width || 120}
          height={size || height || 35}
          alt="Myst Logo"
          style={{
            objectFit: "contain",
          }}
        />
      </a>
    ) : (
      <img
        src={logoSrc}
        width={size || width || 120}
        height={size || height || 35}
        alt="Myst Logo"
        style={{
          objectFit: "contain",
        }}
      />
    )
  );
}
