import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { Simulation } from '../simulation/simulation';
import { Creature } from '../simulation/creature';

const EcosystemSimulation = ({ isRunning, initialCreatureCount, onCreatureCountChange }) => {
    const containerRef = useRef(null);
    const simulationRef = useRef(null);
    const p5InstanceRef = useRef(null);

    useEffect(() => {
        // Fonction de configuration du sketch P5.js
        const sketch = (p) => {
            let simulation;

            p.setup = () => {
                // Créer un canvas plein écran
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent(containerRef.current);

                // Initialiser la simulation
                simulation = new Simulation(p);
                simulationRef.current = simulation;

                // Créer les créatures initiales
                for (let i = 0; i < initialCreatureCount; i++) {
                    const x = p.random(p.width);
                    const y = p.random(p.height);
                    const size = p.random(8, 15);
                    const maxSpeed = p.random(1, 3);
                    const color = p.color(
                        p.random(100, 255),
                        p.random(100, 255),
                        p.random(100, 255),
                        200
                    );

                    const creature = new Creature(p, x, y, size, maxSpeed, color);
                    simulation.addCreature(creature);
                }
            };

            p.draw = () => {
                // Fond plus sombre avec effet de traînée
                p.background(15, 23, 42);

                if (isRunning) {
                    // Mettre à jour l'état de la simulation si elle est en cours
                    simulation.update();
                }

                // Afficher toujours la simulation, même en pause
                simulation.display();

                // Mettre à jour le compteur de créatures
                if (onCreatureCountChange && simulation) {
                    onCreatureCountChange(simulation.creatures.length);
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };
        };

        // Créer une nouvelle instance de P5
        if (!p5InstanceRef.current) {
            p5InstanceRef.current = new p5(sketch, containerRef.current);
        }

        // Nettoyer lors du démontage du composant
        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
        };
    }, [initialCreatureCount, onCreatureCountChange]); // Uniquement lors du montage initial et en cas de changement d'initialCreatureCount

    // Effet pour gérer les changements de isRunning sans recréer le canvas
    useEffect(() => {
        // Pas besoin d'action spécifique ici car le status est vérifié dans la boucle draw
    }, [isRunning]);

    return <div ref={containerRef} className="w-full h-full relative" />;
};

export default EcosystemSimulation;