const AdvancedGearJson = await Bun.file("Reference/tmp/advanced_ingredients_expanded.json").json()

await Bun.write("Reference/tmp/advanced_ingredients.json", JSON.stringify(AdvancedGearJson))
await Bun.write("Reference/tmp/advanced_ingredients_expanded.json", JSON.stringify(AdvancedGearJson, null, 2))
