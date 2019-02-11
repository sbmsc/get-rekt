new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function () {
            var damage = this.damage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits the monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            var damage = this.damage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits the monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        monsterAttack: function () {
            var damage = this.damage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits the player for ' + damage
            });
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttack();
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = [];
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You rekt the monster. Wanna play again?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Monster rekt you. Wanna play again?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            } return false;
        },
        damage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max + 1), min);
        },
    }
});
