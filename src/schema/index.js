import { schema } from "normalizr";
//task schema
const taskSchema = new schema.Entity("tasks");
//project schema
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

export { projectSchema };
