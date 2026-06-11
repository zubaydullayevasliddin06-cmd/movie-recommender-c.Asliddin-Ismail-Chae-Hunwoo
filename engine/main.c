#include <stdio.h>
#include "recommend.h"

/* Ask one question, print numbered options, return the 0-based choice. */
static int ask(const char *question, const char *opts[], int n) {
    int choice = 0;
    printf("\n%s\n", question);
    for (int i = 0; i < n; i++) printf("   %d) %s\n", i + 1, opts[i]);
    printf("Your choice (1-%d): ", n);
    if (scanf("%d", &choice) != 1) {
        int c;
        while ((c = getchar()) != '\n' && c != EOF) { }
        choice = 1;
    }
    if (choice < 1 || choice > n) choice = 1;
    return choice - 1;
}

int main(int argc, char **argv) {
    /* Engine mode: the Node server calls this program as
         cinematch <medium> <genre> <time> <mood> <social>
       It prints ONE line of JSON and exits (no questions asked). */
    if (argc == 6) {
        recommendJson(argv[1], argv[2], argv[3], argv[4], argv[5]);
        return 0;
    }

    /* Otherwise: the normal interactive console quiz. */
    printf("=================================================\n");
    printf("         CINEMATCH  -  Movie & Game AI\n");
    printf("   Stop scrolling. Start watching - or playing.\n");
    printf("=================================================\n");
    printf("Answer 5 questions and I'll pick your match\n");
    printf("from a library of %d titles.\n", libSize);

    const char *mediumOpts[] = {"A Movie", "A Game", "Surprise Me"};
    const char *mediumVal[]  = {"Movie", "Game", "any"};
    int m = ask("1. Movie or game tonight?", mediumOpts, 3);

    const char *genreOpts[] = {"Action / Thrills","Comedy / Fun","Sci-Fi / Fantasy","Drama / Story","Horror / Mystery","Cozy / Chill"};
    const char *genreVal[]  = {"action","comedy","scifi","drama","horror","cozy"};
    int g = ask("2. Pick your vibe.", genreOpts, 6);

    const char *timeOpts[] = {"Under 2 hours","A full evening","All weekend"};
    const char *timeVal[]  = {"short","medium","long"};
    int t = ask("3. How much time do you have?", timeOpts, 3);

    const char *moodOpts[] = {"Intense","Light","Thoughtful","Relaxed"};
    const char *moodVal[]  = {"intense","light","deep","relaxed"};
    int mo = ask("4. What's the mood?", moodOpts, 4);

    const char *socOpts[] = {"Just me","With others"};
    const char *socVal[]  = {"solo","group"};
    int s = ask("5. Flying solo?", socOpts, 2);

    recommend(mediumVal[m], genreVal[g], timeVal[t], moodVal[mo], socVal[s]);
    return 0;
}
