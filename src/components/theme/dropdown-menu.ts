import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const content = cva(
  "z-50 min-w-[8rem] overflow-hidden border border-neutral-200 bg-white p-1 text-neutral-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
  {
    variants: {
      side: {
        top: "data-[state=open]:slide-in-from-bottom-3.5 data-[state=closed]:slide-out-to-bottom-3.5",
        bottom:
          "data-[state=open]:slide-in-from-top-3.5 data-[state=closed]:slide-out-to-top-3.5",
        left: "data-[state=open]:slide-in-from-right-3.5 data-[state=closed]:slide-out-to-right-3.5",
        right:
          "data-[state=open]:slide-in-from-left-3.5 data-[state=closed]:slide-out-to-left-3.5",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      side: "bottom",
      rounded: "md",
    },
  }
);
const item = cva(
  "relative flex cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default:
          "focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "md",
    },
  }
);

export const dropdownMenuVariants = {
  content,
  item,
};
export type DropdownMenuVariants = {
  content: VariantProps<typeof content>;
  item: VariantProps<typeof item>;
};
