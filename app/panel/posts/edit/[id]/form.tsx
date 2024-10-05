"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { getToken, getUserId } from "@/utils/cookie"; // Import the getToken function
import { useToast } from "@/hooks/use-toast";
import Editor from "@/app/components/ui/TipTap"; // Import the updated TipTap component

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  categoryId: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be kebab-case.",
  }),
  icon: z.string(),
});

export default function EditForm() {
  const { id } = useParams(); // Get id from URL parameters
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "<p>Hello World! 🌎️</p>",
      categoryId: "",
      slug: "",
      icon: "",
    },
  });

  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/post/${id}`);
        const data = await response.json();
        setInitialData(data);
        form.reset(data); // Populate the form with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch post data.",
        });
      }
    }

    fetchData();
  }, [id, form, toast, apiUrl]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userId = await getUserId();

    const dataToSend = {
      ...values,
      userId: userId,
    };

    console.log("Data to send:", dataToSend);

    const token = await getToken();

    if (token) {
      // console.log('Extracted Token:', token); // Log the token directly
    } else {
      // console.log('No token found');
    }

    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
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
        description: "Post updated successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your post title. It must be unique.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} // Use onValueChange instead of spreading the field
                    value={String(field.value)} // Ensure the value is a string
                  >
                    <SelectTrigger>
                      <span>
                        {field.value
                          ? `Category ${field.value}`
                          : "Select a category"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Category 1</SelectItem>
                      <SelectItem value="2">Category 2</SelectItem>
                      <SelectItem value="3">Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select a category for your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input placeholder="arcticons:example" {...field} />
                </FormControl>
                <FormDescription>
                  Find the icon name on icones.js.org.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="kebab-case" {...field} />
                </FormControl>
                <FormDescription>
                  A unique identifier for your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Integrasi Editor dengan React Hook Form */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    initialContent={field.value || "<p>Hello World! 🌎️</p>"}
                    onContentChange={(content) => {
                      console.log("Editor content changed:", content);
                      field.onChange(content);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}