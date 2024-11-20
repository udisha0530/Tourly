export const selectTravelersList = [
    {
        id: 1,
        title: 'Solo Travel',
        desc: 'Perfect for those seeking independence and adventure on their own terms.',
        icon: '🧍',
        people: '1 person',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Ideal for romantic getaways or quality time with your partner.',
        icon: '💑',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Fun and engaging activities for the entire family to enjoy together.',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5 people',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Fun and adventure for your daring group.',
        icon: '👣🤝🍹',
        people: '5 or more',
    },
];

export const selectBudgetoption = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Affordable and economical travel',
        icon: '💵',
        range: 'Under 10000',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Moderate budget with good comfort',
        icon: '💰',
        range: '10000 - 30000',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'High-end and luxurious experience',
        icon: '💎',
        range: 'Above 30000',
    },
];

export const AI_PROMPT='Generate Travel Plan for Location: {destination},for {noOfDays} Days for {traveller} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the {destination} for {noOfDays} days with each day plan with best time to visit in JSON format.'
