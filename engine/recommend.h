#ifndef RECOMMEND_H
#define RECOMMEND_H

/* The "menu" of what main.c is allowed to call. main.c never needs to know what
   a Title looks like — it just hands over the 5 answers and gets a result. */

/* Number of titles in the library (defined in titles.h). */
extern int libSize;

/* Interactive mode: pick the best match for the given answers and print a
   friendly, human-readable result to the screen. */
void recommend(const char *medium, const char *genre, const char *timeNeed,
               const char *mood, const char *social);

/* Engine mode: same pick, but print the result as ONE line of JSON, so another
   program (our Node server) can read and parse it. */
void recommendJson(const char *medium, const char *genre, const char *timeNeed,
                   const char *mood, const char *social);

#endif /* RECOMMEND_H */
