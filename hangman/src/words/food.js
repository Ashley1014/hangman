const FOOD = [
    "apple",
    "bread",
    "chocolate",
    "egg",
    "fries",
    "grape",
    "ham",
    "icecream",
    "jam",
    "kiwi",
];

function randomFood() {
    return FOOD[Math.floor(Math.random() * FOOD.length)];
}

export { randomFood };