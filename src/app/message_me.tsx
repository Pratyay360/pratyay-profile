import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "./message_me/page";

export const Route = createFileRoute("/message_me")({
  component: ContactPage,
});
