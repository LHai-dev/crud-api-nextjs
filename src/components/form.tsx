"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { PhoneInput } from "./ui/phone-input";
import { FormInfo, FormSchema, GenderType } from "@/utils/user.type";
import { createUser } from "@/utils/user.api";
interface Prop{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phoneNumber: string;
}

export function InputForm() {
  
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      age: 18,
      gender: GenderType.MALE,
      phoneNumber: "",
    },
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Form User</CardTitle>
        <CardDescription>Enter your details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="user-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                        className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage  />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="សូមបញ្ចូលនាមត្រកូលរបស់អ្នក"
                        className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="18"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage  />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក"
                        defaultCountry="KH"
                        className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage  />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >
                      Gender
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={GenderType.MALE}>Male</SelectItem>
                        <SelectItem value={GenderType.FEMALE}>
                          Female
                        </SelectItem>
                        <SelectItem value={GenderType.OTHER}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage  />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full" form="user-form" disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
