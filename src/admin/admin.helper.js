const trimString = function (s) {
    return s.substring(0, s.length - 1);
}

const generateConcatString = function (columnNames) {
    let sql = '';
    columnNames.forEach(columnName => {
        sql += `"${columnName}",`;
    });
    
    return trimString(sql);
}

const generateMapString = function (values) {
    let sql = '';
    Object.keys(values).forEach(key => {
        sql += `"${key}"="${values[key]}",`;
    });

    return trimString(sql);
}

module.exports = {
    trimString: trimString,
    generateConcatString: generateConcatString,
    generateMapString: generateMapString
}