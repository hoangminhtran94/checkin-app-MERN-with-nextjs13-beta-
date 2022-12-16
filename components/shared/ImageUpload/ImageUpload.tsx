import Image from "next/image";
import React, { useRef, useState } from "react";
import classes from "./ImageUpload.module.css";

interface ImageUploadProps {
  id?: string;
  onInput: (id: string, pickedFile: File, fileIsValid: boolean) => void;
  center?: string;
  errorText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File = null;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={classes["form-control"]} onClick={pickImageHandler}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`${classes["image-upload"]} ${props.center && "center"}`}>
        <div className={classes["image-upload__preview"]}>
          {previewUrl && (
            <Image src={previewUrl} width={60} height={60} alt="previewImage" />
          )}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
