import { Card } from "../../../components/ui/card";
import Link from "next/link";

export default function NewsletterSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full bg-white/50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 backdrop-blur-sm p-8">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-neutral-200 dark:to-neutral-500">
            Subscription Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 mb-8 text-lg">
            Thank you for subscribing to our newsletter. You&apos;ll now receive
            updates about cloud computing and DevOps directly in your inbox.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500 hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
