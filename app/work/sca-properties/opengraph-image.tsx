import { shareContentType, shareSize, workShareCard } from "../share-card";

export const alt = "sca-properties case study by CRM Solutions";
export const size = shareSize;
export const contentType = shareContentType;

export default function Image() {
  return workShareCard("sca-properties");
}
