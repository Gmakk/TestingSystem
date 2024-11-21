import { z } from "zod";
import { httpRequest } from "./http";

const userCreateSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    age: z.number().min(18),
});

const userDtoSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    age: z.number()
})

async function createUser() {
    const userData = { name: 'John Doe', email: 'john.doe@example.com', age: 25 };
    const result = await httpRequest.request(
        'POST',
        '/users',
        userData,
        undefined,
        userDtoSchema,
        userCreateSchema
    );

    if ('error' in result) {
        console.error('Ошибка:', result.error);
    } else {
        console.log('Пользователь создан:', result);
    }
}

createUser();
