

/**
 * Callback for parsing.
 * @callback parseCallback
 * @param {err} error != null if an error occured while parsing.
 * @param {object} data The parsed cfg file.
 */

function tokenType(token) {

}

function stripComments(data) {
    return data.split("\n").filter(line => line.trim()[0] !== "#").join("\n");
}

function parseValue(data, type) {
    if (data[0] === "<") {
        return data.slice(1, -1).split(/\s+/).filter(value => value !== "").map(value => {
            switch (type) {
                case "I":
                    return parseInt(value);
                case "D":
                    return parseFloat(value);
                case "B":
                    return value === "true";
                default:
                    return value;
            }
        });
    } else if (data[0] === "=") {
        let value = data.slice(1);
        switch (type) {
            case "I":
                return parseInt(value);
            case "D":
                return parseFloat(value);
            case "B":
                return value === "true";
            default:
                return value;
        }
    }
    throw new Error("Error parsing value: " + data);
}

function parseGroup(data) {

    let parsed = {};

    let values = data.matchAll(/([A-Z]):(\w+|".*")\s*(<[^>]*>|=[a-zA-Z0-9.]+)/g);

    for (const value of values) {
        parsed[value[2]] = parseValue(value[3], value[1]);
    }

    return parsed;
}

function parse(data) {

    let parsed = {};

    data = stripComments(data);
    
    let groups = [...data.matchAll(/(\w+|".+")\s*{([^}]*)}/g)];

    for (const group of groups) {
        parsed[group[1]] = parseGroup(group[2])
    }

    return parsed;
}

module.exports = {
    /**
     * Parse a Forge cfg file string.
     * @param {string} data Contents of the Forge cfg file.
     * @returns Parsed data as object.
     */
    parse(data) {
        return parse(data);
    },
};