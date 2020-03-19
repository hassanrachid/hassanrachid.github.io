import Attributes from './attributes';

export default class ItemList {
    constructor() {
        this.items = {
            'Short Sword': {
                image: "swords",
                frame: "Short Sword",
                type: "weapon",
                attributes: new Attributes({ health: 0, strength: 3, defense: 1, intelligence: 0, agility: 0 })
            },
            'Iron Sword': {
                image: "swords",
                frame: "Iron Sword",
                type: "weapon",
                attributes: new Attributes({ health: 7, strength: 7, defense: 1, intelligence: 0, agility: 0 })
            },
            'Gold Sword': {
                image: "swords",
                frame: "Gold Sword",
                type: "weapon",
                attributes: new Attributes({ health: 5, strength: 12, defense: 11, intelligence: 0, agility: 12 })
            },
            'Steel Sword': {
                image: "swords",
                frame: "Steel Sword",
                type: "weapon",
                attributes: new Attributes({ health: 16, strength: 23, defense: 5, intelligence: 0, agility: 0 })
            },
            'Silverlight': {
                image: "swords",
                frame: "Silverlight",
                type: "weapon",
                attributes: new Attributes({ health: 21, strength: 54, defense: 8, intelligence: 0, agility: 0 })
            }
        }
    }
}