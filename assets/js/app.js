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
    
    let filteredColors = [];
    const filteredColorsExactMatch = [];
    const filteredColorsStartsWith = [];
    const filteredColorsContainingTerm = [];

    DefinedColors.colors.forEach(color => {
        if (color.colorName === term)
            filteredColorsExactMatch.push(color);
        else if (color.colorName.startsWith(term) && color.colorName !== term)
            filteredColorsStartsWith.push(color);
        else if (color.colorName.includes(term) && !color.colorName.startsWith(term) && color.colorName !== term)
            filteredColorsContainingTerm.push(color);
    });

    filteredColors = [...filteredColorsExactMatch, ...filteredColorsStartsWith, ...filteredColorsContainingTerm];

    filteredColors.forEach(color => {
        const cardElement = colorCard(color);    
        container.appendChild(cardElement);
    });
});