import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      unique: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "This is subdomain for the store",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "stripeDetailSubmited",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you submit your Stripe detail",
      },
    },
  ],
};
