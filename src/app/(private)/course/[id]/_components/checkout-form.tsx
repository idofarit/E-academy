import { ICourse } from "@/interfaces";
import { App, Button, Modal } from "antd";
import React from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { saveEnrollment } from "@/server-actions/enrollments";
import usersGlobalStore, { IUserGlobalStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

function CheckoutForm({
  showCheckoutForm,
  setShowCheckoutForm,
  course,
}: {
  course: ICourse;
  showCheckoutForm: boolean;
  setShowCheckoutForm: (showCheckoutForm: boolean) => void;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const { message } = App.useApp();
  const { currentUserData } = usersGlobalStore() as IUserGlobalStore;

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/user/enrolled-courses",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");

        // saving course enrollment
        const response = await saveEnrollment({
          course: course._id,
          student: currentUserData?._id!,
          amount: course.price,
          paymentId: result.paymentIntent.id,
        });

        if (!response.success) {
          message.error(response.message);
          return;
        }

        message.success("Enrolled in the course successfully");
        setShowCheckoutForm(false);
        router.push("/user/enrolled-courses");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Buy ${course.title}`}
      centered
      footer={null}
      open={showCheckoutForm}
      onCancel={() => setShowCheckoutForm(false)}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            allowedCountries: ["in"],
            mode: "shipping",
          }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button disabled={loading}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay $ {course.price}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default CheckoutForm;
