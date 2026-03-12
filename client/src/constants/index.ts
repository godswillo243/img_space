export const menuOptions = [
  { label: "Profile", href: "/profile" },
  { label: "Upload Image", href: "/upload" },
  // { label: "Saved Images", href: "/saved" },
];

export const authFormFieldConfig = {
  username: {
    label: "Username",
    placeholder: "johndoe123",
    type: "text" as const,
  },
  email: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email" as const,
  },
  password: {
    label: "Password",
    placeholder: "••••••••",
    type: "password" as const,
  },
  confirmPassword: {
    label: "Confirm Password",
    placeholder: "••••••••",
    type: "password" as const,
  },
} satisfies Record<
  string,
  { label: string; placeholder: string; type: "text" | "email" | "password" }
>;
