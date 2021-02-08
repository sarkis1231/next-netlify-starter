export default function sleep(n = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}
