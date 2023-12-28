const DirectionEnum = Object.freeze({
    input: 0,
    output: 1
});


class InParam {
    constructor(key, value) {
        if (key.indexOf('@')) {
            this._key = key.split('@')[1];
        }
        this._value = value;

        if (key.startsWith("in@")) {
            this._dir = DirectionEnum.input;
        } else if (key.startsWith("out.") && key.indexOf('@')) {
            this._dir = DirectionEnum.output;
            this._dataType = key.substr(4, key.indexOf('@') - 4);
        }
    }

    // Getter
    get ParamName() {
        return this._key;
    }
    get Value() {
        return this._value;
    }
    get Direction() {
        return this._dir;
    }
    get DataType() {
        return this._dataType;
    }
}

module.exports = class InParamUtil {
    static Parse(data) {

        if (!data) {
            return null;
        }

        var pList = new Array();
        Object.keys(data).forEach(key => {
            // console.log('name : ' + key + ', value : ' + data[key]);
            var param = new InParam(key, data[key]);
            pList.push(param);
        });

        return pList;
    }
}