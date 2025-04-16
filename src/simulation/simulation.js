import { MARGIN_SIZE } from './constants.js';

/**
 * Classe Simulation - Gère l'ensemble de l'écosystème
 */
export class Simulation {
    /**
     * Constructeur de la simulation
     * @param {p5} p - Instance p5
     */
    constructor(p) {
        this.p = p;
        this.creatures = [];
        this.foods = [];

        // Paramètres de la simulation
        this.params = {
            foodSpawnRate: 0.02, // Probabilité d'apparition de nourriture à chaque frame
            maxFood: 30, // Nombre maximum de nourriture
            foodEneregy: 80,
        };

        // Effets visuels
        this.bgParticles = [];
        this.createBackgroundParticles(150); // Créer des particules d'arrière-plan
    }

    /**
     * Ajoute une créature à la simulation
     * @param {Creature} creature - Créature à ajouter
     */
    addCreature(creature) {
        this.creatures.push(creature);
    }

    /**
     * Met à jour l'état de la simulation
     */
    update() {
        // Mettre à jour chaque créature
        for (const creature of this.creatures) {
            creature.eatFood(this.foods);

            // Appliquer les comportements de mouvement
            creature.applyBehaviors(this.creatures, this.foods);

            // Mettre à jour la position
            creature.update();
        }

        // Ajouter aléatoirement de la nourriture
        this.spawnFood();

        // Mettre à jour les particules d'arrière-plan
        this.updateBackgroundParticles();
    }

    /**
     * Affiche tous les éléments de la simulation
     */
    display() {
        // Afficher les particules d'arrière-plan
        this.displayBackgroundParticles();

        // Afficher la nourriture
        this.displayFood();

        // Afficher les créatures
        for (const creature of this.creatures) {
            creature.display();
        }
    }

    /**
     * Affiche les éléments de nourriture avec effets visuels
     */
    displayFood() {
        for (const food of this.foods) {
            this.p.fill(0, 255, 0, 200);
            this.p.noStroke();
            this.p.ellipse(food.x, food.y, 6, 6);

            // Effet de brillance
            this.p.fill(100, 255, 100, 50);
            this.p.ellipse(food.x, food.y, 10, 10);
        }
    }

    /**
     * Génère aléatoirement de la nourriture
     */
    spawnFood() {
        // Ajouter de la nourriture avec une certaine probabilité
        if (
            this.foods.length < this.params.maxFood &&
            this.p.random() < this.params.foodSpawnRate
        ) {
            // Créer une nouvelle nourriture à une position aléatoire
            const food = {
                x: this.p.random(MARGIN_SIZE, this.p.width - MARGIN_SIZE),
                y: this.p.random(MARGIN_SIZE, this.p.height - MARGIN_SIZE),
                energy: this.params.foodEneregy,
            };

            this.foods.push(food);
        }
    }

    /**
     * Crée des particules d'arrière-plan pour un effet visuel
     * @param {number} count - Nombre de particules à créer
     */
    createBackgroundParticles(count) {
        for (let i = 0; i < count; i++) {
            this.bgParticles.push({
                x: this.p.random(this.p.width),
                y: this.p.random(this.p.height),
                size: this.p.random(1, 3),
                speed: this.p.random(0.1, 0.5),
                color: this.p.color(
                    this.p.random(100, 255),
                    this.p.random(100, 255),
                    this.p.random(100, 255),
                    this.p.random(30, 80),
                ),
            });
        }
    }

    /**
     * Met à jour les particules d'arrière-plan
     */
    updateBackgroundParticles() {
        for (const particle of this.bgParticles) {
            // Mouvement lent vers le haut
            particle.y -= particle.speed;

            // Légère fluctuation horizontale
            particle.x += this.p.random(-0.5, 0.5);

            // Remettre la particule en bas quand elle sort par le haut
            if (particle.y < 0) {
                particle.y = this.p.height;
                particle.x = this.p.random(this.p.width);
            }
        }
    }

    /**
     * Affiche les particules d'arrière-plan
     */
    displayBackgroundParticles() {
        this.p.noStroke();
        for (const particle of this.bgParticles) {
            this.p.fill(particle.color);
            this.p.ellipse(
                particle.x,
                particle.y,
                particle.size,
                particle.size,
            );
        }
    }
}
