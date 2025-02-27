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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import { useTransitionRouter } from "@/interceptors/next-router-interceptor";
import { usePresenceState } from "@/states/zustand/animation-state";
import { motion } from "framer-motion";
import { signIn, getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Insira um e-mail válido.",
  }),
  password: z.string().min(2, {
    message: "A senha deve ter no minimo 2 caracteres.",
  }),
  trust: z.boolean().optional(),
});

export default function SignInForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const presenceState = usePresenceState();
  const router = useTransitionRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token ?? null);
    };

    fetchCsrfToken();
  }, []);

  async function onSubmit(
    data?: z.infer<typeof FormSchema>,
    provider?: "apple" | "google" | "facebook"
  ) {
    if (csrfToken) {
      switch (provider) {
        case "google":
          await signIn("google", {
            csrfToken,
            callbackUrl: "/home",
          });
          break;

        case "facebook":
          console.log("facebook");
          await signIn("facebook", {
            csrfToken,
            callbackUrl: "/home",
          });
          break;

        case "apple":
          await signIn("apple", {
            csrfToken,
            callbackUrl: "/home",
          });
          break;

        default:
          if (data) {
            await signIn("credentials", {
              email: data.email,
              password: data.password,
              csrfToken,
              callbackUrl: "/home",
            });
          }
      }
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
      className="max-w-[480px] w-full flex flex-col justify-center gap-5 2xl:gap-[48px] m-0 items-center"
    >
      <Card className="flex w-full flex-col border-none shadow-none">
        <CardContent className="flex flex-col gap-5 mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((props) => onSubmit(props))}
              className="flex flex-col gap-2"
            >
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
                name="trust"
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
                          Confiar este dispositivo por 30 dias
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {csrfToken && (
                <input name="csrfToken" type="hidden" value={csrfToken} />
              )}

              <div className="w-full flex flex-col space-y-5 mt-5">
                <Button className="py-6 text-white">Entrar</Button>
                <Link
                  href="#"
                  className="self-end text-sm text-muted-foreground"
                >
                  Esqueceu a senha
                </Link>

                <span className="self-center text-sm text-muted-foreground flex flex-row space-x-1">
                  <p>Não tem uma conta?</p>
                  <a
                    onClick={() => router.push("/sign-up")}
                    className="cursor-pointer text-zinc-700 font-medium dark:text-white"
                  >
                    Criar agora
                  </a>
                </span>
              </div>
            </form>
          </Form>

          <div className="w-full h-[1px] bg-brex-signInLeftBorder dark:bg-border" />

          <div className="flex flex-col gap-2 w-full">
            <Button
              className="relative py-6 font-normal text-muted-foreground"
              size="lg"
              variant="outline"
              onClick={() => onSubmit(undefined, "google")}
            >
              <FcGoogle className="absolute left-5" />
              Entrar com o Google
            </Button>

            <Button
              className="relative py-6 font-normal text-muted-foreground"
              size="lg"
              onClick={() => onSubmit(undefined, "facebook")}
              variant="outline"
            >
              <FaFacebook className="absolute left-5 text-blue-500" />
              Entrar com o Facebook
            </Button>

            <Button
              className="relative py-6 font-normal text-muted-foreground"
              size="lg"
              disabled
              variant="outline"
            >
              <FaApple className="absolute left-5 text-black dark:text-white" />
              Entrar com a Apple
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
