'use client'
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getToken } from "@/utils/cookie";
import FormInput from "@/app/components/ui/FormInput";
import FormTextArea from "@/app/components/ui/FormTextArea";
import FormSelect from "@/app/components/ui/FormSelect";
import FormDate from "@/app/components/ui/FormDate";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  icon: z.string(),
  date: z.date(),
});

export default function ProfileForm() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      icon: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await fetch(`${apiUrl}/activities/${id}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Assuming getToken() is defined elsewhere
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // Convert date string to Date object
          data.date = new Date(data.date);
          form.reset(data); // Set the form values with the fetched data
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [id, form]);

  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    const date = new Date(values.date);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    const dataToSend = {
      ...values,
      date: formattedDate,
    };

    // console.log("Data to send:", dataToSend);

    const token = await getToken();

    try {
      const response = await fetch(`${apiUrl}/activities/${id}`, {
        method: "PUT",
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
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the project",
      });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormInput
            control={form.control}
            name="name"
            label="Project Name"
            placeholder="Project Mboh"
          />
          <FormDate
            control={form.control}
            name="date"
            label="Date"
            description="This is project date"
          />
          <FormInput
            control={form.control}
            name="icon"
            label="Icon"
            placeholder="material-symbols:manage-history-rounded"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}