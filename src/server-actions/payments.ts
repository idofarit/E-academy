"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (coursePrice: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: coursePrice * 100,
      currency: "inr",
      description: "Course Purchase From E-Learning",
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(paymentIntent)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
