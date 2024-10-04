"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ICourse } from "@/interfaces";
import { App, Button } from "antd";
import { PlayCircle } from "lucide-react";
import React from "react";
import WatchPromoModal from "./watch-promo-modal";
import { createPaymentIntent } from "@/server-actions/payments";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PurchaseCourse({ course }: { course: ICourse }) {
  const [showWatchPromo, setShowWatchPromo] = React.useState(false);
  const [paymentIntentResponse, setPaymentIntentResponse] =
    React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);

  const { message } = App.useApp();

  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await createPaymentIntent(course.price);
      if (response.success) {
        setPaymentIntentResponse(response.data);
        setShowCheckoutForm(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: paymentIntentResponse?.client_secret || "",
  };

  return (
    <div className="section-bg">
      <img
        src={course.coverImage}
        alt="course cover"
        className=" w-full h-60 rounded-2xl object-cover"
      />
      <div className="pt-5 grid grid-cols-2 rounded-lg gap-5">
        <Button
          icon={<PlayCircle size={12} />}
          onClick={() => setShowWatchPromo(true)}
        >
          Watch Promo
        </Button>
        <Button type="primary" onClick={paymentIntentHandler} loading={loading}>
          Buy Now ₹ {course.price}
        </Button>

        <p className="col-span-2 text-sm">
          Once you purchase the course, you will have lifetime access to the
          course and all the updates. You will also get a certificate of
          completion once you finish the course.
        </p>
      </div>

      {showWatchPromo && (
        <WatchPromoModal
          course={course}
          setShowWatchPromo={setShowWatchPromo}
          showWatchPromo={showWatchPromo}
        />
      )}

      {showCheckoutForm && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            course={course}
          />
        </Elements>
      )}
    </div>
  );
}
export default PurchaseCourse;
