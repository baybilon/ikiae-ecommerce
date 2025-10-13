import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Technology",
    color: "#3A86FF",
    slug: "technology",
    subcategories: [
      { name: "Computers", slug: "computers" },
      { name: "Smartphones", slug: "smartphones" },
      { name: "Gadgets", slug: "gadgets" },
      { name: "Software", slug: "software" },
    ],
  },

  {
    name: "Fashion & Style",
    color: "#F3722C",
    slug: "fashion-style",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Accessories", slug: "accessories" },
      { name: "Shoes", slug: "shoes" },
    ],
  },

  {
    name: "Health & Fitness",
    color: "#00FF8D",
    slug: "health-fitness",
    subcategories: [
      { name: "Nutrition", slug: "nutrition" },
      { name: "Workout Gear", slug: "workout-gear" },
      { name: "Yoga & Meditation", slug: "yoga-meditation" },
      { name: "Supplements", slug: "supplements" },
      { name: "Sports Equipment", slug: "sports-equipment" },
    ],
  },

  {
    name: "Beauty & Personal Care",
    color: "#FF5F7E",
    slug: "beauty-personal-care",
    subcategories: [
      { name: "Skincare", slug: "skincare" },
      { name: "Haircare", slug: "haircare" },
      { name: "Makeup", slug: "makeup" },
      { name: "Fragrance", slug: "fragrance" },
      { name: "Men's Grooming", slug: "mens-grooming" },
    ],
  },

  {
    name: "Food & Beverages",
    color: "#00BFA6",
    slug: "food-beverages",
    subcategories: [
      { name: "Snacks", slug: "snacks" },
      { name: "Coffee & Tea", slug: "coffee-tea" },
      { name: "Organic Products", slug: "organic-products" },
      { name: "Cooking Essentials", slug: "cooking-essentials" },
      { name: "Beverages", slug: "beverages" },
    ],
  },

  {
    name: "Home & Living",
    color: "#FF9F1C",
    slug: "home-living",
    subcategories: [
      { name: "Furniture", slug: "furniture" },
      { name: "Home Decor", slug: "home-decor" },
      { name: "Kitchenware", slug: "kitchenware" },
      { name: "Lighting", slug: "lighting" },
      { name: "Storage", slug: "storage" },
    ],
  },
  {
    name: "Toys & Hobbies",
    color: "#4ECDC4",
    slug: "toys-hobbies",
    subcategories: [
      { name: "Board Games", slug: "board-games" },
      { name: "Model Kits", slug: "model-kits" },
      { name: "Collectibles", slug: "collectibles" },
      { name: "RC & Drones", slug: "rc-drones" },
      { name: "Puzzles", slug: "puzzles" },
    ],
  },
  {
    name: "Automotive",
    color: "#F0E68C",
    slug: "automotive",
    subcategories: [
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Motorbike Gear", slug: "motorbike-gear" },
      { name: "Maintenance", slug: "maintenance" },
      { name: "Parts & Tools", slug: "parts-tools" },
      { name: "Car Electronics", slug: "car-electronics" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },

  {
    name: "Pets & Animals",
    color: "#F9C74F",
    slug: "pets-animals",
    subcategories: [
      { name: "Pet Food", slug: "pet-food" },
      { name: "Pet Accessories", slug: "pet-accessories" },
      { name: "Pet Health", slug: "pet-health" },
      { name: "Aquarium", slug: "aquarium" },
      { name: "Pet Toys", slug: "pet-toys" },
    ],
  },
  {
    name: "Music & Audio",
    color: "#9B5DE5",
    slug: "music-audio",
    subcategories: [
      { name: "Instruments", slug: "instruments" },
      { name: "Recording Equipment", slug: "recording-equipment" },
      { name: "Headphones", slug: "headphones" },
      { name: "Vinyl & CDs", slug: "vinyl-cds" },
      { name: "Music Accessories", slug: "music-accessories" },
    ],
  },
  {
    name: "Photography & Video",
    color: "#06AED5",
    slug: "photography-video",
    subcategories: [
      { name: "Cameras", slug: "cameras" },
      { name: "Lenses", slug: "lenses" },
      { name: "Photography Lighting", slug: "photo-lighting" },
      { name: "Tripods", slug: "tripods" },
      { name: "Editing Tools", slug: "editing-tools" },
    ],
  },
  {
    name: "Outdoor & Adventure",
    color: "#4CAF50",
    slug: "outdoor-adventure",
    subcategories: [
      { name: "Camping Gear", slug: "camping-gear" },
      { name: "Hiking", slug: "hiking" },
      { name: "Cycling", slug: "cycling" },
      { name: "Fishing", slug: "fishing" },
      { name: "Climbing", slug: "climbing" },
    ],
  },

  {
    name: "Gaming",
    color: "#06D6A0",
    slug: "gaming",
    subcategories: [
      { name: "Consoles", slug: "consoles" },
      { name: "PC Gaming", slug: "pc-gaming" },
      { name: "Gaming Accessories", slug: "gaming-accessories" },
      { name: "Games", slug: "games" },
      { name: "VR & AR", slug: "vr-ar" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const adminAccount = await stripe.accounts.create({});

  //Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    },
  });

  // create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "admin",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seeding completed !");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding:", error);
  process.exit(1);
}
