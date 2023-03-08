import { z, TypeOf } from "zod";

export const PostType = z.object({
    body: z.object ({
        title: z.
        string({
            required_error: "Title is required !",
            invalid_type_error: "Title must be string !"
        }),
        
    })
})

export type Posttypeschema = TypeOf<typeof PostType>["body"];