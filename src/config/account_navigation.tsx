import {
  Bell,
  CircleHalf,
  CreditCard,
  Shield,
  User,
} from "@phosphor-icons/react";

export const account_navigation = [
  {
    name: "Account",
    href: "/account",
    icon: <User weight="fill" />,
  },
  {
    name: "Billing",
    href: "/account/billing",
    icon: <CreditCard weight="fill" />,
  },
  {
    name: "Security",
    href: "/account/security",
    icon: <Shield weight="fill" />,
  },
  {
    name: "Preferences",
    href: "/account/preferences",
    icon: <CircleHalf weight="fill" />,
  },
  {
    name: "Notifications",
    href: "/account/notifications",
    icon: <Bell weight="fill" />,
  },
];
