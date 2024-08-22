const AdvancedGearJson = await Bun.file("Reference/advanced_gear_expanded.json").json()

await Bun.write("Reference/advanced_gear.json", JSON.stringify(AdvancedGearJson))
await Bun.write("Reference/advanced_gear_expanded.json", JSON.stringify(AdvancedGearJson, null, 2))
