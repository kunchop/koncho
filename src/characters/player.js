/**
 * Player character class
 */

class Player {
  constructor(name, classType) {
    this.name = name;
    this.class = classType || 'Warrior';
    this.level = 1;
    this.experience = 0;
    this.inventory = [];
    this.skills = [];
    this.gold = 50;
    
    this.initializeClass();
  }

  initializeClass() {
    switch (this.class) {
      case 'warrior':
        this.hp = 100;
        this.mana = 20;
        this.attack = 15;
        this.defense = 10;
        this.skills = ['Slash', 'Shield Bash', 'Cleave'];
        break;
      case 'mage':
        this.hp = 60;
        this.mana = 100;
        this.attack = 8;
        this.defense = 5;
        this.skills = ['Fireball', 'Ice Storm', 'Teleport'];
        break;
      case 'rogue':
        this.hp = 75;
        this.mana = 30;
        this.attack = 14;
        this.defense = 7;
        this.skills = ['Backstab', 'Shadow Step', 'Poison Strike'];
        break;
      default:
        this.hp = 100;
        this.mana = 20;
        this.attack = 15;
        this.defense = 10;
        this.skills = ['Slash'];
    }
  }

  gainExperience(amount) {
    this.experience += amount;
    const experiencePerLevel = 100;
    if (this.experience >= experiencePerLevel) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.hp += 20;
    this.mana += 10;
    this.attack += 2;
    this.defense += 1;
    console.log(`\n🎉 Level Up! You are now level ${this.level}!`);
  }

  takeDamage(damage) {
    this.hp -= damage;
    return this.hp <= 0;
  }

  addItem(item) {
    this.inventory.push(item);
  }

  addGold(amount) {
    this.gold += amount;
  }
}

module.exports = Player;
