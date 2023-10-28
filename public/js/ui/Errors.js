'use script';

function errors(err, message) {
    if (err === null) {
        throw new Error(message);
    } else {
        console.error(err);
        throw new Error(message);
    }
}