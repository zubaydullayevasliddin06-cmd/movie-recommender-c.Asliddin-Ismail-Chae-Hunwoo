#include <stdio.h>
#include <string.h>
#include <stdlib.h>   /* atof */
#include "titles.h"
#include "recommend.h"

/* ---- Scoring weights (the rules live here, in one obvious place). ----
   See docs/VISION.md for what the product does; these match the README table. */
#define PTS_GENRE      6
#define PTS_MEDIUM     5
#define PTS_MOOD       4
#define PTS_TIME_EXACT 3
#define PTS_TIME_ADJ   1
#define PTS_SOCIAL     2

/* Put the three lengths on a line: short(0) < medium(1) < long(2).
   Returns -1 for an unknown value. */
static int timeRank(const char *t) {
    if (strcmp(t, "short")  == 0) return 0;
    if (strcmp(t, "medium") == 0) return 1;
    if (strcmp(t, "long")   == 0) return 2;
    return -1;
}

/* How well one title fits the user's answers. Higher is better. */
static double scoreTitle(const Title *t, const char *medium, const char *genre,
                         const char *timeNeed, const char *mood, const char *social) {
    double score = 0.0;

    /* Medium: if the user chose a specific one, a match earns points.
       (When they chose "any", medium doesn't add or remove points.) */
    if (strcmp(medium, "any") != 0 && strcmp(t->type, medium) == 0)
        score += PTS_MEDIUM;

    if (strcmp(t->genre, genre) == 0) score += PTS_GENRE;
    if (strcmp(t->mood,  mood)  == 0) score += PTS_MOOD;

    /* Time: an exact length is best; a neighbouring length still helps a little. */
    int userTime  = timeRank(timeNeed);
    int titleTime = timeRank(t->timeNeed);
    if (userTime >= 0 && titleTime >= 0) {
        int gap = userTime - titleTime;
        if (gap == 0)                 score += PTS_TIME_EXACT;
        else if (gap == 1 || gap == -1) score += PTS_TIME_ADJ;
    }

    /* Social: a direct match, or a title that fits "any" group size. */
    if (strcmp(t->social, social) == 0 || strcmp(t->social, "any") == 0)
        score += PTS_SOCIAL;

    /* Rating breaks ties (e.g. "8.7" -> +0.87). */
    score += atof(t->rating) / 10.0;

    return score;
}

/* Find the highest-scoring title. If the user picked a specific medium, titles
   of the other type are skipped entirely. Returns NULL if nothing qualifies. */
static const Title *pickBest(const char *medium, const char *genre,
                             const char *timeNeed, const char *mood,
                             const char *social) {
    const Title *best = NULL;
    double bestScore = -1.0;

    for (int i = 0; i < libSize; i++) {
        const Title *t = &library[i];

        if (strcmp(medium, "any") != 0 && strcmp(t->type, medium) != 0)
            continue;   /* wrong medium -> skip entirely */

        double s = scoreTitle(t, medium, genre, timeNeed, mood, social);
        if (s > bestScore) {
            bestScore = s;
            best = t;
        }
    }
    return best;
}

void recommend(const char *medium, const char *genre, const char *timeNeed,
               const char *mood, const char *social) {
    const Title *t = pickBest(medium, genre, timeNeed, mood, social);
    if (!t) {
        printf("\nSorry, no match found.\n");
        return;
    }
    printf("\n=================================================\n");
    printf("  YOUR MATCH:  %s  (%s, %d)\n", t->title, t->type, t->year);
    printf("=================================================\n");
    printf("  Genre: %s   Mood: %s   Rating: %s\n", t->genre, t->mood, t->rating);
    printf("  %s\n", t->desc);
    printf("=================================================\n");
}

/* Print a string as a JSON value, escaping the characters JSON requires. */
static void printJsonString(const char *s) {
    putchar('"');
    for (const char *p = s; *p; p++) {
        switch (*p) {
            case '"':  fputs("\\\"", stdout); break;
            case '\\': fputs("\\\\", stdout); break;
            case '\n': fputs("\\n", stdout);  break;
            case '\r': fputs("\\r", stdout);  break;
            case '\t': fputs("\\t", stdout);  break;
            default:   putchar(*p);           break;
        }
    }
    putchar('"');
}

void recommendJson(const char *medium, const char *genre, const char *timeNeed,
                   const char *mood, const char *social) {
    const Title *t = pickBest(medium, genre, timeNeed, mood, social);
    if (!t) {
        printf("{\"found\":false}\n");
        return;
    }
    /* One line of JSON so the Node server can parse it with JSON.parse(). */
    printf("{");
    printf("\"found\":true,");
    printf("\"type\":");     printJsonString(t->type);     printf(",");
    printf("\"title\":");    printJsonString(t->title);    printf(",");
    printf("\"year\":%d,", t->year);
    printf("\"genre\":");    printJsonString(t->genre);    printf(",");
    printf("\"mood\":");     printJsonString(t->mood);     printf(",");
    printf("\"timeNeed\":"); printJsonString(t->timeNeed); printf(",");
    printf("\"social\":");   printJsonString(t->social);   printf(",");
    printf("\"rating\":");   printJsonString(t->rating);   printf(",");
    printf("\"desc\":");     printJsonString(t->desc);
    printf("}\n");
}
