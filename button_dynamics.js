function isMobile() {
    return window.innerWidth < 768; // Using 768px as the breakpoint
}

function applyRandomShapes() {
    const buttons = document.querySelectorAll('#buttons04 li');
    // All possible shape classes that this script might add or remove
    const allShapeClasses = ['button-standard-rect', 'button-large-square', 'button-portrait-rect', 'button-wide-rect', 'button-tall-rect'];
    
    // Convert NodeList to Array for easier manipulation (shuffle)
    const allButtonLIs = Array.from(buttons);

    // 1. Clear existing shape classes from all button LIs, regardless of viewport
    allButtonLIs.forEach(li => {
        allShapeClasses.forEach(cls => li.classList.remove(cls));
    });

    if (!isMobile()) {
        // DESKTOP BEHAVIOR
        // The main CSS handles desktop styling (uniform buttons by default after classes are cleared).
        // No specific classes need to be added by JS for desktop with the current CSS structure.
        // If a specific class like 'button-desktop-uniform' was needed for all desktop buttons,
        // it would be added here:
        // allButtonLIs.forEach(li => li.classList.add('button-desktop-uniform'));
        // However, this is not required by the current CSS plan.
        return; // Stop further processing for desktop
    }

    // MOBILE BEHAVIOR (dynamic shapes)
    const specialShapeClasses = ['button-large-square', 'button-portrait-rect', 'button-wide-rect', 'button-tall-rect'];
    const totalButtons = allButtonLIs.length; // allButtonLIs is already defined from buttons

    if (totalButtons === 0) return; // No buttons to shape

    let numSpecialButtons;

    if (totalButtons <= 3) {
        numSpecialButtons = 1;
    } else if (totalButtons <= 6) {
        numSpecialButtons = 1 + Math.floor(Math.random() * 2); // 1 or 2 for 4-6 buttons
    } else if (totalButtons <= 9) {
        numSpecialButtons = 2 + Math.floor(Math.random() * 2); // 2 or 3 for 7-9 buttons
    } else { // For 10+ buttons (e.g., 12)
        numSpecialButtons = 3 + Math.floor(Math.random() * 2); // 3 or 4 for 10+ buttons
    }
    // Ensure numSpecialButtons does not exceed totalButtons
    numSpecialButtons = Math.min(numSpecialButtons, totalButtons);
    // Optional: Also ensure we don't try to make more special shapes than defined types if numSpecialButtons is small,
    // though the cycling logic (i % specialShapeClasses.length) handles this gracefully.
    // numSpecialButtons = Math.min(numSpecialButtons, specialShapeClasses.length * 2); // This line can be kept or removed based on desired behavior. Keeping it for now.
    numSpecialButtons = Math.min(numSpecialButtons, specialShapeClasses.length * (totalButtons / specialShapeClasses.length) +1); // Allow full cycles plus one more if needed

    // Shuffle button LIs to pick random ones for special shapes
    // Fisher-Yates shuffle
    for (let i = allButtonLIs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allButtonLIs[i], allButtonLIs[j]] = [allButtonLIs[j], allButtonLIs[i]]; // Swap
    }

    // Apply shapes for mobile
    for (let i = 0; i < allButtonLIs.length; i++) {
        const li = allButtonLIs[i];

        if (i < numSpecialButtons) {
            // This is a special button
            // Cycle through specialShapeClasses for variety
            const shapeToApply = specialShapeClasses[i % specialShapeClasses.length];
            li.classList.add(shapeToApply);
        } else {
            // This is a standard button on mobile
            li.classList.add('button-standard-rect');
        }
    }
}

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', applyRandomShapes);
window.addEventListener('resize', debounce(applyRandomShapes, 250));
