/**
 * Fisher–Yates shuffle 算法
 */
const shuffle = (arr: any[]): any[] => {
    const a = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [a[r], a[i]] = [a[i], a[r]]
    }
    return a;
}

export {
    shuffle
}

