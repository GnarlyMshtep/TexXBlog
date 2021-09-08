const tagsMatch = (tags, filters) => {
    console.log("hsbadjhasb", tags);
    if (tags && filters) {
        for (let i = 0; i < tags.length; i++) {
            for (let i = 0; i < filters.length; i++) {
                if (tags[i] === filters[i]) {
                    console.log('i am included');
                    return true;
                }
            }
        }
        return false;
    }
}

function sideBarWidth(originalWidth, callNumber, isForward) {
    callNumber = isForward ? callNumber : 80 - callNumber

    /*return (-originalWidth / 4) * (.05 * callNumber - 6) ** (1 / 3) + (1 / 2) * originalWidth*/
    //console.log(-originalWidth / (1 + Math.exp(-.06 * (callNumber - 100))) + originalWidth);
    return (-originalWidth / (1 + Math.exp(-.12 * (callNumber - 40))) + originalWidth + 2)

}

export default {
    tagsMatch,
    sideBarWidth
}