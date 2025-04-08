"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
// import { Label } from "@/components/ui/label";
import { Doc } from "@/convex/_generated/dataModel";
import { CheckIcon, KeyIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
type Props = {
  stripeSecretKey: Doc<"keys">;
  open: boolean;
  setOpen: (open: boolean) => void;
};

// In the context of Next.js, Zod is a TypeScript-first schema declaration and validation library used to define and validate data structures, ensuring type safety and data integrity, especially when handling forms and API requests.

const settingsKeySchema = z.object({
  stripeKey: z.string().min(32),
});

type SettingsKeyFormValues = z.infer<typeof settingsKeySchema>;

export function SettingsKey({ stripeSecretKey, open, setOpen }: Props) {
  const createStripeSecretKey = useMutation(api.keys.createStripeSecretKey);
  const router = useRouter();
  const form = useForm<SettingsKeyFormValues>({
    resolver: zodResolver(settingsKeySchema),
    defaultValues: {
      stripeKey: stripeSecretKey?.stripeKey,
    },
    mode: "onChange",
  });
  async function onSubmit(
    values: SettingsKeyFormValues,
    event: React.SyntheticEvent<HTMLFormElement>
  ) {
    // we do not want to execute the submit function in the parent form so we use stopPropagation
    event.stopPropagation();
    await createStripeSecretKey({ stripeKey: values.stripeKey });
    toast({ description: "Strip key updated" });
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-8" asChild>
        <Button variant="outline">
          {stripeSecretKey ? (
            <CheckIcon className="size-4 mr-2" />
          ) : (
            <KeyIcon className="size-4 mr-2" />
          )}
          Stripe Secret Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stripe Secret Key</DialogTitle>
          <DialogDescription>
            Add your stripe key here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="stripeKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="sk_1234567890"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter className="mt-4">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
