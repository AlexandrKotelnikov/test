# Matched-State Recovery Test

Дата: 2026-07-20

## Итог

Зафиксированный вывод: **PLANNER_ALREADY_COVERS_NAVIGATION**.

Оба метода завершили 4/4 валидных runs с `PASS`, агрегатная медиана составила 5.5 micro-steps для обоих методов, суммарное число `ZERO` одинаково (2), hard-constraint regressions и `RETREAT` отсутствуют. Различие на `state-P` (медиана 7 у Planner и 8 у Astrolabe v0.3) меньше двух шагов и 20%, а на `state-A` результаты совпали.

## Валидность исходных состояний

Balanced crossover использовал два canonical states:

- `state-P` — product workspace из Planner D-snapshot;
- `state-A` — product workspace из Astrolabe D-snapshot.

Перед workers все копии внутри каждой canonical-state группы были побайтово одинаковы после исключения только condition metadata.

## Измерительная инфраструктура

До первого worker был создан и заморожен acceptance contract с 16 явными items. Исправления evaluator включали:

- отсутствие скрытого требования диаграммы;
- test count из фактического `unittest discover`;
- read-only scorer и verifier;
- непересекающийся приоритет `RETREAT → APPROACH → EVIDENCE → ZERO`.

## Результаты

### `state-P`

| Method | PASS | Median steps | Total ZERO | Movement accuracy | Reopened |
|---|---:|---:|---:|---:|---:|
| Planner | 2/2 | 7 | 2 | 100% | 0 |
| Astrolabe v0.3 | 2/2 | 8 | 2 | 93.75% | 1 |

### `state-A`

| Method | PASS | Median steps | Total ZERO | Movement accuracy | Reopened |
|---|---:|---:|---:|---:|---:|
| Planner | 2/2 | 4 | 0 | 100% | 0 |
| Astrolabe v0.3 | 2/2 | 4 | 0 | 100% | 0 |

## Агрегат

| Method | PASS | Median steps | Total steps | ZERO | Movement accuracy | Reopened |
|---|---:|---:|---:|---:|---:|---:|
| Planner | 4/4 | 5.5 | 22 | 2 | 100% | 0 |
| Astrolabe v0.3 | 4/4 | 5.5 | 24 | 2 | 95.83% | 1 |

Оба метода имеют одинаковую медиану steps и ZERO. Все runs завершились без hard-scope breach, forbidden scope, неверного target selection или post-landing changes.

## Blind evaluation

8/8 label-free cases получили Navigation Distance 0, все registered checks, hard scope и final verifier `PASS`.
