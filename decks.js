// decks.js
// Expanded V2 decks for "Take a Guess".
// Notes:
// - "people" is intentionally UK-friendly + globally recognisable across generations.
// - Sports rule applied: only truly household-name, non-niche, globally recognisable athletes.
// - "tvfilm" mixes major films + major TV shows (UK + global) that British audiences broadly know.
// - You can keep adding strings to either list with no other code changes.

window.TAKE_A_GUESS_DECKS = {
  people: [
    // ----------------------------
    // UK / Ireland: Royals & politics (high recognition)
    // ----------------------------
    "King Charles III","Queen Camilla","Prince William","Catherine, Princess of Wales","Prince Harry","Meghan Markle",
    "Queen Elizabeth II","Princess Diana","Prince Philip",
    "Winston Churchill","Margaret Thatcher","Tony Blair","Gordon Brown","David Cameron","Theresa May",
    "Boris Johnson","Rishi Sunak","Keir Starmer","Sadiq Khan","Nigel Farage",

    // ----------------------------
    // UK / Ireland: TV presenters & personalities
    // ----------------------------
    "Graham Norton","Jonathan Ross","Ant McPartlin","Declan Donnelly","Holly Willoughby","Claudia Winkleman",
    "Davina McCall","Alison Hammond","Lorraine Kelly","Phillip Schofield","Jeremy Clarkson","Richard Hammond","James May",
    "Gary Lineker","Alan Sugar","Susanna Reid","Paddy McGuinness","Bradley Walsh","Stephen Mulhern","Amanda Holden",
    "Alesha Dixon","Simon Cowell","Dermot O'Leary","Stacey Solomon","Rylan Clark","Gok Wan","Paul O'Grady",
    "Michael Parkinson","Terry Wogan","Bruce Forsyth",

    // ----------------------------
    // UK / Ireland: Comedy
    // ----------------------------
    "Rowan Atkinson","Ricky Gervais","Stephen Fry","Hugh Laurie","Sacha Baron Cohen","James Corden",
    "Michael McIntyre","Jimmy Carr","Alan Carr","Dawn French","Jennifer Saunders","David Mitchell","Robert Webb",
    "Jo Brand","Sarah Millican","Peter Kay","Jack Whitehall","Noel Fielding","Richard Ayoade","Joe Lycett",
    "Romesh Ranganathan","Nish Kumar","Katherine Ryan","Russell Howard","Russell Brand","Eddie Izzard",
    "Lee Mack","Micky Flanagan","Vic Reeves","Bob Mortimer","Morecambe and Wise","John Cleese","Michael Palin",
    "Eric Idle","Terry Gilliam",

    // ----------------------------
    // UK / Ireland: Actors (cross-generational)
    // ----------------------------
    "Daniel Craig","Judi Dench","Helen Mirren","Gary Oldman","Michael Caine","Hugh Grant","Colin Firth",
    "Emma Thompson","Kate Winslet","Keira Knightley","Tilda Swinton","Olivia Colman","Idris Elba",
    "Benedict Cumberbatch","Martin Freeman","Tom Hardy","Cillian Murphy","Christian Bale","Jason Statham",
    "Orlando Bloom","Ian McKellen","Patrick Stewart","David Tennant","Matt Smith","Peter Capaldi",
    "Jodie Whittaker","Andrew Scott","Stephen Graham","Jodie Comer","Phoebe Waller-Bridge","Carey Mulligan",
    "Rosamund Pike","Emily Blunt","Naomie Harris","John Boyega","Letitia Wright","Dev Patel","Ewan McGregor",
    "Sean Bean","Damian Lewis","Ralph Fiennes","Liam Neeson","Pierce Brosnan","Sean Connery","Roger Moore",
    "Timothy Dalton","Benedict Wong","Charlotte Rampling","Julie Walters","Joanna Lumley",

    // ----------------------------
    // UK / Ireland: Music (60s to now)
    // ----------------------------
    "The Beatles","Paul McCartney","John Lennon","George Harrison","Ringo Starr",
    "The Rolling Stones","Mick Jagger","Keith Richards",
    "Elton John","David Bowie","Freddie Mercury","Brian May","Roger Taylor",
    "George Michael","Amy Winehouse","Robbie Williams","Spice Girls","Victoria Beckham","Geri Halliwell",
    "Mel B","Mel C","Emma Bunton",
    "Adele","Ed Sheeran","Dua Lipa","Harry Styles","Stormzy","Sam Smith","Lewis Capaldi","Florence Welch",
    "Calvin Harris","Craig David","Noel Gallagher","Liam Gallagher","Damon Albarn","Alex Turner","Thom Yorke",
    "Annie Lennox","Phil Collins","Sting","Rod Stewart","Kate Bush","Lily Allen","Jessie J","Mick Hucknall",
    "Cliff Richard","Shirley Bassey","Tom Jones",

    // ----------------------------
    // UK / Ireland: Food & culture
    // ----------------------------
    "Gordon Ramsay","Jamie Oliver","Mary Berry","Nigella Lawson",

    // ----------------------------
    // UK / Ireland: Science / culture icons
    // ----------------------------
    "David Attenborough","Stephen Hawking","Brian Cox","Tim Berners-Lee","Alan Turing","Jane Austen",
    "Charles Darwin","Isaac Newton","William Shakespeare","J.K. Rowling","Roald Dahl","Agatha Christie",
    "J.R.R. Tolkien","George Orwell",

    // ----------------------------
    // US / Canada: Politics & public figures (high recognition)
    // ----------------------------
    "Barack Obama","Michelle Obama","Donald Trump","Joe Biden","Kamala Harris","Hillary Clinton","Bill Clinton",
    "John F. Kennedy","Martin Luther King Jr.",

    // ----------------------------
    // US / Canada: Film & TV stars
    // ----------------------------
    "Tom Hanks","Meryl Streep","Denzel Washington","Leonardo DiCaprio","Brad Pitt","Angelina Jolie",
    "Jennifer Aniston","Will Smith","Morgan Freeman","Samuel L. Jackson","Julia Roberts","Sandra Bullock",
    "Nicole Kidman","Reese Witherspoon","Scarlett Johansson","Natalie Portman","Anne Hathaway",
    "Jennifer Lawrence","Emma Stone","Charlize Theron","Robert De Niro","Al Pacino","Jack Nicholson",
    "Tom Cruise","Johnny Depp","Matt Damon","Ben Affleck","Ryan Gosling","Ryan Reynolds","Mark Wahlberg",
    "Chris Pratt","Paul Rudd","Kevin Hart","Robert Downey Jr.","Chris Evans","Chris Hemsworth",
    "Tom Holland","Zendaya","Keanu Reeves","Harrison Ford","George Clooney","Clint Eastwood","Robin Williams",
    "Sylvester Stallone","Arnold Schwarzenegger","Hugh Jackman","Drew Barrymore","Cameron Diaz",
    "Meg Ryan","Sigourney Weaver","Whoopi Goldberg","Diane Keaton","Susan Sarandon","Cate Blanchett",
    "Margot Robbie","Gal Gadot","Viola Davis","Chris Rock","Dave Chappelle","Eddie Murphy",
    "Steve Carell","Will Ferrell","Adam Sandler","Jim Carrey","Tina Fey","Amy Poehler","Oprah Winfrey",
    "Ellen DeGeneres",

    // ----------------------------
    // US / global: Music (widely known in UK)
    // ----------------------------
    "Taylor Swift","Beyoncé","Jay-Z","Rihanna","Lady Gaga","Madonna","Prince","Michael Jackson","Whitney Houston",
    "Celine Dion","Justin Bieber","Bruno Mars","Eminem","Snoop Dogg","Kendrick Lamar","Drake","Ariana Grande",
    "Billie Eilish","Olivia Rodrigo","Miley Cyrus","Selena Gomez","Demi Lovato","Katy Perry",
    "Shania Twain","Mariah Carey","Elvis Presley","Bob Dylan","Bruce Springsteen","Dolly Parton","Cher",
    "Tina Turner","ABBA","Bono",

    // ----------------------------
    // Global: Bollywood / international icons (UK recognition)
    // ----------------------------
    "Shah Rukh Khan","Priyanka Chopra","Amitabh Bachchan","Aishwarya Rai",

    // ----------------------------
    // Global: Tech / business (household level)
    // ----------------------------
    "Bill Gates","Steve Jobs","Elon Musk","Mark Zuckerberg","Jeff Bezos",

    // ----------------------------
    // Global: Activists / public figures (widely known)
    // ----------------------------
    "Greta Thunberg","Malala Yousafzai","Nelson Mandela","Pope Francis","Dalai Lama",

    // ----------------------------
    // Sport (strictly global household names)
    // ----------------------------
    // Football
    "Lionel Messi","Cristiano Ronaldo","Pele","Diego Maradona","Zinedine Zidane","Ronaldinho","Thierry Henry",
    "David Beckham","Wayne Rooney","Kylian Mbappe","Erling Haaland",
    // Tennis
    "Roger Federer","Rafael Nadal","Novak Djokovic","Serena Williams","Andy Murray","Emma Raducanu",
    // Athletics / Olympics
    "Usain Bolt","Mo Farah","Michael Phelps","Simone Biles",
    // Motorsport
    "Lewis Hamilton","Michael Schumacher","Ayrton Senna","Max Verstappen",
    // Golf
    "Tiger Woods","Rory McIlroy",
    // Boxing / MMA (household level)
    "Muhammad Ali","Mike Tyson","Anthony Joshua","Tyson Fury","Floyd Mayweather Jr.","Conor McGregor",
    // Basketball (restricted)
    "Michael Jordan","LeBron James"
  ],

  tvfilm: [
    // ----------------------------
    // Films (broad UK recognition)
    // ----------------------------
    "Titanic","The Godfather","The Godfather Part II","Star Wars","The Empire Strikes Back","Return of the Jedi",
    "Home Alone","Home Alone 2","Jurassic Park","Jaws","E.T.","Back to the Future","Back to the Future Part II",
    "The Matrix","The Shawshank Redemption","Forrest Gump","Gladiator","Rocky","Rocky II","Ghostbusters",
    "The Terminator","Terminator 2: Judgment Day","Alien","Aliens","Predator","Die Hard","Die Hard 2","Speed",
    "Pretty Woman","Notting Hill","Four Weddings and a Funeral","Love Actually","Bridget Jones's Diary",
    "The Full Monty","Trainspotting","Slumdog Millionaire","The King's Speech","Skyfall","Casino Royale",
    "Goldfinger","Dr. No","From Russia with Love","The Dark Knight","Batman Begins","The Dark Knight Rises",
    "The Lord of the Rings: The Fellowship of the Ring","The Lord of the Rings: The Two Towers",
    "The Lord of the Rings: The Return of the King",
    "Harry Potter and the Philosopher's Stone","Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban","Harry Potter and the Goblet of Fire",
    "Harry Potter and the Order of the Phoenix","Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Deathly Hallows – Part 1","Harry Potter and the Deathly Hallows – Part 2",
    "The Lion King","Toy Story","Toy Story 2","Toy Story 3","Finding Nemo","Monsters, Inc.","Up",
    "Shrek","Shrek 2","Frozen","Moana","Coco","Inside Out",
    "Pulp Fiction","Reservoir Dogs","Kill Bill: Volume 1","Kill Bill: Volume 2","Inception","Interstellar",
    "The Prestige","Oppenheimer","Dunkirk",
    "Top Gun","Top Gun: Maverick","Mission: Impossible","Mission: Impossible 2","Mission: Impossible – Fallout",
    "Indiana Jones and the Raiders of the Lost Ark","Indiana Jones and the Last Crusade",
    "Pirates of the Caribbean: The Curse of the Black Pearl",
    "Avatar","Avatar: The Way of Water",
    "Spider-Man","Spider-Man 2","Spider-Man: No Way Home",
    "Iron Man","The Avengers","Avengers: Endgame","Black Panther",
    "The Hunger Games","The Hunger Games: Catching Fire",
    "Barbie","The Sound of Music","Grease","Rocky Horror Picture Show",
    "A Christmas Carol","The Muppet Christmas Carol","Elf","The Holiday","The Santa Clause",
    "The Nightmare Before Christmas","Miracle on 34th Street",
    "The Silence of the Lambs","Se7en","The Sixth Sense",
    "Kingsman: The Secret Service","Paddington","Paddington 2",

    // ----------------------------
    // TV (UK staples + global hits widely watched in the UK)
    // ----------------------------
    "Friends","The Simpsons","Game of Thrones","Breaking Bad","Stranger Things","The Office (US)","The Office (UK)",
    "Doctor Who","Sherlock","Top Gear","The Grand Tour","Strictly Come Dancing","Britain's Got Talent",
    "The X Factor","Love Island","EastEnders","Coronation Street","Emmerdale",
    "Peaky Blinders","The Crown","Black Mirror","Line of Duty","Gavin & Stacey","Only Fools and Horses",
    "Fawlty Towers","Dad's Army","The Vicar of Dibley","The Inbetweeners","Skins","Misfits",
    "I'm a Celebrity...Get Me Out of Here!","The Apprentice","The Chase","Who Wants to Be a Millionaire?",
    "Pointless","University Challenge","Mastermind","Countdown","Deal or No Deal",
    "The Great British Bake Off","Come Dine with Me","Gogglebox",
    "Saturday Night Takeaway","Antiques Roadshow",
    "The Big Bang Theory","How I Met Your Mother","Modern Family","Brooklyn Nine-Nine","Parks and Recreation",
    "Seinfeld","Frasier","Cheers","Curb Your Enthusiasm",
    "Better Call Saul","The Walking Dead","Lost","Prison Break","House","Grey's Anatomy","ER",
    "CSI","CSI: Miami","NCIS","The Sopranos","The Wire",
    "Downton Abbey","Call the Midwife","The Bodyguard","Happy Valley","Broadchurch","Luther",
    "Spooks","Life on Mars","Ashes to Ashes",
    "The Mandalorian","Star Trek","Star Trek: The Next Generation","The Boys",
    "The Witcher","Wednesday","Squid Game",
    "The Fresh Prince of Bel-Air","Buffy the Vampire Slayer","The X-Files","Twin Peaks",
    "The Daily Show","Saturday Night Live",
    "The Jeremy Kyle Show","This Morning","Good Morning Britain",
    "Coronation Street","EastEnders"
  ]
};
