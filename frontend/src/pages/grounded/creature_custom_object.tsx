class Creature {
    name: String;
    health: Number;
    defense: Number;
    multipliers: { base_resist: Object; type: { generic: Number; slashing: Number; stabbing: Number; chopping: Number; busting: Number; }; elemental: { fresh: Number; spicy: Number; salty: Number; sour: Number; }; alternate: { explosive: Number; bleed: Number; gas: Number; poison: Number; venom: Number; }; };
    types: { ant: Boolean; orc: Boolean; };
    constructor (Name: String, Health: Number, Defense: Number, BaseResist: Object, Generic: Number, Slashing: Number, Stabbing: Number, Chopping: Number, Busting: Number, Fresh: Number, Spicy: Number, Salty: Number, Sour: Number, Explosive: Number, Bleed: Number, Gas: Number, Poison: Number, Venom: Number, Ant: Boolean, Orc: Boolean) {
        this.name = Name;
        this.health = Health;
        this.defense = Defense;
        this.multipliers = {
            base_resist: BaseResist,
            type: {
                generic: Generic,
                slashing: Slashing,
                stabbing: Stabbing,
                chopping: Chopping,
                busting: Busting
            },
            elemental: {
                fresh: Fresh,
                spicy: Spicy,
                salty: Salty,
                sour: Sour
            },
            alternate: {
                explosive: Explosive,
                bleed: Bleed,
                gas: Gas,
                poison: Poison,
                venom: Venom
            }
        }
        this.types = {
            ant: Ant,
            orc: Orc
        }
    }
}