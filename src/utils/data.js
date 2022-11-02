const now = new Date();

const start = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  now.getMinutes()
);

const end = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours() + 1,
  now.getMinutes()
);

export const lives = [
  {
    start: start, //"2022-03-29T20:30:00",
    end: end, //"2022-03-29T21:40:00",
    questions: [
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes()
        ), //"2022-03-29T20:34:43",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 1
        ), // "2022-03-29T20:37:17",
        correct: 2,
        answers: [
          "ПОВЕЛИТЕЛЬНИЦА ОГНЯ",
          "ВЫПОЛНЯЕТ ГИМНАСТИЧЕСКИЕ ТРЮКИ",
          "ЗАКЛИНАТЕЛЬНИЦА ЗМЕЙ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 2
        ), //"2022-03-29T20:41:09",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 3
        ), //"2022-03-29T20:43:21",
        correct: 1,
        answers: [
          "ОБЛАДАЕТ ФАНТАСТИЧЕСКОЙ ПАМЯТЬЮ",
          "РЕКОРДСМЕНКА ПО СТОЯНИЮ НА ГОЛОВЕ",
          "ОБЫЧНЫЙ РЕБЕНОК",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 4
        ), //"2022-03-29T20:47:11",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 5
        ), //"2022-03-29T20:49:15",
        correct: 3,
        answers: [
          "ЗНАЕТ ВСЕ ПРАВИЛА ЭТИКЕТА",
          "САМЫЙ ЮНЫЙ РЕФЕРИ БОКСЁРСКИХ ПОЕДИНКОВ",
          "ПОТРЯСАЮЩЕ ПОЕТ ПЕСНИ ИЗ КИНОФИЛЬМОВ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 6
        ), //"2022-03-29T20:52:04",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 7
        ), //"2022-03-29T20:53:58",
        correct: 2,
        answers: [
          "РЕКОРДСМЕНКА ПО ПРЫЖКАМ НА СКАКАЛКЕ",
          "РАЗБИРАЕТСЯ В ЭЛЕКТРИЧЕСТВЕ НЕ ХУЖЕ ЭЛЕКТРИКОВ",
          "РАЗВОДИТ СВЕТЛЯЧКОВ В ДОМАШНИХ УСЛОВИЯХ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 8
        ), //"2022-03-29T20:58:33",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 9
        ), //"2022-03-29T21:01:02",
        correct: 2,
        answers: [
          "ЗНАЕТ ВСЁ О ЖИВОТНЫХ",
          "РЕКОРДСМЕН ПО ПОЕДАНИЮ МАРМЕЛАДНЫХ МИШЕК",
          "ХОДИТ НА РУКАХ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 10
        ), //"2022-03-29T21:05:10",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 11
        ), //"2022-03-29T21:06:52",
        correct: 2,
        answers: [
          "ЧЕМПИОН ПО СКОРОСТИ НАБИВАНИЯ ТЕКСТА",
          "ЮНЫЙ СТЕНДАП-КОМИК",
          "ЧЁТКО ТАНЦУЕТ ЧЕЧЁТКУ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 12
        ), //"2022-03-29T21:11:25",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 13
        ), //"2022-03-29T21:13:11",
        correct: 1,
        answers: [
          "ВИРТУОЗНО ИГРАЕТ НА БАРАБАНАХ",
          "ЧЕМПИОНКА РОССИИ ПО ЧИРЛИДИНГУ",
          "ФИГУРИСТКА НА РОЛИКАХ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 14
        ), //"2022-03-29T21:16:03",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 15
        ), //"2022-03-29T21:18:14",
        correct: 2,
        answers: [
          "САМ ШЬЁТ СЕБЕ ОДЕЖДУ",
          "ДЕЛАЕТ УНИКАЛЬНЫЕ ВЕЩИ ИЗ ПЛАСТИЛИНА",
          "МОЖЕТ СТОЯТЬ В ПЛАНКЕ БЕСКОНЕЧНО ДОЛГО",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 16
        ), //"2022-03-29T21:22:05",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 17
        ), //"2022-03-29T21:23:54",
        correct: 2,
        answers: [
          "РИСУЕТ ГРАФФИТИ С 5 ЛЕТ",
          "ТАНЦУЕТ МЕЛЬБУРН ШАФФЛ",
          "САМАЯ ЮНАЯ УЧАСТНИЦА DJ-БАТТЛОВ",
        ],
      },
      {
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 18
        ), //"2022-03-29T21:28:12",
        end: new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + 19
        ), //"2022-03-29T21:31:04",
        correct: 3,
        answers: [
          "ЧЕМПИОН ПО ИГРЕ НА НЕВИДИМОЙ ГИТАРЕ",
          "ГОНЯЕТ НА БАЙКЕ СТОЯ",
          "ОТВЕТИТ НА ЛЮБОЙ ВОПРОС ЕГЭ ПО ИСТОРИИ",
        ],
      },
    ],
  },
];
