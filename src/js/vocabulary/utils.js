import { STORAGE_KEY } from './wordClass.js'; 
import { words, filteredWords, currentFilter, searchTerm, currentPage, pageSize } from './state.js';
import { updateTotalCount, updatePaginationButtons } from './ui.js';

// 从本地存储加载单词
export function loadWords() {
  try {
    const storedWords = localStorage.getItem(STORAGE_KEY);
    words.length = 0; // Clear the array before loading
    const parsedWords = storedWords ? JSON.parse(storedWords) : [];
    parsedWords.forEach(word => words.push(word));
    // filteredWords should be updated after loading words, typically by calling applyFilters or similar
  } catch (error) {
    console.error('加载单词失败:', error);
    words.length = 0;
  }
}

// 保存单词到本地存储
export function saveWords() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch (error) {
    console.error('保存单词失败:', error);
    alert('保存单词失败，请检查浏览器存储空间');
  }
}

// 获取所有唯一分类
export function getUniqueCategories() {
  const categories = words
    .map(word => word.category)
    .filter((category) => 
      category !== undefined && category.trim() !== ''
    );
  return [...new Set(categories)];
}

// 使用Web Speech API播放单词发音
export function playWordAudio(word) {
  const hasOfflinePronunciation = localStorage.getItem('offline_pronunciation_available') === 'true';
  if (hasOfflinePronunciation) {
    console.log('使用离线发音包播放:', word);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  } else if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

// 查询词典API
export async function queryDictionary(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!response.ok) {
      throw new Error('无法获取单词释义');
    }
    const data = await response.json();
    if (data && data.length > 0) {
      let meanings = [];
      let examples = [];
      for (const entry of data) {
        for (const meaning of entry.meanings) {
          for (const definition of meaning.definitions) {
            meanings.push(`${meaning.partOfSpeech}: ${definition.definition}`);
            if (definition.example) {
              examples.push(definition.example);
            }
          }
        }
      }
      
      const meaningTextarea = document.getElementById('meaning');
      if (meaningTextarea && meanings.length > 0) {
        meaningTextarea.value = meanings.slice(0, 3).join('\n');
      }
      
      const exampleTextarea = document.getElementById('example');
      if (exampleTextarea && examples.length > 0) {
        exampleTextarea.value = examples[0];
      }
      
      if (data[0].phonetics && data[0].phonetics.length > 0) {
        const phoneticData = data[0].phonetics.find(p => p.text);
        const phonetic = phoneticData ? phoneticData.text : null;
        if (phonetic) {
          const pronunciationInput = document.getElementById('pronunciation');
          if (pronunciationInput) {
            pronunciationInput.value = phonetic;
          }
        }
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('查询词典失败:', error);
    return false;
  }
}