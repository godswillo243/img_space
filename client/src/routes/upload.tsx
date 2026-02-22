import React from "react";
import FormField from "../components/form-field";
import FileInput from "../components/file-input";

const Upload = () => {
    return (
        <div className="w-full">
            <form className="space-y-6 p-4 my-8 flex flex-col items-center">
                <FileInput />
                <FormField
                    as="input"
                    type="text"
                    onChange={() => {}}
                    label="Title"
                    id="title"
                />
                <FormField
                    as="textarea"
                    onChange={() => {}}
                    label="Description"
                    id="description"
                />

                <button className="bg-blue-500 mx-auto w-full max-w-3/4">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default Upload;
