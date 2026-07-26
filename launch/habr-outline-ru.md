# Хабр — структура статьи

## Рабочий заголовок

Как мы учили Codex не терять цель: от обычного планировщика до координатной навигации AI-агентов

## Лид

AI-агент может выполнить десятки действий и всё равно не приблизиться к результату, который примет пользователь. Мы попытались формализовать эту проблему, создали два переносимых skill, провели серию matched-state экспериментов и получили не только локальные преимущества, но и паритет, а один тест признали невалидным.

## Структура

### 1. Проблема: activity ≠ progress

- длинные задачи;
- опциональные исследования;
- устаревшие проверки;
- функциональность ценой нарушения ограничений;
- ложное завершение.

### 2. Почему обычного плана недостаточно

План отвечает, что делать. Навигация должна отвечать, где проект находится сейчас, какой дефицит доминирует и приблизил ли последний манёвр к acceptance.

### 3. Astrolabe

- обязательства;
- evidence debt;
- proxy progress;
- research stop condition;
- smallest open required artifact.

### 4. Project Atlas

```text
P = (Delivery, Evidence, Alignment)
G = (1, 1, 1)
```

- frozen registry;
- evidence invalidation;
- non-compensable Alignment;
- movement classes;
- path length and orbit ratio;
- landing as logical AND.

### 5. Как мы тестировали

- одинаковые canonical states;
- изолированные subagents;
- frozen evaluators;
- blind mapping;
- повторения;
- запрет ручного ремонта worker outputs.

### 6. Результаты

- локальное преимущество Astrolabe в complex navigation;
- паритет в matched-state recovery;
- Atlas убрал один cross-track шаг в Evidence deficit;
- паритет в straightforward Alignment и explicit route choice;
- почему micro-recovery был признан `MEASUREMENT_INVALID`.

### 7. Интерактивный симулятор

Показать четыре сценария и одну траекторию до LANDING. Подчеркнуть, что это образовательная детерминированная модель, а не доказательство производительности LLM.

### 8. Что не доказано

- универсальное превосходство Atlas;
- достаточность трёх координат для всех задач;
- перенос результата на все модели и harnesses.

### 9. Следующий эксперимент

Hidden Consequences: два допустимых маршрута, но стоимость Evidence не сообщается агенту заранее.

### 10. Ссылки

- live demo;
- GitHub;
- experiment reports;
- Issue для независимой репликации.

## Иллюстрации

1. Hero Project Atlas.
2. Координаты D–E–A.
3. Прямая и winding траектории.
4. Таблица результатов экспериментов.
5. Скриншот live simulator.
