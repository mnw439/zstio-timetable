import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettingsWithoutStore } from "@/stores/settings-store";
import {
  FullscreenIcon,
  MenuIcon,
  MoonIcon,
  Repeat2Icon,
  SunMediumIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useIsClient } from "usehooks-ts";

export const TopbarButtons: React.FC = () => {
  const isClient = useIsClient();
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const toggleFullscreenMode = useSettingsWithoutStore(
    (state) => state.toggleFullscreenMode,
  );

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(systemTheme === "light" ? "dark" : "light");
      return;
    }
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const buttons = [
    {
      icon: FullscreenIcon,
      href: null,
      action: toggleFullscreenMode,
      show: true,
    },
    {
      icon: theme === "dark" && isClient ? SunMediumIcon : MoonIcon,
      href: null,
      action: toggleTheme,
      show: resolvedTheme || !isClient,
    },
    {
      icon: Repeat2Icon,
      href: "/zastepstwa",
      action: null,
      show: true,
    },
    {
      icon: MenuIcon,
      href: null,
      action: () => {},
      show: true,
    },
  ];

  return (
    <div className="inline-flex gap-2.5">
      {buttons.map((button, index) => (
        <Button
          aria-label="Przycisk nawigacyjny"
          key={index}
          variant="icon"
          size="icon"
          className={cn(!button.show && "hidden")}
          onClick={button.action ?? (() => {})}
          asChild={button.href !== null}
        >
          {button.href !== null ? (
            <Link aria-label="Link nawigacyjny" href={button.href}>
              <button.icon size={20} strokeWidth={2.5} />
            </Link>
          ) : (
            <button.icon size={20} strokeWidth={2.5} />
          )}
        </Button>
      ))}
    </div>
  );
};
