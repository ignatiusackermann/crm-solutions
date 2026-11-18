import { shareContentType, shareSize, workShareCard } from "../share-card";

export const alt = "shades-of-blue case study by CRM Solutions";
export const size = shareSize;
export const contentType = shareContentType;

export default function Image() {
  return workShareCard("shades-of-blue");
}
