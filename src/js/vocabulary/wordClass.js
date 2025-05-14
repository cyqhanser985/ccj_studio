// 定义单词类型接口
export class Word {
  id = '';
  word = '';
  pronunciation = '';
  meaning = '';
  example = '';
  category = '';
  difficulty = 'medium'; // 'easy' | 'medium' | 'hard'
  lastReviewed = '';
  reviewCount = 0;
}

// 本地存储键
export const STORAGE_KEY = 'vocabulary_words';