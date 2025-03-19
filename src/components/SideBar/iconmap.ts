import { Event, Home, Settings } from "@mui/icons-material";

export const iconMap = {
    'Home' : Home,
    'Event' : Event,
    'Settings' : Settings
} as const;

export type IconMapKey = keyof typeof iconMap;

export const isIconMapKey = (key: string): key is IconMapKey => {
    return key in iconMap;
  };