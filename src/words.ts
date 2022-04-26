export const crazy_word_list = [
  "uncanny",
  "zany",
  "wacky",
  "goofy",
  "comical",
  "eccentric",
  "goofy",
  "loony",
  "funny",
  "weird",
  "strange",
  "odd",
];

export const cool_word_list = [
  "remarkable",
  "groovy",
  "unique",
  "fantastic",
  "fortuitous",
  "incredible",
  "marvelous",
  "wonderful",
  "groovy",
  "spectacular",
  "marvelous",
  "astonishing",
  "wonderful",
  "excellent",
  "incredible",
];

export const gen_crazy_word = () => {
  const min = 0;
  const max = crazy_word_list.length - 1;
  const random_number = Math.floor(Math.random() * (max - min) + min);
  return crazy_word_list[random_number];
};

export const gen_cool_word = () => {
  const min = 0;
  const max = cool_word_list.length - 1;
  const random_number = Math.floor(Math.random() * (max - min) + min);
  return cool_word_list[random_number];
};
