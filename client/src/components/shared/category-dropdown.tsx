"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideLoader2 } from "lucide-react";
import { toast } from "sonner"; // or your preferred toast lib
import API from "@/services/api";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

type Category = {
  _id: string;
  name: string;
};

type CategoriesResponse = {
  categories: Category[];
};

const CategoryDropDown = ({ onChange, value }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: categoriesData, isPending: isFetching } = useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async () => (await API.get("/categories")).data,
  });

  const categories = categoriesData?.categories ?? [];

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return q ? categories.filter((cat) => cat.name.toLowerCase().includes(q)) : categories;
  }, [categories, searchQuery]);

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (name: string) => API.post("/categories", { name }),
    onSuccess: (res) => {
      // Normalize API response shape
      const newCategory: Category = res.data.category ?? res.data;

      queryClient.setQueryData<CategoriesResponse>(["categories"], (old) => ({
        ...old,
        categories: [...(old?.categories ?? []), newCategory],
      }));

      onChange(newCategory._id);
      setNewCategoryName("");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create category. Please try again.");
    },
  });

  const handleCreate = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    createCategory(trimmed);
  };

  // Reset search when dropdown closes
  const handleOpenChange = (open: boolean) => {
    if (!open) setSearchQuery("");
  };

  return (
    <div className="w-full space-y-2">
      <Select value={value} onValueChange={onChange} onOpenChange={handleOpenChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>

        <SelectContent>
          <Input
            placeholder="Search categories..."
            className="m-2 w-[calc(100%-16px)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SelectGroup>
            {isFetching ? (
              <div className="flex justify-center py-6">
                <LucideLoader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))
            ) : (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No categories found
              </p>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit">+ Add new category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Enter the new category name.</DialogDescription>
          </DialogHeader>
          <Input
            autoFocus               // fix: auto-focus on open
            placeholder="e.g. Luxury Cars"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button
            onClick={handleCreate}
            disabled={isCreating || !newCategoryName.trim()}
            className="w-full"
          >
            {isCreating ? "Creating..." : "Create Category"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryDropDown;