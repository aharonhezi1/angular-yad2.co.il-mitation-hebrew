 export function splitBySearchExp(str, searchExp) {
    const globalRegex = RegExp(searchExp, 'g')
    const index = str.search(searchExp)
    //console.log([str.slice(0, index),  str.slice(searchExp.length+index)]);

    return [str.slice(0, index), str.slice(searchExp.length+index)]
}

//splitBySearchExp('The quick brown fox jumps over the lazy dog.', 'x jumps o')