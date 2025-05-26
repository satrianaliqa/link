function applyRandomShapes() {
    const buttonListItems = document.querySelectorAll('#buttons04 li');
    const shapeClasses = ['button-standard-rect', 'button-large-square', 'button-portrait-rect', 'button-wide-rect', 'button-tall-rect'];
    const specialShapeClasses = ['button-large-square', 'button-portrait-rect', 'button-wide-rect', 'button-tall-rect'];
    
    // Convert NodeList to Array for easier manipulation (shuffle)
    const allButtonLIs = Array.from(buttonListItems);

    // 1. Clear existing shape classes from all button LIs
    allButtonLIs.forEach(li => {
        // Make sure to use the updated shapeClasses array for clearing
        shapeClasses.forEach(cls => li.classList.remove(cls));
        // If inline styles were used (they are not in this version, but good practice to note)
        // li.style.width = '';
        // li.style.height = '';
        // li.style.aspectRatio = '';
    });

    // 2. Decide how many buttons get a special shape
    const totalButtons = allButtonLIs.length;
    if (totalButtons === 0) return; // No buttons to shape

    let numSpecialButtons = 0;
    if (totalButtons <= 2) { // If 1 or 2 buttons, make 0 or 1 special (more likely 1)
        numSpecialButtons = Math.random() < 0.25 ? 0 : 1; 
    } else if (totalButtons <= 5) { // If 3-5 buttons, make 1 or 2 special
        numSpecialButtons = Math.random() < 0.5 ? 1 : 2;
    } else { // If more than 5 buttons, make 1, 2, or 3 special
        const rand = Math.random();
        if (rand < 0.5) numSpecialButtons = 1;
        else if (rand < 0.85) numSpecialButtons = 2;
        else numSpecialButtons = 3;
    }
    // Ensure we don't try to make more special buttons than available
    numSpecialButtons = Math.min(numSpecialButtons, totalButtons);


    // 3. Shuffle button LIs to pick random ones for special shapes
    // Fisher-Yates shuffle
    for (let i = allButtonLIs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allButtonLIs[i], allButtonLIs[j]] = [allButtonLIs[j], allButtonLIs[i]]; // Swap
    }

    // 4. Apply shapes
    // let specialShapesAppliedCount = 0; // No longer needed with the new logic
    for (let i = 0; i < allButtonLIs.length; i++) {
        const li = allButtonLIs[i];

        if (i < numSpecialButtons) {
            // This is a special button
            // Cycle through specialShapeClasses for variety
            const shapeToApply = specialShapeClasses[i % specialShapeClasses.length];
            li.classList.add(shapeToApply);
            // specialShapesAppliedCount++; // No longer needed
        } else {
            // This is a standard button
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
