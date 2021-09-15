// Following funcs provides formatted strings of messages

export const errMsg = async (func, msg) => {
    if (!func || !msg) return;
    return `--error ${func} ${msg}`;
}

export const scsMsg = async (func, msg) => {
    if (!func || !msg) return;
    return `--success ${func} ${msg}`;
}