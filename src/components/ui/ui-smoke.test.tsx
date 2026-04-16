import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "./card";
import { Skeleton } from "./skeleton";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";

describe("Card sub-components", () => {
  it("renders all card parts together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders Card with sm size", () => {
    render(<Card size="sm"><CardContent>Small</CardContent></Card>);
    expect(screen.getByText("Small")).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("renders with custom className", () => {
    render(<Skeleton className="w-20 h-4" data-testid="skel" />);
    expect(screen.getByTestId("skel")).toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("renders horizontal separator", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders default variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders destructive variant", () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("renders outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });
});

describe("Button", () => {
  it("renders default button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("renders all size variants", () => {
    render(
      <>
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="lg">LG</Button>
        <Button size="icon">I</Button>
        <Button size="icon-xs">IX</Button>
        <Button size="icon-sm">IS</Button>
        <Button size="icon-lg">IL</Button>
      </>
    );
    expect(screen.getByText("XS")).toBeInTheDocument();
    expect(screen.getByText("LG")).toBeInTheDocument();
  });
});

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });
});
