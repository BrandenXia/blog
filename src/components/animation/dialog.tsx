"use client";

import { AnimatePresence, m, MotionConfig } from "framer-motion";
import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import useClickOutside from "@/hooks/useClickOutside";
import cn from "@/lib/cn";

import type { Transition, Variant } from "framer-motion";

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
};

function DialogTrigger({ children, className, style, triggerRef }: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );

  return (
    <m.span
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      {...{
        className: cn("relative block cursor-pointer", className),
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        role: "button",
      }}
      style={style}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </m.span>
  );
}

type DialogContent = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContent) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(focusableElements[focusableElements.length - 1] as HTMLElement);
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <m.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      {...{ className: cn("overflow-hidden", className), role: "dialog" }}
      style={style}
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </m.div>
  );
}

type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContainer({ children }: DialogContainerProps) {
  const { isOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <m.span
            key={`backdrop-${uniqueId}`}
            {...{ className: "fixed inset-0 z-50 block size-full bg-base-100/40 backdrop-blur-xs" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <span className="fixed inset-0 z-50 flex items-center justify-center">{children}</span>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTitle({ children, className, style }: DialogTitleProps) {
  const { uniqueId } = useDialog();

  return (
    <m.div layoutId={`dialog-title-container-${uniqueId}`} {...{ className }} style={style} layout>
      {children}
    </m.div>
  );
}

type DialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
  const { uniqueId } = useDialog();

  return (
    <m.div layoutId={`dialog-subtitle-container-${uniqueId}`} {...{ className }} style={style}>
      {children}
    </m.div>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  return (
    <m.div
      key={`dialog-description-${uniqueId}`}
      layoutId={disableLayoutAnimation ? undefined : `dialog-description-content-${uniqueId}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...{ className, id: `dialog-description-${uniqueId}` }}
    >
      {children}
    </m.div>
  );
}

type DialogImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

function DialogImage({ src, alt, className, style }: DialogImageProps) {
  const { uniqueId } = useDialog();

  return <m.img {...{ src, alt, className }} layoutId={`dialog-img-${uniqueId}`} style={style} />;
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <m.button
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      {...{
        onClick: handleClose,
        type: "button",
        className: cn("absolute right-6 top-6", className),
      }}
    >
      {children || <span className="i-ph-x block" />}
    </m.button>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
};
