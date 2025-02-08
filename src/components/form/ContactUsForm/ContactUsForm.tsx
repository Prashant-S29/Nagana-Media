"use client";

// zod and rhf
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// schema
import {
  type ContactUsFormValues,
  ContactUsSchema,
} from "~/schema/contactUs_form.schema";

// form config
import { defaultValues } from "./config";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
// import { toast } from "sonner";

export const ContactUsForm: React.FC = () => {
  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactUsFormValues) => {
    console.log(data);

    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-normal text-black">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input {...field} className="text-black/60" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-black">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="min-h-[40px] text-black/60"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-normal text-black">Email</FormLabel>
                <FormControl>
                  <Input {...field} className="text-black/60" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-black">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="min-h-[40px] text-black/60"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-black">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input className="min-h-[40px] text-black/60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-black">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[80px] text-black/60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button variant="brand">Submit</Button>

        <p className="text-sm text-black/50">
          We value your privacy. Your information will be kept confidential and
          only used to respond to your inquiry
        </p>
      </form>
    </Form>
  );
};
