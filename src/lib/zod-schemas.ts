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
  { message: "Debes modificar al menos un campo", path: ["_form"] }
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

