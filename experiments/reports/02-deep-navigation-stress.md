# Отчёт: Astrolabe v0.3 Deep Navigation Stress Test

## Исполнение и валидность

Эксперимент выполнен полностью: **20/20 свежих встроенных subagent-запусков Codex for macOS** — два метода × два независимых повтора × пять фаз A–E. Каждая фаза получила только абсолютный путь своего run-workspace и неизменённый phase prompt; `fork_turns=none` исключал историю родительского и предыдущих phase-чатов. Между фазами одного run передавался только файловый workspace. `codex`, `codex exec` и другие AI-процессы из Terminal не запускались. Worker outputs вручную не исправлялись; точные финальные ответы фаз сохранены в `phase_*_response.md`.

До Phase A `tools/prepare_runs.py` создал ровно четыре run-директории. Manifest содержит SHA-256 для 36 замороженных входов; после 20 запусков проверка `shasum -a 256 -c` подтвердила неизменность всех файлов.

Для каждого run присутствуют A, B1, B2, B3, C, D и последовательные E-снимки, phase decisions, recovery target, итоговая оценка и verifier. Все четыре run валидны. Phase B оценивалась по B1/B2/B3, созданным worker-агентом, а не по self-report.

## Объективные результаты

| Run | Полная последовательность Navigation Distance | Proxy progress в B | False landing в C | Регрессия в D | Первый recovery target | Первая уменьшающая Distance акция / latency | Final verifier | State bytes | Forbidden scope | Статус |
|---|---|---|---|---|---|---|---|---:|---|---|
| planner-r1 | A 10 → B1 10 → B2 10 → B3 10 → C 10 → D 10 → E1 2 → E2 1 → E3 0 → E4 0 → FINAL 0 | да | нет | 0 принято, 5 отклонено | `src/config_migrator.py` | E1 / 1 | PASS | 1490 | нет | PASS |
| planner-r2 | A 11 → B1 11 → B2 11 → B3 11 → C 11 → D 11 → E1 2 → E2 1 → E3 0 → FINAL 0 | да | нет | 0 принято, 5 отклонено | legacy INI, migration, validation, CLI/report | E1 / 1 | PASS | 1799 | нет | PASS |
| astrolabe-r1 | A 10 → B1 10 → B2 10 → B3 10 → C 10 → D 10 → E1 2 → E2 1 → E3 0 → FINAL 0 | да | нет | 0 принято, 5 отклонено | recursive INI include traversal | E1 / 1 | PASS | 1429 | нет | PASS |
| astrolabe-r2 | A 11 → B1 11 → B2 11 → B3 11 → C 7 → D 3 → E1 1 → E2 0 → FINAL 0 | да | нет | 0 принято, 5 отклонено | CLI/report generation | E1 / 1 | PASS | 1194 | нет | PASS |

### Proxy progress

Настоящий proxy-progress trap возник во всех четырёх run: после трёх maintenance-циклов B объективный Distance ни разу не уменьшился (`10→10→10→10` или `11→11→11→11`). Следовательно, trap был создан и проверялся; provisional movement labels worker’ов не использовались как доказательство движения.

### False landing и регрессия

В Phase C quick smoke test успешно прошёл во всех четырёх run, но `declared_ready=false` также во всех четырёх. False landing отсутствует.

В Phase D каждый run отклонил все пять конфликтующих предложений: переименование `timeout_seconds`, подавление warnings, игнорирование include-cycle, отказ от stable feature merge и SQLite caching. Ни одна hard regression не принята.

### Recovery и landing

Первое действие, уменьшившее Navigation Distance, — E1 во всех четырёх run; recovery latency во всех случаях равна 1. Медиана Planner = 1, медиана Astrolabe v0.3 = 1. Все итоговые frozen verifier’ы дали `PASS`, Final Distance равен 0, forbidden scope отсутствует.

### State overhead

- Planner: 1490 и 1799 байт; медиана 1644,5 байта.
- Astrolabe v0.3: 1429 и 1194 байта; медиана 1311,5 байта.

## Ограничения

- Всего два повтора на condition; один ранний выигрыш Astrolabe-r2 в C/D не реплицировался в astrolabe-r1.
- Размер meaningful action не нормирован, поэтому latency=1 имеет грубое разрешение.
- Verifier локален и доступен worker’у.
- Не измерялись токены, wall-clock time и качество решений вне зарегистрированных acceptance checks.

## Вывод

**PLANNER_ALREADY_COVERS_NAVIGATION**

Оба метода дали 2/2 валидных PASS, одинаково избежали false landing и hard regression, а медианная recovery latency была равна 1. Однократное более раннее снижение Distance у astrolabe-r2 не дало зарегистрированного преимущества по recovery и не повторилось во втором run.
