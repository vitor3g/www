"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePresenceState } from "@/states/zustand/animation-state";
import { useTransitionRouter } from "@/interceptors/next-router-interceptor";
import { motion } from "framer-motion";

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Insira seu nome e sobrenome.",
    }),

    email: z.string().email({
      message: "Insira um e-mail válido.",
    }),

    password: z.string().min(2, {
      message: "A senha deve ter no mínimo 2 caracteres.",
    }),
    confirm_password: z.string().min(2, {
      message: "A confirmação de senha deve ter no mínimo 2 caracteres.",
    }),
    privacy_policy: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser idênticas.",
    path: ["confirm_password"],
  });

export default function SignUpForm() {
  const presenceState = usePresenceState();
  const router = useTransitionRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      privacy_policy: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password, name } = data;

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={
        presenceState.presence && { opacity: 0, y: -20, filter: "blur(10px)" }
      }
      animate={
        presenceState.presence && { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      transition={
        presenceState.presence && { duration: 0.6, ease: "easeInOut" }
      }
      className="max-w-[480px] w-full flex flex-col justify-center  gap-5 2xl:gap-[48px] m-0 items-center"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Card className="flex flex-col border-none shadow-none">
            <CardContent className="flex flex-col gap-5 mt-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senha"
                        type="password"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senha"
                        type="password"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacy_policy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          className="rounded-[3px]"
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms2"
                          className="text-xs text-muted-foreground leading-relaxed"
                        >
                          Eu li, concordo e estou de acordo com as{" "}
                          <a href="#" className="tex-black underline">
                            Politicas de privacidade
                          </a>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="py-6 text-white">Entrar</Button>

              <span className="self-center text-sm text-muted-foreground flex flex-row space-x-1">
                <p>Já tem uma conta?</p>
                <a
                  onClick={() => router.push("/sign-in")}
                  className="cursor-pointer text-zinc-700 font-medium dark:text-white"
                >
                  Entrar agora
                </a>
              </span>
            </CardContent>
          </Card>
        </form>
      </Form>
    </motion.div>
  );
}
