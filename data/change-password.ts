'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
// Adjust import path
import { changePasswordSchema } from "@/schema/profile";
import * as z from "zod";
import { updateProfileData } from "@/action/profile/update-profile-data";
import { changePassword } from "@/action/profile/change-password";
import { globalToast } from "@/utils/global-toast";
import { toast } from "sonner";

type UpdateProfileData = z.infer<typeof changePasswordSchema>;

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: {
    userId: number;
    username: string;
    email: string;
    fullName?: string;
    gender?: "male" | "female";
  };
}

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileData>({
    mutationFn: async (values: UpdateProfileData) => {
      const result = await changePassword(values);

      // If the server action returns success: false, throw an error
      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (data) => {
      // Invalidate and refetch profile data after successful update
      // queryClient.invalidateQueries({ 
      //   queryKey: ['getProfileData'] // Adjust to match your profile query key
      // });
      globalToast({
        description: data.message || "Password changed succesfully",
        variant: 'default'
      });
      // Optionally update the cache directly instead of refetching
      // queryClient.setQueryData(['profile'], (oldData: any) => ({
      //   ...oldData,
      //   data: data.data
      // }));
    },
    onError: (error) => {
      console.error('Password update failed:', error.message);
      globalToast({
        description: error.message || "Password changed failed",
        variant: 'destructive'
      });
      toast(`Failed to update password. Please try again`);
    }
  });
};

// Usage example in your component:
/*
const updateProfileMutation = useUpdateProfile();

const onProfileSubmit = async (data: UserFormData) => {
  try {
    await updateProfileMutation.mutateAsync(data);
    toast({
      title: "Profile updated successfully",
      description: "Your profile information has been saved.",
    });
  } catch (error) {
    toast({
      title: "Update failed",
      description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
      variant: "destructive",
    });
  }
};

// Or using the mutation callbacks:
const handleUpdateProfile = (data: UserFormData) => {
  updateProfileMutation.mutate(data, {
    onSuccess: () => {
      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
*/