"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/zodSchema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { LogoGoogle } from "geist-icons";
import { useRouter } from "next/navigation";

const formSchema = signUpSchema;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/signup", values);
  
      if (res.status === 200 && res.data.redirect) {
        toast({ variant: "constructive", title: "User Created Successfully" });
        router.push(res.data.redirect)
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast({ title: "User already Exists", description: "Try Signing In" });
      } else {
        toast({
          variant: "destructive",
          title: "Internal Server Error",
          description: "Try again later",
        });
      }
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter a strong password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button size={"lg"} type="submit">
            Submit
          </Button>
          <Button
            size={"lg"}
            variant={"outline"}
            type="button"
            onClick={() => {
              signIn("google",{redirectTo:"/dashboard"});
            }}
          >
            <LogoGoogle />
            <div>Sign In With Google</div>
          </Button>
        </div>
      </form>
    </Form>
  );
}
