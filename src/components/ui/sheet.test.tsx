import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";
import { Button } from "./button";

describe("Sheet", () => {
  it("renders trigger", () => {
    render(
      <Sheet>
        <SheetTrigger render={<Button />}>Open Sheet</SheetTrigger>
      </Sheet>
    );
    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });

  it("renders sheet content when open", () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <p>Sheet body</p>
          <SheetFooter>
            <SheetClose render={<Button />}>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    expect(screen.getByText("Sheet Description")).toBeInTheDocument();
    expect(screen.getByText("Sheet body")).toBeInTheDocument();
  });

  it("renders content on left side", () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <p>Left content</p>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Left content")).toBeInTheDocument();
  });

  it("renders without close button when showCloseButton is false", () => {
    render(
      <Sheet open>
        <SheetContent showCloseButton={false}>
          <p>No close btn</p>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("No close btn")).toBeInTheDocument();
  });
});
