import Attributes from './attributes';

export default class ItemList {
    constructor() {
        this.items = {
            'Short Sword': {
                image: "swords",
                frame: "Short Sword",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Iron Sword': {
                image: "swords",
                frame: "Iron Sword",
                type: "weapon",
                attributes: new Attributes({ health: 7, strength: 7, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 60,
                    height: 180,
                    offset: {
                        front: 130,
                        side: 145,
                        back: 80
                    }
                }
            },
            'Gold Sword': {
                image: "swords",
                frame: "Gold Sword",
                type: "weapon",
                attributes: new Attributes({ health: 5, strength: 12, defense: 11, intelligence: 0, agility: 12 }),
                collider: {
                    width: 60,
                    height: 180,
                    offset: {
                        front: 130,
                        side: 145,
                        back: 80
                    }
                }
            },
            'Steel Sword': {
                image: "swords",
                frame: "Steel Sword",
                type: "weapon",
                attributes: new Attributes({ health: 16, strength: 23, defense: 5, intelligence: 0, agility: 0 }),
                collider: {
                    width: 60,
                    height: 180,
                    offset: {
                        front: 130,
                        side: 145,
                        back: 80
                    }
                }
            },
            'Silverlight': {
                image: "swords",
                frame: "Silverlight",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 60,
                    height: 180,
                    offset: {
                        front: 130,
                        side: 145,
                        back: 80
                    }
                }
            },
            'Short Spear': {
                image: "spears",
                frame: "ShortSpear",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 130,
                        side: 100,
                        back: 80
                    }
                }
            },
            'Iron Spear': {
                image: "spears",
                frame: "IronSpear",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 130,
                        side: 100,
                        back: 80
                    }
                }
            },
            'Steel Spear': {
                image: "spears",
                frame: "SteelSpear",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 130,
                        side: 100,
                        back: 80
                    }
                }
            },
            'Hardened Spear': {
                image: "spears",
                frame: "HardenedSpear",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 130,
                        side: 100,
                        back: 80
                    }
                }
            },
            'Onyx Spear': {
                image: "spears",
                frame: "OnyxSpear",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 130,
                        side: 100,
                        back: 80
                    }
                }
            },
            'Iron Axe': {
                image: "axes",
                frame: "IronAxe",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Steel Axe': {
                image: "axes",
                frame: "SteelAxe",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Silver Axe': {
                image: "axes",
                frame: "SilverAxe",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Hardened Axe': {
                image: "axes",
                frame: "HardenedAxe",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Platinum Axe': {
                image: "axes",
                frame: "PlatinumAxe",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Wood': {
                image: null,
                frame: "wood_cut",
                type: "misc",
                stackable: true,
                maxStackSize: 64,
                description: "A piece of wood"
            },
            'Bow': {
                image: "bows",
                frame: "Bow",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Long Bow': {
                image: "bows",
                frame: "LongBow",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
            'Magic Bow': {
                image: "bows",
                frame: "MagicBow",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 }),
                collider: {
                    width: 120,
                    height: 120,
                    offset: {
                        front: 60,
                        side: 60,
                        back: 80
                    }
                }
            },
        }
    }
}