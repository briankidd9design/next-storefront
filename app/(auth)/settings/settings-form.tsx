"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";

const settingFormSchema = z.object({
  username: z
    .string()
    // different validation rules
    .min(3, { message: "Username must be at least 3 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  about: z
    .string()
    .max(500, { message: "About must be less than 500 characters" }),
});
type SettingsFormValues = z.infer<typeof settingFormSchema>;

type Props = {
  // we use a string data type to reference a particular table
  user: Doc<"users">;
};

export function SettingsForm({ user }: Props) {
  //   return <div>Settings Form Content</div>;
  const updateUser = useMutation(api.users.updateUser);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingFormSchema),
    // defaultValues: {
    //   username: "",
    //   name: "",
    //   about: "",
    // },
    defaultValues: {
      ...user,
    },
    // we will immediately validate the form with "onChange"
    mode: "onChange",
  });
  //   return <div>SettingsForm</div>;

  async function onSubmit(values: SettingsFormValues) {
    // console.log(values);
    try {
      await updateUser({
        userId: user._id,
        username: values.username,
        name: values.name,
        about: values.about,
      });
      toast({
        description: "Settings updated",
      });
    } catch (error) {
      console.log(error);
      const message = error instanceof ConvexError ? error.data : "";
      if (message === "USERNAME_TAKEN") {
        form.setError("username", {
          message: "Username taken. Please choose another user name",
        });
      } else {
        toast({ description: "Failed to update settings" });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your store"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Settings</Button>
      </form>
    </Form>
  );
}
