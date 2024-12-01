import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/useToast"
import { Button, FormLabel, Heading } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui"
import { Input } from "@/components/ui"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "@/lib/routes"
import { RegistrationFormSchema } from "@/constants/schemas"
import { getUsersByEmail } from "@/api/queries"
import { fetchRegister } from "@/redux/user/actions"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectIsLoading } from "@/redux/user/selectors"

type UserValues = z.infer<typeof RegistrationFormSchema>

export const Registration = () => {
  const navigate = useNavigate()
  const loading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  const form = useForm<UserValues>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  })

  const onSubmit = async (user: UserValues) => {
    try {
      const users = await getUsersByEmail(user.email)

      if (!users) {
        throw new Error("Something went wrong")
      }

      if (users.length > 0) {
        throw new Error(
          "Registration failed. User with this E-mail is already existing"
        )
      }

      dispatch(fetchRegister(user)).then(() => {
        navigate(routes.home, { replace: true })
      })
    } catch (error) {
      const errorMessage = (error as Error).message

      return toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-4">
        <Heading>Sign up</Heading>
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
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeated password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Register
          </Button>
          <div className="text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to={routes.logIn} className="underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </Form>
  )
}
