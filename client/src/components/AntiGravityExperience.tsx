import { useState, useRef, useCallback } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────
interface Shape {
    id: number;
    type: "cube" | "sphere" | "ring" | "ellipse";
    x: number;
    y: number;
    size: number;
    color: "cyan" | "purple";
    rotSpeed: number;
    phase: number;
}

const SHAPE_COUNT = 16;
const REPULSION_RADIUS = 200;
const REPULSION_STRENGTH = 50;

function randomBetween(a: number, b: number) {
    return Math.random() * (b - a) + a;
}

function generateShapes(): Shape[] {
    const shapes: Shape[] = [];
    const types: Shape["type"][] = ["cube", "sphere", "ring", "ellipse"];
    const colors: Shape["color"][] = ["cyan", "purple"];
    for (let i = 0; i < SHAPE_COUNT; i++) {
        shapes.push({
            id: i,
            type: types[i % 4],
            x: randomBetween(5, 95),
            y: randomBetween(5, 95),
            size: randomBetween(20, 60),
            color: colors[i % 2],
            rotSpeed: randomBetween(10, 28),
            phase: randomBetween(0, Math.PI * 2),
        });
    }
    return shapes;
}

// ─── Individual shape ───────────────────────────────────────
function ShapeRenderer({
    shape,
    offset,
}: {
    shape: Shape;
    offset: { x: number; y: number };
}) {
    const glowRgb = shape.color === "cyan" ? "0, 255, 255" : "123, 47, 190";
    const boxShadow = `0 0 12px rgba(${glowRgb}, 0.6), 0 0 35px rgba(${glowRgb}, 0.25), inset 0 0 12px rgba(${glowRgb}, 0.1)`;
    const borderColor = `rgba(${glowRgb}, 0.65)`;

    const baseStyle: React.CSSProperties = {
        position: "absolute",
        left: `calc(${shape.x}% + ${offset.x}px)`,
        top: `calc(${shape.y}% + ${offset.y}px)`,
        width: shape.size,
        height: shape.size,
        willChange: "transform",
    };

    if (shape.type === "cube") {
        return (
            <motion.div
                style={baseStyle}
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                    y: [0, -12, 0, 8, 0],
                    x: [0, 6, 0, -6, 0],
                }}
                transition={{
                    rotateX: { duration: shape.rotSpeed, repeat: Infinity, ease: "linear" },
                    rotateY: { duration: shape.rotSpeed * 1.3, repeat: Infinity, ease: "linear" },
                    rotateZ: { duration: shape.rotSpeed * 2, repeat: Infinity, ease: "linear" },
                    y: { duration: shape.rotSpeed * 0.8, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: shape.rotSpeed * 1.1, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        border: `1.5px solid ${borderColor}`,
                        borderRadius: "3px",
                        boxShadow,
                        background: `rgba(${glowRgb}, 0.04)`,
                    }}
                />
            </motion.div>
        );
    }

    if (shape.type === "sphere") {
        return (
            <motion.div
                style={baseStyle}
                animate={{
                    rotate: [0, 360],
                    y: [0, -16, 0, 10, 0],
                    x: [0, -8, 0, 8, 0],
                    scale: [1, 1.06, 1, 0.96, 1],
                }}
                transition={{
                    rotate: { duration: shape.rotSpeed * 1.5, repeat: Infinity, ease: "linear" },
                    y: { duration: shape.rotSpeed, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: shape.rotSpeed * 1.2, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: shape.rotSpeed * 0.9, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: `1.5px solid ${borderColor}`,
                        boxShadow,
                        background: `radial-gradient(circle at 30% 30%, rgba(${glowRgb}, 0.12), transparent 70%)`,
                    }}
                />
            </motion.div>
        );
    }

    if (shape.type === "ellipse") {
        return (
            <motion.div
                style={{ ...baseStyle, width: shape.size * 1.6, height: shape.size * 0.8 }}
                animate={{
                    rotate: [0, 360],
                    y: [0, -14, 0, 10, 0],
                    x: [0, 10, 0, -10, 0],
                    scale: [1, 1.04, 1, 0.97, 1],
                }}
                transition={{
                    rotate: { duration: shape.rotSpeed * 1.8, repeat: Infinity, ease: "linear" },
                    y: { duration: shape.rotSpeed * 0.9, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: shape.rotSpeed * 1.4, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: shape.rotSpeed, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: `1.5px solid ${borderColor}`,
                        boxShadow,
                        background: `radial-gradient(ellipse at 40% 30%, rgba(${glowRgb}, 0.1), transparent 70%)`,
                    }}
                />
            </motion.div>
        );
    }

    // Ring
    return (
        <motion.div
            style={baseStyle}
            animate={{
                rotateX: [0, 360],
                rotateY: [0, 180],
                y: [0, -14, 0, 12, 0],
                x: [0, 10, 0, -10, 0],
            }}
            transition={{
                rotateX: { duration: shape.rotSpeed, repeat: Infinity, ease: "linear" },
                rotateY: { duration: shape.rotSpeed * 1.6, repeat: Infinity, ease: "linear" },
                y: { duration: shape.rotSpeed * 0.7, repeat: Infinity, ease: "easeInOut" },
                x: { duration: shape.rotSpeed * 1.3, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `2px solid ${borderColor}`,
                    boxShadow,
                    background: "transparent",
                    transform: "perspective(200px) rotateX(60deg)",
                }}
            />
        </motion.div>
    );
}

// ─── Main component ─────────────────────────────────────────
export default function AntiGravityExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const shapesRef = useRef<Shape[]>(generateShapes());
    const [offsets, setOffsets] = useState<Record<number, { x: number; y: number }>>({});

    const shapes = shapesRef.current;

    // Track mouse globally (since the layer is pointer-events: none, we use window)
    const mouseMoveHandler = useRef<((e: MouseEvent) => void) | null>(null);
    if (!mouseMoveHandler.current) {
        mouseMoveHandler.current = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", mouseMoveHandler.current);
        }
    }

    // Physics loop
    useAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const mouse = mouseRef.current;
        const newOffsets: Record<number, { x: number; y: number }> = {};

        shapes.forEach((shape) => {
            const sx = (shape.x / 100) * w;
            const sy = (shape.y / 100) * h;
            const dx = sx - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REPULSION_RADIUS && dist > 0) {
                const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_STRENGTH;
                const angle = Math.atan2(dy, dx);
                newOffsets[shape.id] = {
                    x: Math.cos(angle) * force,
                    y: Math.sin(angle) * force,
                };
            } else {
                newOffsets[shape.id] = { x: 0, y: 0 };
            }
        });

        setOffsets(newOffsets);
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                overflow: "hidden",
                perspective: "800px",
            }}
        >
            {shapes.map((shape) => (
                <ShapeRenderer
                    key={shape.id}
                    shape={shape}
                    offset={offsets[shape.id] || { x: 0, y: 0 }}
                />
            ))}
        </div>
    );
}
