import { z, TypeOf } from "zod";

export const UserType = z.object({
    body: z.object ({
        username: z.
        string({
            required_error: "Name is required !",
            invalid_type_error: "Name must be string !"
        }),

        password: z.
        string({
            required_error: "Password is required !",
            invalid_type_error: "Password must be string !"
        }),
        
        email: z.
        string({
            required_error: "Email is required !",
            invalid_type_error: "Name must be string !"
        }).
        email("This is not a valid email."),
    })
})

export type Usertypeschema = TypeOf<typeof UserType>["body"];