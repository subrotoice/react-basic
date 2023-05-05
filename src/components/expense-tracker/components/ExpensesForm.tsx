import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(100),
  amount: z
    .number({ invalid_type_error: "Age field must be required" })
    .min(0.01)
    .max(100000),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Catagory is required",
    }), // Returning object literals using the concise body syntax (params) => { object: literal } does not work as expected.
  }), //typescript problem, in app.js need ta add as const when declearing categories
});

type ExpensesFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpensesFormData) => void;
}

const ExpensesForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpensesFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <div className="mb-3">
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ExpensesForm;
