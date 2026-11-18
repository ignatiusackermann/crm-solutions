import { shareContentType, shareSize, workShareCard } from "../share-card";

export const alt = "storvac case study by CRM Solutions";
export const size = shareSize;
export const contentType = shareContentType;

export default function Image() {
  return workShareCard("storvac");
}
