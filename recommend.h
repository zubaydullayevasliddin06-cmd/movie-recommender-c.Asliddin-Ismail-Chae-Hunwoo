#ifndef RECOMMEND_H
#define RECOMMEND_H

/* Number of titles in the library (defined in titles.h, used for the intro). */
extern int libSize;

/* Find the best-matching title for the 5 answers and print the result card. */
void recommend(const char *medium, const char *genre,
               const char *timeNeed, const char *mood, const char *social);

#endif
