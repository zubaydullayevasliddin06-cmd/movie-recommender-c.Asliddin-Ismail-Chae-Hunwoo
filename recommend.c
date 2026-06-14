#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "recommend.h"
#include "titles.h"

/* Give partial credit when the time bucket is one step off. */
static int adjacentTime(const char *a, const char *b) {
    if (strcmp(a, "short") == 0  && strcmp(b, "medium") == 0) return 1;
    if (strcmp(a, "medium") == 0 && strcmp(b, "short") == 0)  return 1;
    if (strcmp(a, "medium") == 0 && strcmp(b, "long") == 0)   return 1;
    if (strcmp(a, "long") == 0   && strcmp(b, "medium") == 0) return 1;
    return 0;
}

void recommend(const char *medium, const char *genre,
               const char *timeNeed, const char *mood, const char *social) {
    int bestIndex = -1;
    double bestScore = -1.0;

    for (int i = 0; i < libSize; i++) {
        Title *cur = &library[i];
        double score = 0.0;

        if (strcmp(medium, "any") != 0) {
            if (strcmp(cur->type, medium) == 0) score += 5.0;
            else continue;
        }
        if (strcmp(cur->genre, genre) == 0) score += 6.0;
        if (strcmp(cur->mood, mood) == 0)   score += 4.0;
        if (strcmp(cur->timeNeed, timeNeed) == 0) score += 3.0;
        else if (adjacentTime(timeNeed, cur->timeNeed)) score += 1.0;
        if (strcmp(cur->social, social) == 0 || strcmp(cur->social, "any") == 0) score += 2.0;
        score += atof(cur->rating) / 10.0;

        if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
        }
    }

    const char *timePhrase = "a quick session";
    if (strcmp(timeNeed, "medium") == 0) timePhrase = "a full evening";
    else if (strcmp(timeNeed, "long") == 0) timePhrase = "a whole weekend";

    printf("\n=================================================\n");
    printf("                YOUR PERFECT MATCH\n");
    printf("=================================================\n");

    if (bestIndex == -1) {
        printf("No match found. Try again with different answers.\n");
        return;
    }

    Title *r = &library[bestIndex];
    printf(" %s   (%s, %d)\n", r->title, r->type, r->year);
    printf(" Rating: %s/10   Genre: %s   Mood: %s\n", r->rating, r->genre, r->mood);
    printf("\n %s\n", r->desc);
    printf("\n Why this? A %s pick, %s in mood, great for %s.\n", genre, mood, timePhrase);
    printf("=================================================\n");
}
