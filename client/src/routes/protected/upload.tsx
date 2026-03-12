import FileInput from "@/components/shared/file-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AxiosError } from "axios";
import { LucideLoader2 } from "lucide-react";
import { useRef, useState, type SubmitEvent } from "react";
import CategoryDropDown from "@/components/shared/category-dropdown";
import { useMutation } from "@tanstack/react-query";
import { handleCreateImage } from "@/services/actions";
import { createImageSchema } from "@/lib/validations";
import { useNavigate } from "react-router-dom";

type FormValues = {
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
};

const Upload = () => {
  const [values, setValues] = useState<Partial<FormValues>>({
    url: "",
    tags: [],
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const tagInputRef = useRef<HTMLInputElement>(null);

  const { isPending: isSubmitting, mutate: createImage } = useMutation({
    mutationFn: handleCreateImage,
    onSuccess: (data) => navigate("/images/" + data.image._id),
    onError: (err) => {
      setError(
        (err as AxiosError<Record<string, string>>).response?.data.error ??
          "Something went wrong",
      );
    },
  });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTag = () => {
    if (!tagInputRef.current) return;
    const value = tagInputRef.current.value.trim();
    if (!value) return;
    if (values.tags?.includes(value)) return;
    setValues((prev) => ({ ...prev, tags: [...(prev.tags ?? []), value] }));
    tagInputRef.current.value = "";
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const { success, error: validationError } =
      createImageSchema.safeParse(values);
    if (!success) {
      setError(validationError.issues[0].message);
      return;
    }
    await createImage(values);
  };

  return (
    <main className="w-full p-2">
      <div className="max-w-md mx-auto mt-auto space-y-6">
        <h1 className="font-bold text-xl">Upload Image</h1>
        <FileInput
          onChange={() => {}}
          url={values.url!}
          setUrl={(url) => setValues((prev) => ({ ...prev, url }))}
        />
        <form className="mb-8 space-y-6" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <CategoryDropDown
              onChange={(value: string) => handleChange("category", value)}
              value={values.category ?? ""}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <div className="flex items-center gap-2">
              <Input id="tags" ref={tagInputRef} />
              <Button variant="outline" type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(values.tags ?? []).map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Field>
          {error && (
            <p className="text-destructive font-medium text-sm">{error}</p>
          )}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LucideLoader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Upload;
