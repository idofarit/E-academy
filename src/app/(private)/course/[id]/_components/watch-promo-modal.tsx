import { ICourse } from "@/interfaces";
import { Modal } from "antd";

function WatchPromoModal({
  showWatchPromo,
  setShowWatchPromo,
  course,
}: {
  showWatchPromo: boolean;
  setShowWatchPromo: (showWatchPromo: boolean) => void;
  course: ICourse;
}) {
  return (
    <Modal
      open={showWatchPromo}
      onCancel={() => setShowWatchPromo(false)}
      title="Watch Promo"
      footer={null}
    >
      <video src={course.promoVideo} controls autoPlay className="w-full" />
    </Modal>
  );
}
export default WatchPromoModal;
