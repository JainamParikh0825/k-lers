const container = document.querySelector('.container');

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