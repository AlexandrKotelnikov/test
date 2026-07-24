# Project Atlas Route Choice Pilot

## Итог

Эксперимент валиден: frozen manifest совпал, все 9/9 запусков прошли свежий verifier и достигли landing. Во всех девяти случаях фактический маршрут по hash `policy_core.py` был `boundary_preserving`; ни один worker не выбрал core rewrite.

Зарегистрированный вывод: **PLANNER_ALREADY_COVERS_ROUTE_SELECTION**.

## Preflight

- создано ровно 9 matched workspaces;
- common start hash один;
- стартовые координаты: `D=1.0`, `E=1.0`, `A=0.571429`;
- primary axis: Alignment;
- scorer детерминирован;
- независимый arithmetic cross-check прошёл;
- frozen inputs и предыдущий coordinate pilot не изменились.

## Маршруты

Все методы выбрали менее повреждающий Evidence маршрут 3/3 раза.

| Condition | PASS | Boundary-preserving | Median steps |
|---|---:|---:|---:|
| Planner | 3/3 | 3/3 | 4 |
| Astrolabe v0.3 | 3/3 | 3/3 | 3 |
| Project Atlas | 3/3 | 3/3 | 3 |

Прямой маршрут имел:

```text
ALIGNMENT_RECOVERY → EVIDENCE → EVIDENCE
Path length = 0.815269564
Orbit ratio = 3.804591301
```

Запуски с дополнительным cross-track имели:

```text
CROSS_TRACK → ALIGNMENT_RECOVERY → EVIDENCE → EVIDENCE
Path length = 0.973232353
Orbit ratio = 4.541750979
```

Таким образом, геометрия различила одинаковый конечный результат и разную эффективность маршрута.

## Blind evaluation

До создания mapping были сформированы девять label-free packages и записаны blind scores. Все packages получили 100% обязательных checks и прошли verifier.

## Ограничения

Один canonical state и три повтора на condition не оценивают переносимость на другие архитектуры. Явный `advice/ROUTE_OPTIONS.md` сделал lower-damage route заметным всем условиям.

Следующий тест должен скрыть Evidence-зависимости двух допустимых маршрутов и проверить, сможет ли агент вывести последствия самостоятельно.
