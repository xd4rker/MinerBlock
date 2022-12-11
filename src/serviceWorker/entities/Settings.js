export class Settings {
    #showCount = false;
    #showAlert = false;
    #runStatus = false;
    /** @type{string[]} */
    #whiteList = [];
    /** @type{string[]} */
    #userFilters = [];
    #useBuiltInFilters = false;
    #useUserFilters = false;

    constructor(args) {
        if (args !== undefined) {
            this.setAttributes(args);
        }
    }

    setAttributes(args) {
        this.#showCount = args['showCount'] !== undefined ? args['showCount'] : this.#showCount;
        this.#showAlert = args['showAlert'] !== undefined ? args['showAlert'] : this.#showAlert;
        this.#runStatus = args['runStatus'] !== undefined ? args['runStatus'] : this.#runStatus;
        this.#whiteList = args['whiteList'] !== undefined ? args['whiteList'] : this.#whiteList;
        this.#userFilters = args['userFilters'] !== undefined ? args['userFilters'] : this.#userFilters;

        this.#useBuiltInFilters = args['useBuiltInFilters'] !== undefined ? args['useBuiltInFilters'] : this.#useBuiltInFilters;
        this.#useUserFilters = args['useUserFilters'] !== undefined ? args['useUserFilters'] : this.#useUserFilters;
    }

    setRunStatus(runStatus) {
        this.#runStatus = runStatus;
    }

    setShowCount(showCount) {
        this.#showCount = showCount;
    }

    setUseBuiltInFilters(useFilters) {
        this.#useBuiltInFilters = useFilters;
    }

    setUseUserFilters(useFilters) {
        this.#useUserFilters = useFilters;
    }

    get runStatus() {
        return this.#runStatus;
    }

    addUserFilterElement(uriPattern) {
        return Settings.addItemToArray(this.#userFilters, uriPattern);
    }

    removeUserFilterElement(uriPattern) {
        return Settings.removeItemFromArray(this.#userFilters, uriPattern);
    }

    deleteWhiteListElement(domain) {
        Settings.removeItemFromArray(this.#whiteList, domain);
    }

    addWhiteListElement(domain) {
        return Settings.addItemToArray(this.#whiteList, domain);
    }

    static addItemToArray(arr, item) {
        if(arr.includes(item)) {
            return false;
        }

        const oldLength = arr.length;

        arr.push(item);

        return oldLength < arr.length;
    }

    static removeItemFromArray(arr, item) {
        const index = arr.indexOf(item);

        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    /**
     * @returns {{showCount: boolean, userFilters: *[], useUserFilters: boolean, useBuiltInFilters: boolean, whiteList: *[], showAlert: boolean, runStatus: boolean}}
     */
    get toDict() {
        return {
            'showCount': this.#showCount,
            'showAlert': this.#showAlert,
            'runStatus': this.#runStatus,
            'whiteList': this.#whiteList,
            'userFilters': this.#userFilters,
            'useBuiltInFilters': this.#useBuiltInFilters,
            'useUserFilters': this.#useUserFilters,
        };
    }

    static get runStatus(){
        return Settings.#runStatus;
    }

    get whiteList(){
        return this.#whiteList;
    }

    set whiteList(value) {
        this.#whiteList = value;
    }

    get userFilters(){
        return this.#userFilters;
    }

    set userFilters(value){
        this.#userFilters = value;
    }

    get showCount() {
        return this.#showCount;
    }

    get showAlert() {
        return this.#showAlert;
    }

    get useBuiltInFilters() {
        return this.#useBuiltInFilters;
    }

    get useUserFilters() {
        return this.#useUserFilters;
    }
}
  