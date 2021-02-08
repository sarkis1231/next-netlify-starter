export default function minmax(val, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
    return Math.min(Math.max(val, min), max);
}
