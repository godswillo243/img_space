import { useState, useCallback } from "react";
import { LucideImagePlus, LucideLoader2, LucideX } from "lucide-react";

import { useDropzone } from "react-dropzone";

import { handleDeleteUpload, handleFileUpload } from "@/services/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

import { imageFileSchema } from "@/lib/validations";
type FileInputProps = {
  onChange: (url: string) => void;
  url: string;
  setUrl: (url: string) => void;
};

const FileInput = ({ onChange, url, setUrl }: FileInputProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingUpload, setIsDeletingUpload] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const validationResult = imageFileSchema.safeParse(file);
    if (!validationResult.success)
      return setError(validationResult.error.issues[0].message);

    setIsUploading(true);
    (async () => {
      try {
        const { secure_url, public_id } = await handleFileUpload(file);
        setUrl(secure_url);
        setPublicId(public_id);
        onChange(secure_url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    })();
  }, []);

  const handleCancelUpload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!publicId) return;
    setIsDeletingUpload(true);
    setError("");
    try {
      const ok = await handleDeleteUpload(publicId);
      if (ok) {
        setUrl("");
        setPublicId("");
        onChange("");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to delete image");
    } finally {
      setIsDeletingUpload(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Card>
        <CardContent
          className={cn(
            "cursor-pointer w-full max-w-full aspect-video relative",
            "rounded-lg flex items-center justify-center flex-col gap-4 ",
          )}
          {...getRootProps()}
        >
          {isUploading ? (
            <div className="size-full flex flex-col items-center justify-center gap-4">
              <LucideLoader2 className="animate-spin size-10" />
              <p className="text-card-foreground text-sm font-medium">
                Uploading image...
              </p>
            </div>
          ) : url ? (
            <div className="w-full h-full">
              <img src={url} className="w-full h-full object-contain" />
            </div>
          ) : (
            <>
              <LucideImagePlus className="size-12 text-card-foreground" />
              <p className="text-center text-sm text-card-foreground">
                {" "}
                Drag and drop image here <br /> or <br /> Click to select image.
              </p>
            </>
          )}

          <Button
            variant={"outline"}
            hidden={!url}
            type="button"
            onClick={handleCancelUpload}
            disabled={isDeletingUpload}
            className=" p-2! absolute top-2 right-2 rounded-full!"
          >
            {isDeletingUpload ? (
              <LucideLoader2 className="size-6 animate-spin" />
            ) : (
              <LucideX className="size-6" />
            )}
          </Button>

          <Input type="file" accept="image/*" {...getInputProps()} />
        </CardContent>
      </Card>
      {error && <p className="text-destructive mt-2 font-medium ">{error}</p>}
    </>
  );
};

export default FileInput;
