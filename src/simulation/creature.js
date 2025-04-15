/**
 * Classe Creature - Représente une entité vivante dans la simulation
 */
export class Creature {
    /**
     * Constructeur d'une créature
     * @param {p5} p - Instance p5
     * @param {number} x - Position X initiale
     * @param {number} y - Position Y initiale
     * @param {number} size - Taille de la créature
     * @param {number} maxSpeed - Vitesse maximale
     * @param {p5.Color} color - Couleur de la créature
     */
    constructor(p, x, y, size, maxSpeed, color) {
        this.p = p;

        // Position et mouvement
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.acceleration = p.createVector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = 0.1;

        // Apparence
        this.size = size;
        this.color = color;

        // Rayons de perception pour les comportements
        this.separationRadius = 30;
        this.alignmentRadius = 60;
        this.cohesionRadius = 80;

        // Poids des comportements
        this.separationWeight = 1.5;
        this.alignmentWeight = 1.0;
        this.cohesionWeight = 1.0;
        this.wanderWeight = 0.5;
    }

    /**
     * Met à jour la position et la vitesse de la créature
     */
    update() {
        // Mettre à jour la vitesse
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);

        // Mettre à jour la position
        this.position.add(this.velocity);

        // Réinitialiser l'accélération
        this.acceleration.mult(0);

        // Gérer les bords
        this.handleBoundaries();
    }

    /**
     * Affiche la créature
     */
    display() {
        const p = this.p;

        p.push();

        // Déplacer à la position de la créature
        p.translate(this.position.x, this.position.y);

        // Rotation en fonction de la direction
        const angle = this.velocity.heading() + p.radians(90);
        p.rotate(angle);

        // Dessiner le corps
        p.fill(this.color);
        p.noStroke();

        // Dessiner une forme de "poisson" plus élégante
        p.beginShape();
        p.vertex(0, -this.size * 1.5);
        p.vertex(-this.size * 0.7, this.size * 0.3);
        p.vertex(-this.size * 0.3, 0);
        p.vertex(-this.size * 0.7, -this.size * 0.3);
        p.vertex(0, this.size * 0.8);
        p.vertex(this.size * 0.7, -this.size * 0.3);
        p.vertex(this.size * 0.3, 0);
        p.vertex(this.size * 0.7, this.size * 0.3);
        p.endShape(p.CLOSE);

        // Ajouter un petit effet de brillance
        p.fill(255, 255, 255, 50);
        p.ellipse(0, -this.size * 0.5, this.size * 0.4, this.size * 0.4);

        p.pop();
    }

    /**
     * Applique les comportements de groupe (boids)
     * @param {Array} creatures - Tableau des créatures de la simulation
     */
    applyBehaviors(creatures) {
        // Calculer les forces de comportement
        const separation = this.separate(creatures).mult(this.separationWeight);
        const alignment = this.align(creatures).mult(this.alignmentWeight);
        const cohesion = this.cohere(creatures).mult(this.cohesionWeight);
        const wander = this.wander().mult(this.wanderWeight);

        // Appliquer les forces
        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);
        this.applyForce(wander);
    }

    /**
     * Comportement d'errance aléatoire
     * @returns {p5.Vector} Force d'errance
     */
    wander() {
        const wanderStrength = 0.1;
        const wanderRange = 0.5;

        const force = this.p.createVector(
            this.p.random(-wanderRange, wanderRange),
            this.p.random(-wanderRange, wanderRange)
        );

        force.normalize();
        force.mult(wanderStrength);

        return force;
    }

    /**
     * Comportement de séparation - Éviter les autres créatures
     * @param {Array} creatures - Tableau des créatures de la simulation
     * @returns {p5.Vector} Force de séparation
     */
    separate(creatures) {
        const steering = this.p.createVector();
        let count = 0;

        // Vérifier chaque créature
        for (const other of creatures) {
            if (other === this) continue;

            const d = this.p.dist(
                this.position.x, this.position.y,
                other.position.x, other.position.y
            );

            // Si la créature est trop proche
            if (d < this.separationRadius) {
                // Calculer le vecteur d'éloignement
                const diff = this.p.createVector(
                    this.position.x - other.position.x,
                    this.position.y - other.position.y
                );

                diff.normalize();
                diff.div(d); // Plus c'est proche, plus la force est grande

                steering.add(diff);
                count++;
            }
        }

        // Moyenne des forces
        if (count > 0) {
            steering.div(count);
        }

        if (steering.mag() > 0) {
            // Normaliser et mettre à l'échelle
            steering.normalize();
            steering.mult(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    /**
     * Comportement d'alignement - S'aligner avec les créatures voisines
     * @param {Array} creatures - Tableau des créatures de la simulation
     * @returns {p5.Vector} Force d'alignement
     */
    align(creatures) {
        const steering = this.p.createVector();
        let count = 0;

        // Vérifier chaque créature
        for (const other of creatures) {
            if (other === this) continue;

            const d = this.p.dist(
                this.position.x, this.position.y,
                other.position.x, other.position.y
            );

            // Si la créature est dans le rayon d'alignement
            if (d < this.alignmentRadius) {
                steering.add(other.velocity);
                count++;
            }
        }

        if (count > 0) {
            // Moyenne des vitesses
            steering.div(count);

            // Normaliser et mettre à l'échelle
            steering.normalize();
            steering.mult(this.maxSpeed);

            // Reynolds steering = desired - velocity
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }

    /**
     * Comportement de cohésion - Rester près des créatures voisines
     * @param {Array} creatures - Tableau des créatures de la simulation
     * @returns {p5.Vector} Force de cohésion
     */
    cohere(creatures) {
        const target = this.p.createVector();
        let count = 0;

        // Vérifier chaque créature
        for (const other of creatures) {
            if (other === this) continue;

            const d = this.p.dist(
                this.position.x, this.position.y,
                other.position.x, other.position.y
            );

            // Si la créature est dans le rayon de cohésion
            if (d < this.cohesionRadius) {
                target.add(other.position);
                count++;
            }
        }

        if (count > 0) {
            // Moyenne des positions
            target.div(count);

            // Chercher à rejoindre cette position
            return this.seek(target);
        } else {
            return this.p.createVector();
        }
    }

    /**
     * Comportement de recherche - Se diriger vers un point
     * @param {p5.Vector} target - Position cible
     * @returns {p5.Vector} Force de direction
     */
    seek(target) {
        // Vecteur vers la cible
        const desired = this.p.createVector(
            target.x - this.position.x,
            target.y - this.position.y
        );

        // Distance à la cible
        const d = desired.mag();

        if (d > 0) {
            // Normaliser et mettre à l'échelle à la vitesse maximale
            desired.normalize();
            desired.mult(this.maxSpeed);

            // Reynolds steering = desired - velocity
            const steering = this.p.createVector(
                desired.x - this.velocity.x,
                desired.y - this.velocity.y
            );
            steering.limit(this.maxForce);

            return steering;
        } else {
            return this.p.createVector();
        }
    }

    /**
     * Applique une force à la créature
     * @param {p5.Vector} force - Force à appliquer
     */
    applyForce(force) {
        // F = m * a, mais on simplifie avec m = 1
        this.acceleration.add(force);
    }

    /**
     * Gère les limites du canevas
     */
    handleBoundaries() {
        // Rebondir sur les bords avec des marges pour éviter le collage
        const margin = 20;

        if (this.position.x < margin) {
            this.position.x = margin;
            this.velocity.x *= -1;
        } else if (this.position.x > this.p.width - margin) {
            this.position.x = this.p.width - margin;
            this.velocity.x *= -1;
        }

        if (this.position.y < margin) {
            this.position.y = margin;
            this.velocity.y *= -1;
        } else if (this.position.y > this.p.height - margin) {
            this.position.y = this.p.height - margin;
            this.velocity.y *= -1;
        }
    }
}