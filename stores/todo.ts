import { defineStore } from "pinia";
 
export interface Todo {
 id: number;
 title: string;
 completed: boolean;
}
 
export type Todos = Todo[] | undefined[];
 
export interface TodoAdd {
 title: string;
}
 
export interface TodoUpdate {
 completed?: boolean;
}
 
interface TodoState {
 items: Todos;
}
 
const state = (): TodoState => ({
 items: [
   {
     id: 1,
     title: 'Complete this project',
     completed: true
   }
 ],
});
 
const getters = {
 getTodoById: (state: TodoState) => {
   return (id: number) =>
     state.items.find((item) => !!item && (item as Todo).id == id);
 },
};
 
export const useTodoStore = defineStore("todoStore", {
 state,
 getters,
 actions: {
   async add(todo: TodoAdd) {
     this.items.push({id: Math.random(), ...todo});
   },
   async remove(id: number) {
     this.items = this.items.filter((item) => item.id !== id);
   },
   async update(id: number, updatedTodo: TodoUpdate) {
     const items = this.items as Todos;
     const index = items.findIndex(
       (item) => !!item && (item as Todo).id == id
     );
 
     items[index] = { ...items[index], ...updatedTodo };
   },
 },
});