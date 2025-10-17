"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL!;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (loading) return;

  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const istFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });
  const timestamp = istFormatter.format(new Date());
  formData.append("Time", timestamp);

  const name = formData.get("Name")?.toString().trim() || "";
  const email = formData.get("Email")?.toString().trim() || "";
  const message = formData.get("Message")?.toString().trim() || "";

  if (!name || !email || !message) {
    toast.error("Please fill all fields.");
    setLoading(false);
    return;
  }

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    toast.success("Message sent!");
    form.reset();
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Failed to send message. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-foreground">
            Get in Touch
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Have a question or want to collaborate?
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                name="Name"
                placeholder="Your name"
                required
                className="border-slate-300 dark:border-slate-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="Email"
                type="email"
                placeholder="you@example.com"
                required
                className="border-slate-300 dark:border-slate-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="Message"
                rows={5}
                placeholder="Your message..."
                required
                className="border-slate-300 dark:border-slate-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-zinc-800 font-semibold shadow-md transition-all bg-indigo-800 dark:text-cyan-50"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
