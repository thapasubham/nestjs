import { Connection } from "mongoose";
import { TODOSchema } from "../schema/todo.schema";

export const todoProviders= [
   { provide: 'TODO_MODEL',
    useFactory: (connection: Connection)=> connection.model('todo', TODOSchema),
    inject: ['DATABASE_CONNECTION']
} 
]