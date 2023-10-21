'use script';

function errors(err, message) {
    if (err === null) {
        console.log(message);
    } else {
        console.error(err, message);
    }
}