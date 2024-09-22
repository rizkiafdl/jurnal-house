"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/action/login"

export const LoginForm = () => {
    const [isError, setError] = useState<string | undefined>("")
    const [isSuccess, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome Back!"
            backButtonLabel="Don't Have an account?"
            backButtonHref="/auth/register"
            showSocial>
            Login Form!
            <Form{...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="rizki@gmail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                    </div>
                    <FormError message={isError} />
                    <FormSuccess message={isSuccess} />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>

    )
}
