"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema, GenderType } from "@/utils/user.type";

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      age: 18,
      gender: GenderType.MALE,
      phoneNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast.success("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-full max-w-[340px] overflow-x-auto rounded-md bg-neutral-900/80 p-3 text-xs text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    localStorage.setItem("user", JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <FormDescription className="text-center mb-8">
        <h1 className="text-3xl font-bold ">User Input</h1>
      </FormDescription>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Age
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="18"
                    className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+855 71988232"
                    className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Gender
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={GenderType.MALE}>Male</SelectItem>
                  <SelectItem value={GenderType.FEMALE}>Female</SelectItem>
                  <SelectItem value={GenderType.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-3 mt-2  text-white font-semibold rounded-xl"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
