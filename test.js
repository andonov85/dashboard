// const data = [[1, 20, 7, 8, 22]];
const data = [generateRandomArr(100000)];

function alg(years) {
    let minLoss = null;
    let currLoss = null;
    
    for (let i = 0; i < years.length; i++) {
        // if (minLoss === 0) break;
        for (let j = i + 1; j < years.length; j++) {
            currLoss = years[i] - years[j];
            if (currLoss >= 0) {
                if (minLoss === null) {
                    minLoss = currLoss;
                } else if (currLoss < minLoss) {
                    minLoss = currLoss;
                }
            }
        }
    }
    // console.log('minLoss->', minLoss);
    return minLoss;
}

function alg2(years) {
    let minLoss = null;
    let currLoss = null;
    let sorted = [...years].sort((a, b) => b - a);
    
    for (let i = 0; i < years.length; i++) {
        // if (minLoss === 0) break;
        for (let j = 0; j < sorted.length; j++) {
            if (years[i] === sorted[j]) {
                // console.log('1. sorted', sorted, 'minLoss', minLoss)
                // console.log('2. current value from years', years[i], 'index in sorted', j)
                if (j === sorted.length - 1) {
                    sorted.splice(j, 1);
                    break;
                }
                currLoss = years[i] - sorted[j + 1];
                if (minLoss !== null && minLoss > currLoss) {
                    minLoss = currLoss;
                } else if (minLoss === null) {
                    minLoss = currLoss;
                }
                sorted.splice(j, 1);
                
                break;
            }
        }
    }
    // console.log('minLoss->', minLoss);
    return minLoss;
}

function alg3(years) {
    let minLoss = null;
    let currLoss = null;
    let sortedWithIndexes = years.map((value, index) => {
        return {
            index: index,
            value: value
        }
    }).sort((a, b) => b.value - a.value);
    
    for (let i = 0; i < sortedWithIndexes.length - 1; i++) {
        if (sortedWithIndexes[i].index < sortedWithIndexes[i + 1].index) {
            currLoss = sortedWithIndexes[i].value - sortedWithIndexes[i + 1].value;
            if (minLoss !== null && currLoss < minLoss) {
                minLoss = currLoss;
            } else if (minLoss === null) {
                minLoss = currLoss;
            }
        }
    }
    // console.log('minLoss->', minLoss);
    return minLoss;
}

data.forEach(el => {
    console.time('alg test');
    alg(el);
    console.timeEnd('alg test');

    console.log('==============');

    console.time('alg2 test');
    alg2(el);
    console.timeEnd('alg2 test');

    console.log('==============');

    console.time('alg3 test');
    alg3(el);
    console.timeEnd('alg3 test');
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArr(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(getRandomInt(1, length));
    }
    return arr;
}