const container = document.querySelector('.container');
const colorSearchTerm = document.querySelector(".color-search-term");

const clearContainer = (containerElement) => {
    while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.lastChild);
    }
}

const colorCardChild = (classNames, data) => {
    const colorCardChildElement = document.createElement('div');
    colorCardChildElement.classList.add(classNames);
    colorCardChildElement.textContent = data;
    colorCardChildElement.onclick = () => {
        document.execCommand("copy");
        colorCardChildElement.textContent = 'copied ✅';
    }
    colorCardChildElement.addEventListener('copy', (event) => {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", colorCardChildElement.textContent);
        }
        setTimeout(() => {
            colorCardChildElement.textContent = data;
        }, 1000);
    });

    return colorCardChildElement;
}

const colorCard = (color) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('color-card');
    cardElement.style.backgroundColor = color.colorName;

    const colorNameElement = colorCardChild('color-name', color.colorName);
    const colorHexElement = colorCardChild('color-hex', color.colorHex);
    
    cardElement.appendChild(colorNameElement);
    cardElement.appendChild(colorHexElement);

    return cardElement;
};

DefinedColors.colors.forEach(color => {
    const cardElement = colorCard(color);    
    container.appendChild(cardElement);
});

colorSearchTerm.addEventListener("input", (event) => {
    const term = event.target.value.toLowerCase();
    clearContainer(container);

    const filteredColorsExactMatch = DefinedColors.colors.filter((color) => {
        return color.colorName === term;
    });

    const filteredColorsStartsWith = DefinedColors.colors.filter((color) => {
        return color.colorName.startsWith(term) && color.colorName !== term;
    });

    const filteredColorsContainingTerm = DefinedColors.colors.filter((color) => {
        return color.colorName.includes(term) && !color.colorName.startsWith(term) && color.colorName !== term;
    });

    const filteredColors = [...filteredColorsExactMatch, ...filteredColorsStartsWith, ...filteredColorsContainingTerm];

    filteredColors.forEach(color => {
        const cardElement = colorCard(color);    
        container.appendChild(cardElement);
    });
});