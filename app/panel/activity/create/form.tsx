"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getToken } from "@/utils/cookie";
import FormInput from "@/app/components/ui/FormInput";
import FormDate from "@/app/components/ui/FormDate";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@iconify/react";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  date: z.date(),
  icon: z.string(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      icon: "",
    },
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    const date = new Date(values.date);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const dataToSend = {
      ...values,
      date: formattedDate,
    };

    // console.log("Data to send:", dataToSend);

    const token = await getToken();

    try {
      const response = await fetch(`${apiUrl}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the authorization header
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast({
          title: "Error",
          description: "Network response was not ok",
        });
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log("Success:", data);
      toast({
        title: "Success",
        description: "Activity created successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the activity",
      });
    }
  }

  return (
    <div>
      {/* back button */}
      <div className="flex justify-between items-center mb-10">
        <Button variant={"outline"}
          onClick={() => {
            router.back();
          }}
        >
          <Icon icon="akar-icons:arrow-left" className="w-4 h-4 text-black" />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormInput
            control={form.control}
            name="name"
            label="Activity Name"
            placeholder="Launched erik.dev!"
          />
          <FormInput
            control={form.control}
            name="icon"
            label="Icon"
            placeholder="material-symbols:manage-history-rounded"
          />
          <FormDate
            control={form.control}
            name="date"
            label="Date"
            description="This is activity date"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
