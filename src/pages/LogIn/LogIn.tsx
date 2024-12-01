import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Heading } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { Input } from "@/components/ui"
import { LogInFormSchema } from "@/constants/schemas"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "@/lib/routes"
import { fetchLogIn } from "@/redux/user/actions"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectIsLoading } from "@/redux/user/selectors"

export const LogIn = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (user: z.infer<typeof LogInFormSchema>) => {
    dispatch(fetchLogIn(user)).then(() => {
      navigate(routes.home)
    })
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <Heading>Log in</Heading>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 md:w-2/3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Log in
          </Button>
          <div className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to={routes.registration} className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Form>
  )
}
