const MEGA_ANIME_QUOTES = {
    // Popular Shounen Anime
    "Naruto": [
        { character: "Naruto Uzumaki", quote: "I won't run away anymore... I won't go back on my word... that is my ninja way!", category: "determination" },
        { character: "Rock Lee", quote: "A dropout will beat a genius through hard work!", category: "perseverance" },
        { character: "Itachi Uchiha", quote: "Those who forgive themselves and are able to accept their true nature... they are the strong ones.", category: "wisdom" },
        { character: "Jiraiya", quote: "When people get hurt, they learn to hate... when people hurt others, they become hated and racked with guilt.", category: "wisdom" },
        { character: "Gaara", quote: "A soul needs a purpose to live.", category: "purpose" },
        { character: "Minato Namikaze", quote: "The true measure of a shinobi is not how he lives but how he dies.", category: "sacrifice" },
        { character: "Shikamaru Nara", quote: "Real strength is not just physical power, but the wisdom to use it correctly.", category: "wisdom" },
        { character: "Hinata Hyuga", quote: "I'm not a byproduct of my past. I am who I am because of the choices I made.", category: "determination" }
    ],
    "One Piece": [
        { character: "Monkey D. Luffy", quote: "I'm gonna be King of the Pirates!", category: "dreams" },
        { character: "Roronoa Zoro", quote: "Nothing happened!", category: "sacrifice" },
        { character: "Monkey D. Luffy", quote: "If you don't take risks, you can't create a future!", category: "courage" },
        { character: "Nico Robin", quote: "I want to live! Take me to sea with you!", category: "hope" },
        { character: "Portgas D. Ace", quote: "Thank you for loving me!", category: "gratitude" },
        { character: "Sanji", quote: "A real man... forgives a woman's lies!", category: "love" },
        { character: "Usopp", quote: "I may be a liar, but I'll never lie about my dreams!", category: "dreams" },
        { character: "Tony Tony Chopper", quote: "When do you think people die? When they are shot? No. When they eat a poisonous mushroom? No! It's when they are forgotten.", category: "wisdom" }
    ],
    "Dragon Ball Z": [
        { character: "Son Goku", quote: "I would rather be a brainless beast than a heartless killer.", category: "compassion" },
        { character: "Vegeta", quote: "I do not fear this new challenge. Rather like a true warrior, I will rise to meet it!", category: "courage" },
        { character: "Son Gohan", quote: "Fight you? No, I want to kill you.", category: "anger" },
        { character: "Master Roshi", quote: "It is not a sin to fight for the right cause.", category: "justice" },
        { character: "Piccolo", quote: "Sometimes, we have to look beyond what we want and do what's best.", category: "wisdom" },
        { character: "Future Trunks", quote: "I will not let you destroy my world!", category: "determination" }
    ],
    "Attack on Titan": [
        { character: "Eren Yeager", quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!", category: "survival" },
        { character: "Levi Ackerman", quote: "The only thing we're allowed to do is believe that we won't regret the choice we made.", category: "choice" },
        { character: "Armin Arlert", quote: "Someone who can't sacrifice anything can't change anything!", category: "sacrifice" },
        { character: "Erwin Smith", quote: "My soldiers, rage! My soldiers, scream! My soldiers, fight!", category: "leadership" },
        { character: "Mikasa Ackerman", quote: "The world is cruel, but also beautiful.", category: "wisdom" },
        { character: "Historia Reiss", quote: "I'm the worst girl in the world, but that's fine by me!", category: "self-acceptance" }
    ],
    "Demon Slayer": [
        { character: "Tanjiro Kamado", quote: "No matter how many people you may lose, you have no choice but to go on living.", category: "resilience" },
        { character: "Kyojuro Rengoku", quote: "Set your heart ablaze!", category: "passion" },
        { character: "Inosuke Hashibira", quote: "I'm the king of the mountains!", category: "confidence" },
        { character: "Giyu Tomioka", quote: "Those who regret their own actions, I will not let them suffer.", category: "mercy" },
        { character: "Zenitsu Agatsuma", quote: "I may be weak, but I'll never give up!", category: "perseverance" },
        { character: "Uzui Tengen", quote: "Life is about protecting what's important to you.", category: "protection" }
    ],

    // More Popular Series
    "My Hero Academia": [
        { character: "Izuku Midoriya", quote: "A real hero always finds a way for justice to be served.", category: "justice" },
        { character: "All Might", quote: "Whether you win or lose, you can always come out ahead by learning from the experience.", category: "wisdom" },
        { character: "Katsuki Bakugo", quote: "If you wanna stop me, then stand up! Because I've got one thing to say to you! Never forget who you want to become!", category: "determination" },
        { character: "Shoto Todoroki", quote: "I'll create a world where heroes have time to kill.", category: "peace" },
        { character: "Tenya Iida", quote: "To become someone who can help others, you have to start by learning to help yourself.", category: "growth" },
        { character: "Ochaco Uraraka", quote: "Let's do our best!", category: "encouragement" }
    ],
    "Fullmetal Alchemist": [
        { character: "Edward Elric", quote: "A lesson without pain is meaningless.", category: "wisdom" },
        { character: "Roy Mustang", quote: "The world's not perfect, but it's there for us trying the best it can.", category: "acceptance" },
        { character: "Alphonse Elric", quote: "To obtain something, something of equal value must be lost.", category: "sacrifice" },
        { character: "Winry Rockbell", quote: "A heart made fullmetal!", category: "strength" },
        { character: "Izumi Curtis", quote: "To train the body, train the mind first.", category: "discipline" },
        { character: "Maes Hughes", quote: "The world isn't perfect. But it's there for us, doing the best it can.", category: "optimism" }
    ],
    "Hunter x Hunter": [
        { character: "Gon Freecss", quote: "It takes a mere second for treasure to turn to trash.", category: "perspective" },
        { character: "Killua Zoldyck", quote: "Being weak is nothing to be ashamed of... staying weak is!!", category: "growth" },
        { character: "Kurapika", quote: "I do not fear death. I fear only that my rage will fade over time.", category: "determination" },
        { character: "Leorio Paradinight", quote: "A friend is someone who believes in you even when you've stopped believing in yourself.", category: "friendship" },
        { character: "Hisoka", quote: "The pleasure of a fight is deciding where you die.", category: "thrill" }
    ],
    "Bleach": [
        { character: "Ichigo Kurosaki", quote: "If I don't wield the sword, I can't protect you. If I keep wielding the sword, I can't embrace you.", category: "conflict" },
        { character: "Rukia Kuchiki", quote: "We must not shed tears, for it would be a waste of the body's water.", category: "strength" },
        { character: "Uryu Ishida", quote: "Sanity? Sorry, but I don't remember having such a useless thing in the first place.", category: "madness" },
        { character: "Orihime Inoue", quote: "I'll heal you and hurt you at the same time. That's what it means to care for someone.", category: "love" },
        { character: "Byakuya Kuchiki", quote: "Serenity is not just an absence of war, but also an absence of turmoil, violence, confusion and doubt.", category: "peace" }
    ],

    // Classic Series
    "Dragon Ball": [
        { character: "Master Roshi", quote: "It is not a sin to fight for the right cause.", category: "justice" },
        { character: "Yamcha", quote: "I may not be the strongest, but I'll never stop trying!", category: "perseverance" },
        { character: "Krillin", quote: "The important thing is not how long you live, it's what you accomplish with your life.", category: "purpose" },
        { character: "Tien", quote: "A warrior's true strength comes from fighting for something bigger than himself.", category: "strength" }
    ],
    "Saint Seiya": [
        { character: "Seiya", quote: "Burn, my cosmos!", category: "power" },
        { character: "Shiryu", quote: "A true saint never backs down from a fight!", category: "courage" },
        { character: "Hyoga", quote: "The coldest ice comes from the hottest flame.", category: "transformation" },
        { character: "Shun", quote: "Kindness is not weakness; it is strength in its purest form.", category: "compassion" }
    ],
    "Yu Yu Hakusho": [
        { character: "Yusuke Urameshi", quote: "I'm not going to live a dull, boring life.", category: "adventure" },
        { character: "Kuwabara", quote: "A real man never goes back on his word!", category: "integrity" },
        { character: "Hiei", quote: "The weak forfeit their right to live.", category: "survival" },
        { character: "Kurama", quote: "In order to defeat monsters, we have to abandon our humanity.", category: "sacrifice" }
    ],

    // Sports Anime
    "Haikyuu": [
        { character: "Hinata Shoyo", quote: "Being the best decoy is as cool as being the ace!", category: "teamwork" },
        { character: "Kageyama Tobio", quote: "Being the best is not enough; I want to be the only one.", category: "ambition" },
        { character: "Daichi Sawamura", quote: "Volleyball is a sport where you're always looking up.", category: "optimism" },
        { character: "Nishinoya Yu", quote: "The future belongs to those who believe in the beauty of their dreams!", category: "dreams" },
        { character: "Asahi Azumane", quote: "It doesn't matter how slow you are, as long as you don't stop.", category: "perseverance" }
    ],
    "Kuroko's Basketball": [
        { character: "Kuroko Tetsuya", quote: "I am a supporting actor, a shadow. But a shadow will become darker if the light is stronger.", category: "support" },
        { character: "Kagami Taiga", quote: "There's no point in winning if you can't win the way you want to.", category: "principles" },
        { character: "Aomine Daiki", quote: "The only one who can beat me is me.", category: "confidence" },
        { character: "Kise Ryota", quote: "I don't want to be someone's copy. I want to be my own person.", category: "identity" }
    ],
    "Slam Dunk": [
        { character: "Sakuragi Hanamichi", quote: "I'm a genius!", category: "confidence" },
        { character: "Rukawa Kaede", quote: "Practice is the only way to get better.", category: "improvement" },
        { character: "Akagi Takenori", quote: "A team is not about one person; it's about everyone working together.", category: "teamwork" },
        { character: "Miyagi Ryota", quote: "Never give up until the final whistle blows.", category: "persistence" }
    ],

    // Psychological/Thriller Anime
    "Death Note": [
        { character: "Light Yagami", quote: "I am justice!", category: "justice" },
        { character: "L", quote: "Justice will prevail!", category: "justice" },
        { character: "Ryuk", quote: "Humans are so interesting.", category: "observation" },
        { character: "Misa Amane", quote: "Love is blind.", category: "love" }
    ],
    "Code Geass": [
        { character: "Lelouch Lamperouge", quote: "The only ones who should kill are those who are prepared to be killed.", category: "consequence" },
        { character: "Suzaku Kururugi", quote: "You can't change the world without getting your hands dirty.", category: "change" },
        { character: "C.C.", quote: "The power of the king will condemn you to a life of solitude.", category: "power" },
        { character: "Kallen Kozuki", quote: "I fight for those who cannot fight for themselves.", category: "protection" }
    ],
    "Monster": [
        { character: "Kenzo Tenma", quote: "Everyone's life has equal value.", category: "equality" },
        { character: "Johan Liebert", quote: "The only thing humans are equal in is death.", category: "mortality" },
        { character: "Nina Fortner", quote: "We all have monsters inside us.", category: "self-awareness" }
    ],

    // Slice of Life/Drama
    "Your Name": [
        { character: "Taki Tachibana", quote: "Once in a while when I wake up, I find myself crying.", category: "emotion" },
        { character: "Mitsuha Miyamizu", quote: "Dreams see us through to tomorrow.", category: "hope" }
    ],
    "A Silent Voice": [
        { character: "Shoya Ishida", quote: "I want you to help me live.", category: "redemption" },
        { character: "Shoko Nishimiya", quote: "I want to help you live.", category: "forgiveness" }
    ],
    "Spirited Away": [
        { character: "Chihiro", quote: "I finally get it. I'm gonna get you out of here.", category: "determination" },
        { character: "Haku", quote: "Once you've met someone you never really forget them.", category: "memory" },
        { character: "No-Face", quote: "I want Sen. I want Sen.", category: "desire" }
    ],

    // Action/Adventure
    "JoJo's Bizarre Adventure": [
        { character: "Jonathan Joestar", quote: "I want to be a true gentleman!", category: "nobility" },
        { character: "Joseph Joestar", quote: "Your next line is...", category: "prediction" },
        { character: "Jotaro Kujo", quote: "Yare yare daze.", category: "indifference" },
        { character: "Josuke Higashikata", quote: "What did you say about my hair?!", category: "pride" },
        { character: "Giorno Giovanna", quote: "I have a dream.", category: "dreams" },
        { character: "Jolyne Cujoh", quote: "Stone free!", category: "freedom" }
    ],
    "Cowboy Bebop": [
        { character: "Spike Spiegel", quote: "I'm not going there to die. I'm going to find out if I'm really alive.", category: "existence" },
        { character: "Jet Black", quote: "Men only think about the past right before their death.", category: "mortality" },
        { character: "Faye Valentine", quote: "The past is the past and the future is the future.", category: "acceptance" },
        { character: "Edward", quote: "Lesson lesson! If you see a stranger, follow him!", category: "curiosity" }
    ],
    "Trigun": [
        { character: "Vash the Stampede", quote: "This world is made of love and peace!", category: "peace" },
        { character: "Nicholas D. Wolfwood", quote: "Whenever you see a man in need, lend him a hand.", category: "kindness" },
        { character: "Meryl Stryfe", quote: "Every journey begins with a single step.", category: "beginning" }
    ],

    // Fantasy/Magic
    "Fairy Tail": [
        { character: "Natsu Dragneel", quote: "The moment you think of giving up, think of the reason why you held on so long.", category: "perseverance" },
        { character: "Erza Scarlet", quote: "Hurt me with the truth, but never comfort me with a lie.", category: "honesty" },
        { character: "Lucy Heartfilia", quote: "We don't have to know what tomorrow holds! That's why we can live for everything we're worth today!", category: "present" },
        { character: "Gray Fullbuster", quote: "Ice makes it nice!", category: "coolness" },
        { character: "Wendy Marvell", quote: "I want to become stronger, not just for me, but for my friends too.", category: "friendship" },
        { character: "Gajeel Redfox", quote: "I'll show you the power of Fairy Tail's Iron Dragon!", category: "strength" }
    ],
    "Black Clover": [
        { character: "Asta", quote: "I'm going to be the Wizard King!", category: "dreams" },
        { character: "Yuno", quote: "I'll surpass my limits.", category: "growth" },
        { character: "Noelle Silva", quote: "I'm royalty. I don't apologize.", category: "pride" },
        { character: "Yami Sukehiro", quote: "Surpass your limits. Right here, right now.", category: "transcendence" }
    ],
    "Seven Deadly Sins": [
        { character: "Meliodas", quote: "No matter how hurt someone is, they're meant to overcome it.", category: "recovery" },
        { character: "Elizabeth", quote: "I believe in the power of kindness.", category: "kindness" },
        { character: "Ban", quote: "I'll never give up on the people I love.", category: "devotion" },
        { character: "King", quote: "True strength comes from protecting what you love.", category: "protection" }
    ],

    // Mecha
    "Neon Genesis Evangelion": [
        { character: "Shinji Ikari", quote: "I mustn't run away!", category: "courage" },
        { character: "Rei Ayanami", quote: "I am me. That is all I am.", category: "identity" },
        { character: "Asuka Langley", quote: "I am the best!", category: "confidence" },
        { character: "Gendo Ikari", quote: "All according to the scenario.", category: "planning" }
    ],
    "Gundam": [
        { character: "Amuro Ray", quote: "I can see time!", category: "perception" },
        { character: "Char Aznable", quote: "I have never betrayed anyone in my entire life!", category: "loyalty" },
        { character: "Kamille Bidan", quote: "I can feel it! The power!", category: "power" }
    ],
    "Code Geass": [
        { character: "Lelouch vi Britannia", quote: "All men are not created equal!", category: "inequality" },
        { character: "Suzaku Kururugi", quote: "Wrong actions don't lead to right results.", category: "morality" }
    ],

    // Horror/Supernatural
    "Tokyo Ghoul": [
        { character: "Ken Kaneki", quote: "I'm not the protagonist of a novel or anything. I'm just a college student who likes to read, like you could find anywhere. But... if, for argument's sake, you were to write a story with me in the lead role, it would certainly be... a tragedy.", category: "tragedy" },
        { character: "Touka Kirishima", quote: "Why is it that beautiful things are entwined more deeply with death than with life?", category: "beauty" },
        { character: "Juuzou Suzuya", quote: "Why should I apologize for being a monster? Has anyone ever apologized for turning me into one?", category: "transformation" }
    ],
    "Parasyte": [
        { character: "Shinichi Izumi", quote: "All thinking humans are... monsters.", category: "humanity" },
        { character: "Migi", quote: "I am not your ally. You are simply... useful to me.", category: "utility" }
    ],
    "Another": [
        { character: "Kouichi Sakakibara", quote: "It doesn't do any good to pretend you can't see what's going on.", category: "truth" },
        { character: "Mei Misaki", quote: "Things that are important... are usually lost.", category: "loss" }
    ],

    // Romance
    "Toradora": [
        { character: "Ryuji Takasu", quote: "There's something in this world that no one has ever seen before. It's gentle and sweet, and if it were to be seen by someone, they would definitely want to have it.", category: "love" },
        { character: "Taiga Aisaka", quote: "No matter where you are, everyone is connected.", category: "connection" }
    ],
    "Your Lie in April": [
        { character: "Kousei Arima", quote: "Maybe there's only a dark road up ahead. But you still have to believe and keep going. Believe that the stars will light your path.", category: "hope" },
        { character: "Kaori Miyazono", quote: "Music is freedom.", category: "freedom" }
    ],
    "Clannad": [
        { character: "Tomoya Okazaki", quote: "Life is a series of meetings and partings. That is life.", category: "life" },
        { character: "Nagisa Furukawa", quote: "Is it okay for me to be in this world?", category: "belonging" }
    ],

    // Comedy
    "Gintama": [
        { character: "Gintoki Sakata", quote: "Life is basically like a soap bubble. It rides on the wind, flying here and there. And before you realize it, pop! It's gone.", category: "life" },
        { character: "Kagura", quote: "Stress makes you bald, but it's stressful to avoid stress, so you end up stressed out anyway, so in the end there's nothing you can do.", category: "stress" }
    ],
    "One Punch Man": [
        { character: "Saitama", quote: "Human strength lies in the ability to change yourself.", category: "change" },
        { character: "Genos", quote: "The true power of us heroes is to make the impossible possible!", category: "heroism" }
    ],
    "Mob Psycho 100": [
        { character: "Kageyama Shigeo", quote: "If everyone is not special, maybe you can be what you want to be.", category: "potential" },
        { character: "Reigen Arataka", quote: "Your life is your own! Don't let others tell you how to live it!", category: "independence" }
    ]
};

// Category definitions with enhanced metadata
const MOTIVATION_CATEGORIES = {
    all: { 
        name: "All Quotes", 
        icon: "🌟", 
        color: "#FFD700",
        description: "Experience all types of motivation"
    },
    determination: { 
        name: "Determination", 
        icon: "💪", 
        color: "#FF6B35",
        description: "Never give up, never surrender"
    },
    courage: { 
        name: "Courage", 
        icon: "⚔️", 
        color: "#DC143C",
        description: "Face your fears head-on"
    },
    friendship: { 
        name: "Friendship", 
        icon: "🤝", 
        color: "#32CD32",
        description: "The power of bonds and connections"
    },
    perseverance: { 
        name: "Perseverance", 
        icon: "🔥", 
        color: "#FF4500",
        description: "Keep pushing through hardships"
    },
    dreams: { 
        name: "Dreams", 
        icon: "✨", 
        color: "#9370DB",
        description: "Chase your impossible dreams"
    },
    wisdom: { 
        name: "Wisdom", 
        icon: "🧠", 
        color: "#4169E1",
        description: "Learn from experience and knowledge"
    },
    sacrifice: { 
        name: "Sacrifice", 
        icon: "💔", 
        color: "#8B0000",
        description: "What we give up for others"
    },
    hope: { 
        name: "Hope", 
        icon: "🌅", 
        color: "#FFB347",
        description: "Light in the darkest times"
    },
    strength: { 
        name: "Strength", 
        icon: "⚡", 
        color: "#FFFF00",
        description: "Inner and outer power"
    },
    justice: { 
        name: "Justice", 
        icon: "⚖️", 
        color: "#00CED1",
        description: "Fight for what's right"
    },
    love: { 
        name: "Love", 
        icon: "❤️", 
        color: "#FF69B4",
        description: "The most powerful force"
    }
};

// Enhanced anime series metadata
const ANIME_SERIES_META = {
    "Naruto": {
        genre: "Shounen",
        year: 2002,
        studio: "Pierrot",
        episodes: 720,
        rating: 9.0,
        color: "#FF6B35",
        description: "The story of a ninja who never gives up"
    },
    "One Piece": {
        genre: "Shounen",
        year: 1999,
        studio: "Toei Animation",
        episodes: 1000,
        rating: 9.1,
        color: "#FF8C00",
        description: "Pirates pursuing the ultimate treasure"
    },
    "Dragon Ball Z": {
        genre: "Shounen",
        year: 1989,
        studio: "Toei Animation",
        episodes: 291,
        rating: 8.8,
        color: "#FFD700",
        description: "Saiyans protecting Earth"
    },
    // Add metadata for all series...
};

// Function to get all quotes
function getAllQuotes() {
    const allQuotes = [];
    for (const [series, quotes] of Object.entries(MEGA_ANIME_QUOTES)) {
        quotes.forEach(quote => {
            allQuotes.push({
                ...quote,
                series: series,
                id: `${series}-${quote.character}-${allQuotes.length}`
            });
        });
    }
    return allQuotes;
}

// Function to get quotes by category
function getQuotesByCategory(category) {
    const allQuotes = getAllQuotes();
    if (category === 'all') return allQuotes;
    return allQuotes.filter(quote => quote.category === category);
}

// Function to get quotes by series
function getQuotesBySeries(series) {
    return MEGA_ANIME_QUOTES[series] || [];
}

// Function to get random quote
function getRandomQuote(category = 'all') {
    const quotes = getQuotesByCategory(category);
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = {
        MEGA_ANIME_QUOTES,
        MOTIVATION_CATEGORIES,
        ANIME_SERIES_META,
        getAllQuotes,
        getQuotesByCategory,
        getQuotesBySeries,
        getRandomQuote
    };
}
