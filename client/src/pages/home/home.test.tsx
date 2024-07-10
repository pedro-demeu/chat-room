import { afterEach, describe, expect, it } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import Home from "./home";
import TestProvider from "../../TestProvider";
import { Route } from "react-router-dom";

describe("Home Page - Tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("should be well received in home page", () => {
    render(
      <TestProvider>
        <Route Component={Home} path="/" />
      </TestProvider>
    );

    expect(screen.getByText("Olá usuário!")).toBeTruthy();
    expect(screen.getByText("Seja Bem-vindo(a) ao")).toBeTruthy();
    expect(screen.getByText("Chat Room | WS")).toBeTruthy();

    expect(
      screen.getByText("Somos uma plataforma de bate-papo em salas públicas.")
    ).toBeTruthy();
  });
  it.todo("should be join in existing room");
  it.todo("should be create new room");
});
