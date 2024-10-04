"use client";

import { ICourse } from "@/interfaces";
import { Button } from "antd";
import { PlayCircle } from "lucide-react";
import React from "react";
import WatchPromoModal from "./watch-promo-modal";

function PurchaseCourse({ course }: { course: ICourse }) {
  const [showWatchPromo, setShowWatchPromo] = React.useState(false);

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
        <Button
          type="primary"
          //  onClick={paymentIntentHandler}
          //  loading={loading}
        >
          Buy Now {/* {course.price} */}
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

      {/* {showCheckoutForm && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            course={course}
          />
        </Elements>
      )} */}
    </div>
  );
}
export default PurchaseCourse;
