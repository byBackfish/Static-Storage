const AdvancedGearJson = await Bun.file("Reference/tmp/advanced_gear_expanded.json").json()

await Bun.write("Reference/tmp/advanced_gear.json", JSON.stringify(AdvancedGearJson))
await Bun.write("Reference/tmp/advanced_gear_expanded.json", JSON.stringify(AdvancedGearJson, null, 2))
