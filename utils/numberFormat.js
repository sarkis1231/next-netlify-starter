export default function numberFormat(n, d = 0) {
    return Number(Number(n).toFixed(d));
}
