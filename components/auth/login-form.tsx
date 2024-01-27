"use client"

import { CardWrapper } from "./card-wrapper"
import * as z from "zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Form , FormControl , FormField ,FormItem ,FormLabel ,FormMessage } from "@/components/ui/form"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

export const LoginForm = () =>{

    const[error , setError] = useState<string | undefined>('')
    const[success , setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
          login(values )
            .then((data) => {
              if (data?.error) {
                form.reset();
                setError(data.error);
              }

              if (data?.success) {
                form.reset();
                setSuccess(data.success);
              }

            //   if (data?.twoFactor) {
            //     setShowTwoFactor(true);
            //   }
            })
            .catch(() => setError("Something went wrong"));
        });
      };

    return(
        <CardWrapper
            headerLabel="Welcome back"
            backButtonHref="/auth/register"
            backButtonLabel="Dont have an account?"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
                     <div className='space-y-4'>
                        <FormField
                         control={form.control}
                         name="email"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type="email"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}/>
                          <FormField
                         control={form.control}
                         name="password"
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} {...field} placeholder="*****" type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}/>
                     </div>
                     <FormError message={error}/>
                     <FormSuccess message={success}/>
                     <Button disabled={isPending} type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}