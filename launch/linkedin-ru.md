# LinkedIn — Russian launch post

Я опубликовал **LLM Navigation Lab** — открытый исследовательский проект о том, как удерживать AI-агентов на пути к результату во время длинных задач.

Проблема простая: агент может изменить десятки файлов, провести исследование, улучшить архитектуру и всё равно почти не приблизиться к тому, что примет пользователь.

В проекте два переносимых skill:

- **Astrolabe** отслеживает обязательства и доказательства;
- **Project Atlas** описывает состояние проекта в координатах Delivery, Evidence и Alignment.

Мы сравнили их с сильным Planner baseline в серии изолированных экспериментов. Результат оказался полезнее красивой «победы»:

- Atlas дважды избежал одного лишнего cross-track шага в Evidence-deficit сценарии;
- в нескольких других сценариях обычный Planner показал паритет;
- один эксперимент мы официально признали `MEASUREMENT_INVALID` из-за дефектов evaluator;
- универсальное превосходство нового подхода пока не доказано.

Теперь в репозитории есть интерактивный симулятор: можно выбрать следующий манёвр и увидеть, стал ли он APPROACH, EVIDENCE, ALIGNMENT_RECOVERY, CROSS_TRACK, RETREAT или LANDING.

Live demo: https://alexandrkotelnikov.github.io/llm-navigation-lab/

GitHub: https://github.com/AlexandrKotelnikov/llm-navigation-lab

Какой реальный сценарий потери цели AI-агентом стоит проверить следующим?

#AIAgents #AgenticAI #LLM #AIEvaluation #OpenSource #Codex
