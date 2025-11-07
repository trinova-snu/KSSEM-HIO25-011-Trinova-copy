import { Recipe, InventoryItem, SmartPlateData, UserProfile, WasteHotspot, LearningModuleContent } from '../types';

// --- MOCK IMPLEMENTATION ---
// All Gemini API calls have been replaced with mock data providers to ensure
// the application can be deployed on services like Vercel without needing
// API keys or a backend. The AI features are currently disabled.

const mockApiCall = <T>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

const mockApiError = (message: string, delay = 500): Promise<any> => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), delay));
}

export interface GeoLocation {
    latitude: number;
    longitude: number;
}

export interface NgoWithCoords {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

export const getRecipeSuggestions = async (foodItem: string, userProfile: UserProfile | null, language: string): Promise<Recipe[]> => {
    console.log("MOCK API: getRecipeSuggestions for", foodItem);
    const mockRecipes: Recipe[] = [
        {
            name: `Tasty ${foodItem} Stir-fry`,
            description: "A quick and delicious stir-fry that's perfect for a weeknight dinner, using up your ingredients efficiently.",
            ingredients: [`1 lb ${foodItem}`, "1 cup broccoli florets", "1 red bell pepper, sliced", "2 tbsp soy sauce", "1 tbsp sesame oil", "1 clove garlic, minced"],
            instructions: ["Prepare all your vegetables and chop the main ingredient.", "Heat sesame oil in a large skillet or wok over medium-high heat.", "Add garlic and stir-fry for 30 seconds until fragrant.", "Add the main ingredient and vegetables, and cook for 5-7 minutes until tender-crisp.", "Stir in soy sauce and serve immediately."]
        },
        {
            name: `Roasted ${foodItem} with Herbs`,
            description: `A simple yet elegant way to prepare your ${foodItem}, highlighting its natural flavors with aromatic herbs.`,
            ingredients: [`1.5 lbs ${foodItem}`, "2 tbsp olive oil", "1 tsp dried rosemary", "1 tsp dried thyme", "Salt and pepper to taste"],
            instructions: ["Preheat your oven to 400°F (200°C).", `Toss the ${foodItem} with olive oil, rosemary, thyme, salt, and pepper.`, "Arrange in a single layer on a baking sheet.", "Roast for 20-25 minutes, or until cooked through and lightly browned.", "Let it rest for a few minutes before serving."]
        }
    ];
    return mockApiCall(mockRecipes, 1000);
};

export const geocodeLocation = async (address: string): Promise<GeoLocation> => {
    console.log("MOCK API: geocodeLocation for", address);
    if (address.includes("New York")) return mockApiCall({ latitude: 40.7128, longitude: -74.0060 });
    if (address.includes("Los Angeles")) return mockApiCall({ latitude: 34.0522, longitude: -118.2437 });
    if (address.includes("Miami")) return mockApiCall({ latitude: 25.7617, longitude: -80.1918 });
    if (address.includes("Denver")) return mockApiCall({ latitude: 39.7392, longitude: -104.9903 });
    return mockApiCall({ latitude: 37.7749, longitude: -122.4194 }); // Default to SF
};

export const getBusinessNames = async (location: string, businessType: 'restaurant' | 'food bank'): Promise<string[]> => {
    console.log("MOCK API: getBusinessNames for", location);
    if (businessType === 'restaurant') {
        return mockApiCall(['The Corner Bistro', 'Sunset Grill', 'Harborview Fine Dining', 'Mountain Top Cafe', 'Plaza Restaurant']);
    }
    return mockApiCall(['Community Food Pantry', 'City Harvest Center', 'Hope Food Bank', 'Regional Distribution Hub', 'The Giving Table']);
};

export const getSmartRecipes = async (foodItems: string[], userProfile: UserProfile | null, language: string): Promise<Recipe[]> => {
    console.log("MOCK API: getSmartRecipes for", foodItems.join(', '));
    const mockRecipes: Recipe[] = [
        {
            name: `Expiring Soon Casserole`,
            description: `A hearty and delicious casserole that combines ${foodItems.join(', ')} into one cohesive meal.`,
            ingredients: [...foodItems, "1 cup shredded cheese", "1 can cream of mushroom soup", "1/2 cup breadcrumbs"],
            instructions: ["Preheat oven to 375°F (190°C).", "Combine all ingredients except breadcrumbs in a large bowl and mix well.", "Transfer to a greased 9x13 inch baking dish.", "Top with breadcrumbs.", "Bake for 25-30 minutes, or until bubbly and golden brown."]
        }
    ];
    return mockApiCall(mockRecipes, 1500);
};

export const getShoppingListSuggestions = async (inventory: InventoryItem[]): Promise<{ name: string; quantity: string; reason: string; }[]> => {
    console.log("MOCK API: getShoppingListSuggestions");
    const suggestions = [
        { name: "Pasta Sauce", quantity: "1 jar", reason: "Pairs well with your Pasta." },
        { name: "Salad Greens", quantity: "1 bag", reason: "A healthy staple to have on hand." },
        { name: "Garlic", quantity: "1 head", reason: "Essential for many recipes." },
        { name: "Olive Oil", quantity: "1 bottle", reason: "You might be running low." },
        { name: "Snack Bars", quantity: "1 box", reason: "For quick and easy snacks." }
    ];
    return mockApiCall(suggestions, 800);
};

export const getNearbyFoodBanks = async (location: string): Promise<NgoWithCoords[]> => {
    console.log("MOCK API: getNearbyFoodBanks");
    const ngos: NgoWithCoords[] = [
        { name: 'City Harvest', address: '123 Main St, New York, NY', latitude: 40.715, longitude: -74.002 },
        { name: 'Food Bank for NYC', address: '456 Second Ave, New York, NY', latitude: 40.729, longitude: -73.985 },
        { name: 'St. John\'s Bread & Life', address: '789 Broadway, Brooklyn, NY', latitude: 40.693, longitude: -73.931 }
    ];
    return mockApiCall(ngos);
};

export const getWasteHotspots = async (location: string): Promise<Omit<WasteHotspot, 'id'>[]> => {
    console.log("MOCK API: getWasteHotspots");
    const hotspots = [
        { name: 'The Lavish Buffet', address: '101 City Center, New York, NY', latitude: 40.7580, longitude: -73.9855, wasteScore: 9, contactEmail: 'mgr@lavishbuffet.demo', contactPhone: '555-0101' },
        { name: 'Gourmet Catering Co.', address: '202 Commerce St, New York, NY', latitude: 40.7128, longitude: -74.0060, wasteScore: 8, contactEmail: 'contact@gourmetcatering.demo', contactPhone: '555-0102' },
    ];
    return mockApiCall(hotspots);
};

export const extractItemsFromBill = async (base64Image: string): Promise<Omit<InventoryItem, 'id'>[]> => {
    console.log("MOCK API: extractItemsFromBill");
    const mockItems = [
        { name: "Organic Milk", quantity: "1 Gallon", category: "Dairy", expiryDate: "2024-08-10" },
        { name: "Dozen Eggs", quantity: "1 carton", category: "Dairy", expiryDate: "2024-08-25" },
        { name: "Sourdough Bread", quantity: "1 Loaf", category: "Bakery", expiryDate: "2024-08-05" },
        { name: "Bananas", quantity: "1 lb", category: "Produce", expiryDate: "2024-08-06" }
    ];
    return mockApiCall(mockItems, 2500);
};

export const generateSmartPlate = async (foodItems: string[], userProfile: UserProfile | null, language: string): Promise<SmartPlateData> => {
    console.log("MOCK API: generateSmartPlate");
    const plate: SmartPlateData = {
        name: "Balanced Chicken and Veggie Plate",
        description: "A well-rounded meal featuring lean protein and fresh vegetables to provide sustained energy and essential nutrients.",
        calories: 550,
        ingredients: [...foodItems, "1 tbsp Olive Oil", "Herbs and Spices"],
        instructions: ["Season chicken with herbs.", "Sauté vegetables in olive oil.", "Grill or pan-sear chicken until cooked through.", "Serve together."],
        nutrition: {
            carbohydrates: 40,
            proteins: 35,
            fats: 20,
            vitaminsAndMinerals: 5
        }
    };
    return mockApiCall(plate, 1200);
};

export const generateRecipeVideo = async (prompt: string, aspectRatio: '16:9' | '9:16'): Promise<string> => {
    console.log("MOCK API: generateRecipeVideo");
    // In a real mock, you might return a URL to a placeholder video.
    // Here, we'll simulate a failure to show the error handling.
    return mockApiError("Video generation is temporarily disabled in this demo version.", 3000);
};

export const generateSpeech = async (text: string): Promise<string> => {
    console.log("MOCK API: generateSpeech");
    // This is difficult to mock as it requires a valid base64 audio string.
    // We will simulate an error.
    return mockApiError("Speech generation is disabled in this demo version.", 1000);
};

export const getLearningContent = async (topicId: 'food-storage' | 'carbon-impact', language: string): Promise<LearningModuleContent> => {
    console.log("MOCK API: getLearningContent for", topicId);
    const mockContent: LearningModuleContent = {
        title: "Food Storage Tips",
        cards: [
            { title: "Keep it Cool", content: "Store perishable items like dairy and meat in the refrigerator at or below 40°F (4°C).", icon: "FridgeIcon" },
            { title: "Berry Care", content: "Don't wash berries until you're ready to eat them. Store them in a breathable container.", icon: "AppleIcon" },
            { title: "Separate Fruits & Veggies", content: "Some fruits produce ethylene gas, which can make other produce spoil faster. Keep them separate!", icon: "SparklesIcon" }
        ],
        quiz: [
            {
                question: "Where should you store potatoes?",
                options: ["In the fridge", "In a cool, dark place", "On the counter", "In a plastic bag"],
                correctAnswer: "In a cool, dark place",
                explanation: "Refrigeration can turn the starch in potatoes to sugar, affecting their taste and texture."
            }
        ]
    };
    return mockApiCall(mockContent);
};
