"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
        toast({
          title: "Success!",
          description: "Please check your email to confirm your subscription.",
        });
        router.push("/newsletter/success");
      } else {
        setStatus("error");
        toast({
          title: "Error",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      if (status === "error") {
        setTimeout(() => setStatus("idle"), 3000);
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        required
        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-gray-400 dark:focus:border-neutral-600 text-gray-900 dark:text-neutral-200"
        disabled={status === "loading"}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className={`${
          status === "loading"
            ? "bg-gray-400"
            : status === "success"
            ? "bg-green-600"
            : "bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500"
        } text-white dark:text-black hover:opacity-90 transition-opacity whitespace-nowrap`}
      >
        {status === "loading"
          ? "Subscribing..."
          : status === "success"
          ? "Subscribed!"
          : "Subscribe"}
      </Button>
    </form>
  );
}
