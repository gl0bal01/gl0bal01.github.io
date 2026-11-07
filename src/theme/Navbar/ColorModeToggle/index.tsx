import type { ReactNode } from "react";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";

// Two-state toggle: each click flips the theme the visitor sees.
// The stock toggle cycles light -> dark -> system when respectPrefersColorScheme
// is on, and the "system" step changes nothing whenever the OS theme matches the
// current one, so the button looks broken one click in three. The config's
// respectPrefersColorScheme still picks the first theme from the OS.
export default function NavbarColorModeToggle({ className }: Props): ReactNode {
  const { disableSwitch } = useThemeConfig().colorMode;
  const { colorMode, setColorMode } = useColorMode();
  if (disableSwitch) {
    return null;
  }
  return (
    <ColorModeToggle
      className={className}
      respectPrefersColorScheme={false}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}
