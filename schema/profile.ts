
import { z } from 'zod';

const passwordSchema = z.string().min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );
// http://localhost:4000/api/v1/users/change-password -> PUT

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: passwordSchema
});


// http://localhost:4000/api/v1/profiles  -> PUT
export const UserSchema = z.object({
  userId: z.number(),
  username: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  fullName: z.string().min(2).max(100).optional(),
  gender: z.enum(['male', 'female']).optional(),
});