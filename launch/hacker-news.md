# Hacker News submission

## Title

Show HN: Project Atlas – coordinate navigation for long-running AI agents

## Text

I built a small zero-dependency simulator and two portable Markdown skills for a narrow agent problem: distinguishing real progress from activity during long-running tasks.

Project Atlas represents project state as Delivery, Evidence, and Alignment, then classifies bounded actions as approach, evidence work, alignment recovery, cross-track, retreat, or landing. Astrolabe uses a lighter obligation-and-evidence model.

I tested both against a strong Planner baseline in isolated matched-state runs. The results are intentionally mixed: Atlas removed one cross-track step in an Evidence-deficit state, several other tests ended in parity, and one experiment was rejected as measurement-invalid after evaluator flaws were found.

The simulator is here:
https://alexandrkotelnikov.github.io/llm-navigation-lab/

Source, skills, and full reports:
https://github.com/AlexandrKotelnikov/llm-navigation-lab

I am especially interested in criticism of the coordinate model and examples where a different axis is necessary.

## Launch note

Submit only after the live demo opens without authentication. Do not coordinate votes or ask people to upvote.
