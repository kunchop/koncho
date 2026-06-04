/**
 * Koncho - Fantasy Adventure Game
 * Main game engine and story progression
 */

const readline = require('readline');
const Story = require('./story/story');
const Player = require('./characters/player');
const Combat = require('./combat/combat');

class Game {
  constructor() {
    this.player = null;
    this.story = new Story();
    this.currentScene = 'start';
    this.isRunning = true;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.clear();
    console.log('\n═══════════════════════════════════════════');
    console.log('       KONCHO - FANTASY ADVENTURE GAME      ');
    console.log('═══════════════════════════════════════════\n');
    
    await this.characterCreation();
    await this.mainLoop();
  }

  async characterCreation() {
    console.log('Welcome, adventurer! Before your journey begins, tell us about yourself.\n');
    
    const name = await this.prompt('What is your name? ');
    const classType = await this.prompt('Choose your class (Warrior/Mage/Rogue): ').then(c => c.toLowerCase());
    
    this.player = new Player(name, classType);
    
    console.log(`\n✓ Welcome, ${this.player.name} the ${this.player.class}!`);
    console.log(`Health: ${this.player.hp} | Mana: ${this.player.mana} | Gold: ${this.player.gold}\n`);
  }

  async mainLoop() {
    while (this.isRunning) {
      const scene = this.story.getScene(this.currentScene);
      
      if (!scene) {
        console.log('\n[Game Over]');
        this.isRunning = false;
        break;
      }

      console.clear();
      console.log(`\n${scene.text}\n`);
      
      if (scene.choices.length === 0) {
        console.log('\n[End of Story]');
        this.isRunning = false;
        break;
      }

      scene.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice.text}`);
      });
      
      const choiceIndex = await this.prompt('\nChoose an option (number): ');
      const selectedChoice = scene.choices[parseInt(choiceIndex) - 1];
      
      if (selectedChoice) {
        this.currentScene = selectedChoice.nextScene;
      }
    }
    
    this.rl.close();
  }

  prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}

// Start the game
const game = new Game();
game.start().catch(console.error);
