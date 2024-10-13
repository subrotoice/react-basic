interface Action {
    type: string;
}
const counterReducer = (state: number, action: string) => {
    if(action == "INCREMENT") return state + 1;
    if(action == "RESET") return 0;
    return state;
}

export default counterReducer;