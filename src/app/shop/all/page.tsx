import { redirect } from "next/navigation";

export default function ShopAllRedirect() {
  redirect("/products");
}

