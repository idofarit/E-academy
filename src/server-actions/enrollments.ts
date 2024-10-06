"use server";

import EnrollmentModel from "@/models/enrollment-model";

export const saveEnrollment = async (payload: any) => {
  try {
    await EnrollmentModel.create(payload);
    return {
      success: true,
      message: "Enrollment saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
