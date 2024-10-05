"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getToken } from "@/utils/cookie";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ToastAction } from "@radix-ui/react-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Projects = {
  id: string;
  name: string;
  categoryId: string;
  date: string;
  slug: string;
};

export const columns: ColumnDef<Projects>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "Author",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "MM/dd/yyyy"),
  },
  {
    id: "actions",
    /* eslint-disable react-hooks/rules-of-hooks */
    cell: ({ row }) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const activityId = row.original.id;
      const router = useRouter();
      const { toast } = useToast();
      const [isAlertOpen, setIsAlertOpen] = useState(false);

      // Function to fetch the slug based on project ID
      async function fetchActivityId(id: string) {
        try {
          const response = await fetch(
            `${apiUrl}/post/${id}`
          );
          const data = await response.json();
          return data.id; // Assuming the API response contains the slug in `data.slug`
        } catch (error) {
          console.error("Failed to fetch project slug", error);
        }
      }

      const handleDelete = async (id: string) => {
        const token = await getToken();
        try {
          const response = await fetch(
            `${apiUrl}/posts/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            toast({
              title: "Error",
              description: "Failed to delete the project",
            });
            throw new Error("Network response was not ok");
          }

          toast({
            title: "Success",
            description: "Project deleted successfully",
          });
          
        } catch (error) {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: "An error occurred while deleting the project",
          });
        }
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={async () => {
                  const id = await fetchActivityId(activityId);
                  if (id) {
                    console.log("Edit activity with id:", id);
                    // Navigate or perform other actions with the slug
                    router.push(`/panel/posts/edit/${id}`);
                  }
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(activityId);
                    setIsAlertOpen(false);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
