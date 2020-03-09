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
                type: "weapon"
            },
            'Gold Sword': {
                image: "swords",
                frame: "Gold Sword",
                type: "weapon"
            },
            'Steel Sword': {
                image: "swords",
                frame: "Steel Sword",
                type: "weapon"
            },
            'Silverlight': {
                image: "swords",
                frame: "Silverlight",
                type: "weapon"
            }
        }
    }
}