import { redirect } from "next/navigation";

export default function VendorRoot() {
  redirect("/vendor/new-orders");
}
