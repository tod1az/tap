import z from "zod";

//Items
export const itemSchema = z.object({
  description: z.string().min(1, "Campo obligatorio").max(100, "No debe exceder 100 caracteres"),
  stock: z.string()
    .min(1, "Campo obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "El stock debe ser un número válido mayor o igual a 0"),
  price: z.string()
    .min(1, "Campo obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "El precio debe ser un número válido mayor a 0"),
});

export type ItemFormData = z.infer<typeof itemSchema>;

export const EditItemSchema = z.object({
  id: z.number(),
  description: z
    .string()
    .max(100, "No debe exceder 100 caracteres")
    .optional()
    .refine((val) => !val || val.length >= 1, { message: "Campo obligatorio" }),

  stock: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      { message: "El stock debe ser un número válido mayor o igual a 0" }
    ),

  price: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      { message: "El precio debe ser un número válido mayor a 0" }
    ),
}).refine(
  (data) => data.description || data.stock || data.price,
  { message: "Debes modificar al menos un campo", path: ["root"] }
);

export type EditItemFormData = z.infer<typeof EditItemSchema>


//Assigments

export const assignmentSchema = z.object({
  title: z.string()
    .min(1, "El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string()
    .min(1, "La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  dueDate: z.string()
    .min(1, "La fecha de vencimiento es obligatoria"),
});



export type AssignmentFormData = z.infer<typeof assignmentSchema>;

export const updateAssignSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
})


export type UpdateAssignForm = z.infer<typeof updateAssignSchema>


//Employees

export const employeeSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  lastname: z.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),
  email: z.email("Ingresa un email válido")
    .min(5, "El email debe tener al menos 5 caracteres")
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;


export const updateEmployeeSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras")
    .optional(),
  lastname: z.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras")
    .optional(),
  email: z.email("Ingresa un email válido")
    .min(5, "El email debe tener al menos 5 caracteres")
    .optional(),
  password: z.string()
    .optional(),
  role: z.enum(["admin", "user"])
    .optional(),
}).refine(
  (data) => data.name || data.lastname || data.email || data.password || data.role,
  { message: "Debes modificar al menos un campo", path: ["_form"] }
);

export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;

export interface UpdateEmployeeData extends UpdateEmployeeFormData {
  id: number
}



