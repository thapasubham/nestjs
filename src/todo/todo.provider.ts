import { Connection } from "mongoose";
import { TODOScheme } from "../schema/todo.schema";

export const todoProviders= [
   { provide: 'TODO_MODEL',
    useFactory: (connection: Connection)=> connection.model('todo', TODOScheme),
    inject: ['DATABASE_CONNECTION']
} 
]