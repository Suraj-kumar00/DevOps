'use client';

import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../../components/ui/use-toast";

export function RefreshButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRefresh = () => {
    router.refresh();
    toast({
      title: "Refreshing blogs",
      description: "Fetching the latest blog posts...",
    });
  };

  return (
    <Button 
      onClick={handleRefresh}
      className="mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-neutral-200 dark:to-neutral-500 text-white"
    >
      Fetch Latest Blogs
    </Button>
  );
} 