import { useRef, useState } from "react";
import { LucideUpload } from "lucide-react";
const FileInput = ({ onChange }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleClick = () => {
        const el = inputRef.current;
        if (!el) return;
        el.click();
    };

    const handleChange = e => {
      if(!e.target.files) return
    };

    return (
        <section
            className="bg-neutral-700 w-full aspect-video rounded-lg flex items-center justify-center flex-col gap-4"
            onClick={handleClick}
        >
            <LucideUpload classname="w-16" />
            <p>Click to select image.</p>

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                hidden
                onChange={handleChange}
            />
        </section>
    );
};

export default FileInput;
