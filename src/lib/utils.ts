import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function generateTenantURL(tenantSlug: string) {
//   //In development mode, use normal routing
//   if (process.env.NODE_ENV === "development") {
//     return `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tenants/${tenantSlug}`;
//   }

//   const protocol = "https";
//   // let protocol = "https";
//   const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

//   // if (process.env.NODE_ENV === "development") {
//   //   protocol = "http";
//   // }

//   //In production, use subdomain routing
//   return `${protocol}://${tenantSlug}.${domain}`;
// }

export function generateTenantURL(tenantSlug: string, path: string = "") {
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const port =
    process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_DEV_PORT
      ? `:${process.env.NEXT_PUBLIC_DEV_PORT}`
      : "";

  // Use subdomain routing in both dev and prod
  return `${protocol}://${tenantSlug}.${domain}${port}${path}`;
}

export function formatCurrency(value: number | string) {
  {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value));
  }
}
