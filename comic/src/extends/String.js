const regRemoveSpace = /\S+/g;

export const removeSpace = (string) => {
    let array = string.match(regRemoveSpace);
    if (array === null)
        return 'Vô danh';

    return array.join(' ');
};

// this already remove space
export const displayMax = (string, maxLength) => {
    let lastChar = string.charAt(maxLength - 1);

    if (string.length < maxLength) {
        return removeSpace(string);
    } else if (lastChar === ' ') {
        return string.substring(0, maxLength - 1).match(regRemoveSpace).join(' ').concat('...');
    } else {
        // we choose array.length instead for length - 1
        // because we choose this letter at last ( we does not pop that )
        let arrayWords = string.substring(0, maxLength).match(regRemoveSpace);
        return arrayWords.splice(0, arrayWords.length - 1).join(' ').concat('...');
    }
}

