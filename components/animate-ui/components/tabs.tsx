"use client";

import type { Transition, HTMLMotionProps } from "motion/react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import {
  useImperativeHandle,
  isValidElement,
  createContext,
  useContext,
  useEffect,
  useState,
  Children,
  useRef,
} from "react";

import {
  MotionHighlightItem,
  MotionHighlight,
} from "@/components/animate-ui/effects/motion-highlight";

type TabsContextType<T extends string> = {
  activeValue: T;
  handleValueChange: (value: T) => void;
  registerTrigger: (value: T, node: HTMLElement | null) => void;
};

const TabsContext = createContext<TabsContextType<string> | undefined>(
  undefined
);

function useTabs(): TabsContextType<string> {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}

type BaseTabsProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

type UnControlledTabsProps<T extends string = string> = BaseTabsProps & {
  defaultValue?: T;
  value?: never;
  onValueChange?: never;
};

type ControlledTabsProps<T extends string = string> = BaseTabsProps & {
  value: T;
  onValueChange?: (value: T) => void;
  defaultValue?: never;
};

type TabsProps<T extends string = string> =
  | UnControlledTabsProps<T>
  | ControlledTabsProps<T>;

function Tabs<T extends string = string>({
  onValueChange,
  defaultValue,
  className,
  children,
  value,
  ...props
}: TabsProps<T>) {
  const [activeValue, setActiveValue] = useState<T | undefined>(
    defaultValue ?? undefined
  );
  const triggersRef = useRef(new Map<string, HTMLElement>());
  const initialSet = useRef(false);
  const isControlled = value !== undefined;

  useEffect(() => {
    if (
      !isControlled &&
      activeValue === undefined &&
      triggersRef.current.size > 0 &&
      !initialSet.current
    ) {
      const firstTab = Array.from(triggersRef.current.keys())[0];
      setActiveValue(firstTab as T);
      initialSet.current = true;
    }
  }, [activeValue, isControlled]);

  const registerTrigger = (value: string, node: HTMLElement | null) => {
    if (node) {
      triggersRef.current.set(value, node);
      if (!isControlled && activeValue === undefined && !initialSet.current) {
        setActiveValue(value as T);
        initialSet.current = true;
      }
    } else {
      triggersRef.current.delete(value);
    }
  };

  const handleValueChange = (val: T) => {
    if (!isControlled) setActiveValue(val);
    else onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        activeValue: (value ?? activeValue)!,
        handleValueChange,
        registerTrigger,
      }}
    >
      <div
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  activeClassName?: string;
  transition?: Transition;
};

function TabsList(props: TabsListProps) {
  const {
    children,
    className,
    activeClassName,
    transition = {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
    ...rest
  } = props;
  const { activeValue } = useTabs();

  return (
    <MotionHighlight
      controlledItems
      className={cn("rounded-sm bg-background shadow-sm", activeClassName)}
      value={activeValue}
      transition={transition}
    >
      <div
        role="tablist"
        data-slot="tabs-list"
        className={cn(
          "bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </MotionHighlight>
  );
}

type TabsTriggerProps = HTMLMotionProps<"button"> & {
  value: string;
  children: React.ReactNode;
};

function TabsTrigger(props: TabsTriggerProps) {
  const { ref, value, children, className, ...rest } = props;
  const { activeValue, handleValueChange, registerTrigger } = useTabs();

  const localRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLButtonElement);

  useEffect(() => {
    registerTrigger(value, localRef.current);
    return () => registerTrigger(value, null);
  }, [value, registerTrigger]);

  return (
    <MotionHighlightItem value={value} className="size-full">
      <motion.button
        ref={localRef}
        data-slot="tabs-trigger"
        role="tab"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleValueChange(value)}
        data-state={activeValue === value ? "active" : "inactive"}
        className={cn(
          "inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-[1]",
          className
        )}
        {...rest}
      >
        {children}
      </motion.button>
    </MotionHighlightItem>
  );
}

type TabsContentsProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  transition?: Transition;
};

function TabsContents({
  children,
  className,
  transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },
  ...props
}: TabsContentsProps) {
  const { activeValue } = useTabs();
  const childrenArray = Children.toArray(children);
  const activeIndex = childrenArray.findIndex(
    (child): child is React.ReactElement<{ value: string }> =>
      isValidElement(child) &&
      typeof child.props === "object" &&
      child.props !== null &&
      "value" in child.props &&
      child.props.value === activeValue
  );

  return (
    <div
      data-slot="tabs-contents"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <motion.div
        className="flex -mx-2"
        animate={{ x: `${activeIndex * -100}%` }}
        transition={transition}
      >
        {childrenArray.map((child, index) => {
          const element = child as React.ReactElement<TabsContentProps>;
          const value = element?.props?.value || `tab-content-${index}`;
          return (
            <div key={value} className="w-full shrink-0 px-2">
              {child}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

type TabsContentProps = HTMLMotionProps<"div"> & {
  value: string;
  children: React.ReactNode;
};

function TabsContent(props: TabsContentProps) {
  const { className, children, value, ...rest } = props;
  const { activeValue } = useTabs();
  const isActive = activeValue === value;

  return (
    <motion.div
      role="tabpanel"
      data-slot="tabs-content"
      className={cn("overflow-hidden", className)}
      initial={{ filter: "blur(0px)" }}
      animate={{ filter: isActive ? "blur(0px)" : "blur(4px)" }}
      exit={{ filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export {
  type TabsContentsProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsContextType,
  type TabsListProps,
  type TabsProps,
  TabsContents,
  TabsContent,
  TabsTrigger,
  TabsList,
  useTabs,
  Tabs,
};
