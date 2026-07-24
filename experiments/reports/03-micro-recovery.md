# Astrolabe v0.3 Deep Navigation Stress Test — Micro-Recovery Phase E

Дата дополнительного прогона: 2026-07-20  
Фиксированный итог: **MEASUREMENT_INVALID**

## Краткий итог

Все четыре свежих subagent-run достигли Navigation Distance 0 и получили `PASS` frozen final verifier. Blind re-evaluation на временных копиях также дала Distance 0, все checks `true`, отсутствие forbidden scope и verifier `PASS` для 4/4 случаев.

Сырые траектории формально удовлетворяют численным предикатам `ASTROLABE_ADVANTAGE`: медиана циклов Astrolabe равна 12.5 против 39.5 у Planner, audited `ZERO` — 15 против 60 суммарно, регрессий нет, а медианный state overhead Astrolabe ниже. Этот вывод нельзя принимать как валидный сравнительный результат, потому что frozen evaluator и movement-разметка искажали измеряемые циклы.

## Замороженные исходные состояния

Оригинальные D-снимки не изменены. Перед запуском каждая рабочая папка была точной content-addressed копией D-снимка; после эксперимента исходные hashes совпали с зафиксированными значениями.

## Audited results

| Run | Cycles | A | E | Z | R | Avg Δ/cycle | Verifier | State bytes |
|---|---:|---:|---:|---:|---:|---:|---|---:|
| planner-r1 | 43 | 9 | 0 | 34 | 0 | 0.232558 | PASS | 1652 |
| planner-r2 | 36 | 10 | 0 | 26 | 0 | 0.305556 | PASS | 1645 |
| astrolabe-r1 | 22 | 3 | 4 | 15 | 0 | 0.454545 | PASS | 1429 |
| astrolabe-r2 | 3 | 0 | 3 | 0 | 0 | 1.000000 | PASS | 1194 |

Ни один check не был повторно открыт. Все 104 micro-step snapshots присутствуют, manifests и hashes прошли аудит, а после landing изменений product files или navigation state нет.

## Почему измерение невалидно

1. `A12_html_report` требовал скрытый chart-маркер, которого не было в user task.
2. `A13_test_count` считал только top-level `def test_`, игнорируя валидные `unittest.TestCase` methods.
3. Planner result JSON содержал десятки неверных movement labels.
4. Доступ к evaluator был предоставлен неравномерно: трём агентам поздно, одному с первого шага.
5. Определения `APPROACH` и `EVIDENCE` пересекались.

Эти дефекты выполняют фиксированный предикат `MEASUREMENT_INVALID`. Численное преимущество Astrolabe остаётся описательной аномалией, а не допустимым причинным выводом.

## Blind final evaluation

Для всех четырёх cases:

- Navigation Distance: 0;
- all evaluator checks: true;
- forbidden scope: 0;
- frozen final verifier: PASS.

Эксперимент остановлен после создания отчёта; worker product files не ремонтировались вручную.
