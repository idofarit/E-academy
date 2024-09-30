import firebaseApp from "@/config/firebase-config";
import { saveMedia } from "@/server-actions/media-library";
import { App, Button, Input, Modal, Progress, Upload } from "antd";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import React from "react";

function MediaUploadModal({
  showMediaUploadModal,
  setShowMediaUploadModal,
  reloadData,
}: {
  showMediaUploadModal: boolean;
  setShowMediaUploadModal: (show: boolean) => void;
  reloadData: () => void;
}) {
  const { message } = App.useApp();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [progressDone, setProgressDone] = React.useState<number>(0);

  const onUpload = async () => {
    try {
      // upload video to firebase storage and get the download url
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `media/${selectedFile?.name}`);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressDone(progress);
        },
        (error) => {
          setLoading(false);

          throw error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            //   save media to mongoDb media library collection
            message.success("Media uploaded successfully");

            const response = await saveMedia({
              name: name,
              url: downloadURL,
              type: selectedFile?.type,
            } as any);

            if (response.success) {
              reloadData();
              setShowMediaUploadModal(false);
              setLoading(false);
              message.success("Media saved successfully");
            } else {
              setLoading(false);
              message.error(response.message);
            }
          });
        }
      );
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      open={showMediaUploadModal}
      onCancel={() => setShowMediaUploadModal(false)}
      title="Upload media"
      centered
      footer={false}
    >
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            onRemove={() => setSelectedFile(null)}
            maxCount={1}
          >
            <span className="text-xs">
              {selectedFile ? "Change video" : "click to upload"}
            </span>
          </Upload>
        </div>

        {loading && (
          <Progress
            style={{ width: "50%" }}
            percent={Number(progressDone.toFixed(2))}
            status="active"
            showInfo={true}
          />
        )}

        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowMediaUploadModal(false)}>cancel</Button>
          <Button
            type="primary"
            disabled={!selectedFile || !name}
            loading={loading}
            onClick={onUpload}
          >
            upload
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default MediaUploadModal;
