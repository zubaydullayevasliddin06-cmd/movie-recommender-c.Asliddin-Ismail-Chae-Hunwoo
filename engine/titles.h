#ifndef TITLES_H
#define TITLES_H

/* What a single movie or game looks like. */
typedef struct {
    const char *type;     /* "Movie" or "Game" */
    const char *title;
    int   year;
    const char *genre;    /* action, comedy, scifi, drama, horror, cozy */
    const char *mood;     /* intense, light, deep, relaxed */
    const char *timeNeed; /* short, medium, long */
    const char *social;   /* solo, group, any */
    const char *rating;
    const char *desc;
} Title;

/* The library. (This file is included only by recommend.c, so the data
   is defined here exactly once.) */
Title library[] = {
    /* ----- Movies ----- */
    {"Movie","Interstellar",2014,"scifi","deep","medium","any","8.7","Explorers travel through a wormhole to save humanity."},
    {"Movie","Mad Max: Fury Road",2015,"action","intense","short","group","8.1","A relentless chase across a post-apocalyptic desert."},
    {"Movie","Parasite",2019,"drama","intense","medium","any","8.5","A poor family schemes into a wealthy household."},
    {"Movie","The Grand Budapest Hotel",2014,"comedy","light","short","any","8.1","A concierge and his protege chase a stolen painting."},
    {"Movie","Hereditary",2018,"horror","intense","medium","group","7.3","A family unravels terrifying secrets after a death."},
    {"Movie","My Neighbor Totoro",1988,"cozy","relaxed","short","any","8.1","Two girls befriend a forest spirit in rural Japan."},
    {"Movie","Blade Runner 2049",2017,"scifi","deep","medium","solo","8.0","A blade runner uncovers a society-ending secret."},
    {"Movie","John Wick",2014,"action","intense","short","group","7.4","A retired hitman seeks vengeance for his dog."},
    {"Movie","Whiplash",2014,"drama","intense","short","solo","8.5","A young drummer is pushed to the brink by his teacher."},
    {"Movie","Superbad",2007,"comedy","light","short","group","7.6","Two friends chase one last wild night before graduation."},
    {"Movie","Get Out",2017,"horror","intense","short","group","7.8","A visit to a girlfriend's family turns sinister."},
    {"Movie","Amelie",2001,"cozy","relaxed","medium","any","8.3","A shy Parisian secretly orchestrates joy for others."},
    {"Movie","Dune",2021,"scifi","intense","medium","any","8.0","A noble heir confronts destiny on a deadly desert planet."},
    {"Movie","The Dark Knight",2008,"action","intense","medium","group","9.0","Batman faces chaos incarnate in the Joker."},
    {"Movie","The Shawshank Redemption",1994,"drama","deep","medium","any","9.3","Two prisoners bond over decades, finding hope."},
    {"Movie","Into the Spider-Verse",2018,"action","light","medium","group","8.4","A teen becomes Spider-Man across a multiverse."},
    {"Movie","The Thing",1982,"horror","intense","medium","group","8.2","Antarctic researchers face a shape-shifting alien."},
    {"Movie","Spirited Away",2001,"cozy","relaxed","medium","any","8.6","A girl wanders a spirit world to save her parents."},
    {"Movie","Everything Everywhere All at Once",2022,"drama","deep","medium","any","7.8","A laundromat owner saves the multiverse and her family."},
    {"Movie","Mission: Impossible - Fallout",2018,"action","intense","medium","group","7.7","Ethan Hunt races to stop a nuclear catastrophe."},
    {"Movie","Past Lives",2023,"drama","deep","short","solo","7.8","Two childhood friends reunite across decades."},
    {"Movie","Hot Fuzz",2007,"comedy","light","medium","group","7.8","A top cop is sent to a deceptively sleepy village."},
    {"Movie","Alien",1979,"horror","intense","medium","any","8.5","A space crew is hunted by a perfect organism."},
    {"Movie","Chef",2014,"cozy","relaxed","short","any","7.3","A chef rediscovers his passion on a food-truck trip."},
    {"Movie","Arrival",2016,"scifi","deep","short","solo","7.9","A linguist deciphers an alien language to prevent war."},
    {"Movie","Top Gun: Maverick",2022,"action","intense","medium","group","8.2","A legendary pilot trains a new generation."},
    {"Movie","La La Land",2016,"drama","light","medium","any","8.0","A pianist and an actress chase dreams and each other."},
    {"Movie","The Witch",2015,"horror","intense","short","solo","6.9","A Puritan family is torn apart by evil in the woods."},
    {"Movie","Knives Out",2019,"comedy","intense","medium","group","7.9","A detective untangles a family's murder mystery."},
    {"Movie","Coco",2017,"cozy","deep","short","group","8.4","A boy journeys to the Land of the Dead for his family."},

    /* ----- Games ----- */
    {"Game","Zelda: Breath of the Wild",2017,"action","relaxed","long","solo","9.7","Explore a vast open world of ruins, shrines, and freedom."},
    {"Game","Elden Ring",2022,"action","intense","long","solo","9.5","Conquer a brutal, mysterious open world."},
    {"Game","Stardew Valley",2016,"cozy","relaxed","long","group","8.9","Inherit a farm and build a quiet life in the valley."},
    {"Game","DOOM Eternal",2020,"action","intense","short","solo","8.4","Rip and tear through demons at blistering speed."},
    {"Game","Portal 2",2011,"scifi","light","medium","group","9.5","Solve mind-bending portal puzzles with razor wit."},
    {"Game","Red Dead Redemption 2",2018,"drama","deep","long","solo","9.7","Live the twilight of the outlaw era."},
    {"Game","Resident Evil 2 Remake",2019,"horror","intense","medium","solo","8.6","Survive a zombie-infested city as a rookie cop."},
    {"Game","Super Mario Odyssey",2017,"action","light","medium","group","9.4","Hop across vibrant kingdoms to rescue the Princess."},
    {"Game","Hades",2020,"action","intense","medium","solo","9.3","Battle out of the Underworld in a slick rogue-like."},
    {"Game","Disco Elysium",2019,"drama","deep","long","solo","9.1","A broken detective solves a murder and his own mind."},
    {"Game","It Takes Two",2021,"action","light","medium","group","8.8","A split couple cooperates through a toy-box world."},
    {"Game","Hollow Knight",2017,"action","deep","long","solo","9.0","Descend into a haunting, ruined insect kingdom."},
    {"Game","Cyberpunk 2077",2020,"scifi","intense","long","solo","8.1","Chase immortality through a neon dystopian city."},
    {"Game","Outer Wilds",2019,"scifi","deep","medium","solo","9.2","Unravel a cosmic mystery in a 22-minute time loop."},
    {"Game","Overcooked! 2",2018,"comedy","light","short","group","8.0","Cook chaotic meals together against the clock."},
    {"Game","Animal Crossing: New Horizons",2020,"cozy","relaxed","long","group","8.5","Build a peaceful island life at your own pace."},
    {"Game","God of War Ragnarok",2022,"action","intense","long","solo","9.4","Kratos and Atreus face the end of the Nine Realms."},
    {"Game","Balatro",2024,"cozy","relaxed","short","solo","9.0","A poker-meets-roguelike deckbuilder you can't stop."},
    {"Game","Celeste",2018,"action","deep","medium","solo","9.0","Climb a mountain and your own anxiety, leap by leap."},
    {"Game","Phasmophobia",2020,"horror","intense","short","group","8.2","Hunt ghosts with friends, if your nerves can take it."},
    {"Game","Forza Horizon 5",2021,"action","relaxed","medium","group","9.0","Cruise a gorgeous open-world Mexico in any car."},
    {"Game","The Witcher 3: Wild Hunt",2015,"action","deep","long","solo","9.3","Hunt monsters and make hard choices in a war-torn land."},
    {"Game","Untitled Goose Game",2019,"comedy","light","short","any","8.0","Be a horrible goose and ruin a village's morning."},
    {"Game","Journey",2012,"cozy","relaxed","short","solo","9.0","A wordless, beautiful pilgrimage toward a mountain."},
    {"Game","Cuphead",2017,"action","intense","medium","group","8.5","A run-and-gun boss rush in 1930s cartoon style."}
};

int libSize = sizeof(library) / sizeof(library[0]);

#endif
