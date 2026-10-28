/**
 * SFALXO AI - Comprehensive Knowledge Base & Search Module (Browser Version)
 */

const sfalxoKnowledge = {
    subjects: {
        science: {
            title: "Science",
            chapters: {
                "ohms-law": {
                    title: "Ohm's Law",
                    content: `Ohm's Law states that the current (I) passing through a conductor between two points is directly proportional to the voltage (V) across the two points, provided the temperature remains constant.\n\nFormula: V = IR\n- V = Voltage (Volts)\n- I = Current (Amperes)\n- R = Resistance (Ohms, Ω)\n\nApplications: Used in household circuits, electronic devices, and calculating fuse ratings.`
                },
                "photosynthesis": {
                    title: "Photosynthesis",
                    content: `Photosynthesis is the process used by plants to convert light energy into chemical energy.\n\nEquation: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n- Occurs in chloroplasts using chlorophyll pigments.\n- Produces glucose for plant nourishment and releases oxygen as a vital byproduct into the atmosphere.`
                },
                "chemical-reactions": {
                    title: "Chemical Reactions and Equations",
                    content: `A chemical reaction involves the breaking and making of chemical bonds to form new substances.\n\nTypes of Reactions:\n1. Combination: A + B → AB\n2. Decomposition: AB → A + B\n3. Displacement: A + BC → AC + B\n4. Double Displacement: AB + CD → AD + CB\n\nBalanced equations obey the Law of Conservation of Mass.`
                },
                "human-eye": {
                    title: "The Human Eye and the Colorful World",
                    content: `The human eye is a natural optical instrument that uses refraction of light to form images on the retina.\n\nKey Parts:\n- Cornea: Refracts light entering the eye.\n- Iris: Controls the size of the pupil.\n- Pupil: Regulates the amount of light entering.\n- Retina: Light-sensitive screen where real and inverted images are formed.\n\nCommon Defects: Myopia (nearsightedness), Hypermetropia (farsightedness), and Presbyopia.`
                }
            }
        },
        mathematics: {
            title: "Mathematics",
            chapters: {
                "quadratic-equations": {
                    title: "Quadratic Equations",
                    content: `A quadratic equation is a second-order polynomial equation in a single variable x:\n\nStandard Form: ax² + bx + c = 0 (where a ≠ 0)\n\nQuadratic Formula:\nx = (-b ± √(b² - 4ac)) / 2a\n\nDiscriminant (D) = b² - 4ac\n- If D > 0: Two distinct real roots\n- If D = 0: Two equal real roots\n- If D < 0: No real roots`
                },
                "arithmetic-progressions": {
                    title: "Arithmetic Progressions (AP)",
                    content: `An Arithmetic Progression is a sequence of numbers in which each term after the first is obtained by adding a fixed number (common difference, d) to the preceding term.\n\nGeneral Form: a, a+d, a+2d, a+3d, ...\n\nN-th Term Formula:\na_n = a + (n - 1)d\n\nSum of First n Terms:\nS_n = (n / 2) * [2a + (n - 1)d]`
                },
                "trigonometry": {
                    title: "Introduction to Trigonometry",
                    content: `Trigonometry studies the relationships between side lengths and angles of triangles.\n\nBasic Ratios (for a right-angled triangle):\n- sin(θ) = Perpendicular / Hypotenuse\n- cos(θ) = Base / Hypotenuse\n- tan(θ) = Perpendicular / Base\n\nFundamental Identity:\nsin²(θ) + cos²(θ) = 1`
                },
                "circles": {
                    title: "Circles and Tangents",
                    content: `A circle is the locus of all points in a plane at a constant distance (radius) from a fixed point (center).\n\nKey Theorems:\n1. The tangent at any point of a circle is perpendicular to the radius through the point of contact.\n2. The lengths of tangents drawn from an external point to a circle are equal.`
                }
            }
        },
        computerscience: {
            title: "Computer Science",
            chapters: {
                "html-basics": {
                    title: "HTML Basics & Document Structure",
                    content: `HTML (HyperText Markup Language) is the standard markup language for creating Web pages.\n\nBasic Structure:\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n</body>\n</html>`
                },
                "css-styling": {
                    title: "CSS Styling Fundamentals",
                    content: `CSS (Cascading Style Sheets) is used to style and layout web pages (colors, fonts, spacing, responsiveness).\n\nSyntax Example:\nselector {\n    property: value;\n}\n\nExample:\nbody {\n    background-color: #f4f4f4;\n    font-family: Arial, sans-serif;\n}`
                },
                "javascript-intro": {
                    title: "JavaScript Basics",
                    content: `JavaScript is a scripting language that enables interactive web pages and dynamic content.\n\nCore Concepts:\n- Variables: let, const, var\n- Functions: function myFunction() { ... }\n- DOM Manipulation: document.getElementById("id")`
                }
            }
        },
        socialscience: {
            title: "Social Science",
            chapters: {
                "nationalism-in-india": {
                    title: "Nationalism in India",
                    content: `The growth of modern nationalism in India was intimately connected to the anti-colonial movement.\n\nKey Milestones:\n- Non-Cooperation Movement (1920-1922)\n- Civil Disobedience Movement & Salt March (1930)\n- Quit India Movement (1942)\n- Leadership figures: Mahatma Gandhi, Sardar Vallabhbhai Patel, Subhas Chandra Bose.`
                },
                "federalism": {
                    title: "Federalism",
                    content: `Federalism is a system of government in which power is divided between a central authority and various constituent units (such as states or provinces) of the country.\n\nKey Features:\n- Two or more levels of government.\n- Each tier has its own jurisdiction in specific matters of legislation, taxation, and administration.\n- Constitution guarantees the authority of each tier.`
                }
            }
        }
    },

    // Built-in search function that powers ai.js
    search(query) {
        const lowerQuery = query.toLowerCase().trim();
        const results = [];

        for (const [subKey, subject] of Object.entries(this.subjects)) {
            for (const [chapKey, chapter] of Object.entries(subject.chapters)) {
                if (
                    chapter.title.toLowerCase().includes(lowerQuery) ||
                    chapter.content.toLowerCase().includes(lowerQuery) ||
                    subKey.includes(lowerQuery)
                ) {
                    results.push({
                        subject: subKey,
                        title: chapter.title,
                        content: chapter.content,
                        snippet: chapter.content.substring(0, 100) + "..."
                    });
                }
            }
        }
        return results;
    }
};
