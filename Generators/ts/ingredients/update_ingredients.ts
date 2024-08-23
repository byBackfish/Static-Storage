const Metadata = await fetch("https://beta-api.wynncraft.com/v3/item/metadata").then(res => res.json());
const Craftings: string[] = Metadata.filters.advanced.crafting

const getIngredients = async (crafting: string): Promise<string[]> => {
    const url = "https://beta-api.wynncraft.com/v3/item/search?fullResult"
    const data = {
        "professions": crafting
    }
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())

    return Object.keys(response)
}

const Map = await Craftings.reduce(async (accPromise, crafting, index) => {
    const acc = await accPromise;
    const ingredients = await getIngredients(crafting);
    acc[crafting] = ingredients;
    return acc;
}, Promise.resolve({} as Record<string, string[]>));

// check if all have at least 100 ingredients
const filtered = Object.keys(Map).filter(key => Map[key].length < 100);
console.log(`Invalid Found: ${filtered.length}`);

const AdvancedIngredients = await Bun.file("./Reference/advanced_ingredients.json").json();

for (const ingredientName of Object.keys(AdvancedIngredients)) {
    const ingredient = AdvancedIngredients[ingredientName];
    const professions = Object.keys(Map).filter(key => Map[key].includes(ingredientName));
    console.log(ingredientName, professions);
    if(!ingredient.requirements) {
        ingredient.requirements = {};
    }
    ingredient.requirements.skills = professions;
}

await Bun.write("Reference/tmp/advanced_ingredients.json", JSON.stringify(AdvancedIngredients))
await Bun.write("Reference/tmp/advanced_ingredients_expanded.json", JSON.stringify(AdvancedIngredients, null, 2))

let md5 = (await Bun.$`md5sum Reference/tmp/advanced_ingredients.json | cut -d' ' -f1`.text()).replace("\n", "")

const URLJson: {md5: string; id: string}[] = await Bun.file("Data-Storage/urls.json").json()
URLJson.forEach(item => {
    if (item.id === "dataStaticIngredientsAdvanced") {
        item.md5 = md5
    }
})

await Bun.write("Data-Storage/urls.json", JSON.stringify(URLJson, null, 2))
