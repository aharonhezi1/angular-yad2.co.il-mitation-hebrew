export function splitBySearchExp(str, searchExp) {
   // const globalRegex = RegExp(searchExp, 'g')
    const index = str.search(searchExp)


    return [str.slice(0, index), str.slice(searchExp.length + index)]
}

