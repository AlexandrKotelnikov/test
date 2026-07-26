# LinkedIn — English launch post

I published **LLM Navigation Lab**, an open research project about keeping long-running AI agents pointed at the result a user will actually accept.

The failure mode is common: an agent can edit dozens of files, research more frameworks, refactor architecture, and still make little progress toward acceptance.

The repository contains two portable navigation skills:

- **Astrolabe** tracks required obligations and evidence debt;
- **Project Atlas** represents project state as Delivery, Evidence, and Alignment coordinates.

We compared them with a strong Planner baseline in isolated matched-state experiments. The result was more useful than a clean marketing win:

- Atlas avoided one cross-track step in both Evidence-deficit repetitions;
- a strong Planner tied the navigation skills in several other scenarios;
- one experiment was formally rejected as `MEASUREMENT_INVALID` after evaluator defects were discovered;
- no universal superiority claim is supported yet.

The repository now includes an interactive simulator where you can choose a maneuver and see it classified as APPROACH, EVIDENCE, ALIGNMENT_RECOVERY, CROSS_TRACK, RETREAT, or LANDING.

Live demo: https://alexandrkotelnikov.github.io/llm-navigation-lab/

GitHub: https://github.com/AlexandrKotelnikov/llm-navigation-lab

What real-world agent drift scenario should we test next?

#AIAgents #AgenticAI #LLM #AIEvaluation #OpenSource
