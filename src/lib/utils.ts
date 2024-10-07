import { Timestamp } from "firebase/firestore";
import { ChangeEvent } from "react";

export const onInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    // remove white space
    .replace(/\s+/g, "")
    // remove special characters
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "")
    // remove multiple dots
    .replace(/\.{2,}/g, "")
    // remove multiple hyphens
    .replace(/[^a-zA-Z0-9!@#%^()=+`~\\]/g, "");
};

export const base64ToFile = (base64: string, fileName: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

export function formatFirestoreTimestampToTime(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}
