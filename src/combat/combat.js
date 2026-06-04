/**
 * Combat system for encounters
 */

class Combat {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.round = 0;
  }

  calculateDamage(attacker, defender) {
    const baseDamage = attacker.attack;
    const variance = Math.floor(Math.random() * 10) - 5;
    const defenseReduction = defender.defense / 2;
    return Math.max(1, baseDamage + variance - defenseReduction);
  }

  playerAttack() {
    const damage = this.calculateDamage(this.player, this.enemy);
    this.enemy.hp -= damage;
    return damage;
  }

  enemyAttack() {
    const damage = this.calculateDamage(this.enemy, this.player);
    this.player.hp -= damage;
    return damage;
  }

  isOver() {
    return this.player.hp <= 0 || this.enemy.hp <= 0;
  }

  getWinner() {
    if (this.player.hp <= 0) return 'enemy';
    if (this.enemy.hp <= 0) return 'player';
    return null;
  }
}

module.exports = Combat;
