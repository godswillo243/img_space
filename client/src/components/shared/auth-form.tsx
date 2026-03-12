import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  signinSchema,
  signupSchema,
  type SigninInput,
  type SignupInput,
} from "@/lib/validations";
import { authFormFieldConfig } from "@/constants";
import { LucideLoader2 } from "lucide-react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signUp } from "@/services/actions";
import { setLocalStorage } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/auth-store";

type AuthType = "signin" | "signup";

interface Props {
  type: AuthType;
}

const AuthForm = ({ type }: Props) => {
  const isSignup = type === "signup";
  const queryClient = useQueryClient();

  const form = useForm<SigninInput | SignupInput>({
    resolver: zodResolver(isSignup ? signupSchema : signinSchema),
    defaultValues: isSignup
      ? {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        },
    mode: "onChange",
  });

  const {
    isPending: isSubmitting,
    mutate,
    error,
  } = useMutation({
    mutationFn: isSignup ? signUp : signIn,
  });

  const onSubmit = async (formData: SigninInput | SignupInput) => {
    try {
      await mutate(formData, {
        onSuccess: (result) => {
          setLocalStorage("accessToken", result.accessToken);
          useAuthStore.setState((state) => ({
            ...state,
            accessToken: result.accessToken,
          }));
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fields = isSignup
    ? (["username", "email", "password", "confirmPassword"] as const)
    : (["email", "password"] as const);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isSignup ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignup
            ? "Enter your details to get started"
            : "Enter your credentials to sign in"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {fields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {authFormFieldConfig[fieldName].label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={authFormFieldConfig[fieldName].type}
                        placeholder={authFormFieldConfig[fieldName].placeholder}
                        autoComplete={
                          fieldName === "password" ||
                          fieldName === "confirmPassword"
                            ? "new-password"
                            : fieldName === "email"
                              ? "email"
                              : "username"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {isSubmitting ? (
                <LucideLoader2 className="animate-spin" />
              ) : isSignup ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        {error && (
          <p className="text-destructive font-medium text-sm mt-4 ">
            {
              (error as AxiosError<Record<string, string>>)?.response?.data
                ?.error
            }
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        {isSignup ? (
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <a href="/sign-up" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
