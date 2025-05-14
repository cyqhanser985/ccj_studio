import { words, filteredWords } from './state.js';
import { saveWords } from './utils.js';
import { updateWordsDisplay, renderCategoryFilters } from './ui.js';

// 处理JSON文件导入
export function handleJsonImport(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const fileReader = e.target;
      if (!fileReader) return;
      const result = fileReader.result;
      if (typeof result !== 'string') {
        throw new Error('读取的文件不是文本格式');
      }
      const importedWords = JSON.parse(result);
      if (!Array.isArray(importedWords)) {
        throw new Error('导入的文件格式不正确，应为单词数组');
      }
      let validCount = 0;
      for (const word of importedWords) {
        if (typeof word === 'object' && word.word && word.meaning) {
          const wordWithId = {
            ...word,
            id: word.id || Date.now().toString() + validCount,
            reviewCount: word.reviewCount || 0
          };
          words.push(wordWithId);
          validCount++;
        }
      }
      if (validCount > 0) {
        saveWords();
        filteredWords.length = 0;
        words.forEach(w => filteredWords.push(w));
        
        // 重置分页状态
        if (window.vocabularyState) {
          window.vocabularyState.currentPage = 1;
        }
        
        updateWordsDisplay();
        renderCategoryFilters();
        alert(`成功导入 ${validCount} 个单词`);
      } else {
        alert('没有找到有效的单词数据');
      }
    } catch (error) {
      console.error('导入JSON失败:', error);
      alert('导入失败，请检查文件格式');
    }
  };
  reader.readAsText(file);
}

// 处理CSV文件导入
export function handleCsvImport(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const fileReader = e.target;
      if (!fileReader) return;
      const result = fileReader.result;
      if (typeof result !== 'string') {
        throw new Error('读取的文件不是文本格式');
      }
      const lines = result.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const wordIndex = headers.indexOf('word');
      const meaningIndex = headers.indexOf('meaning');
      if (wordIndex === -1 || meaningIndex === -1) {
        throw new Error('CSV文件必须包含word和meaning列');
      }
      const pronunciationIndex = headers.indexOf('pronunciation');
      const exampleIndex = headers.indexOf('example');
      const categoryIndex = headers.indexOf('category');
      const difficultyIndex = headers.indexOf('difficulty');
      let validCount = 0;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = line.split(',').map(v => v.trim());
        if (values.length >= Math.max(wordIndex, meaningIndex) + 1) {
          const word = values[wordIndex];
          const meaning = values[meaningIndex];
          if (word && meaning) {
            const newWord = {
              id: Date.now().toString() + validCount,
              word,
              meaning,
              reviewCount: 0,
              difficulty: 'medium'
            };
            if (pronunciationIndex !== -1 && values[pronunciationIndex]) {
              newWord.pronunciation = values[pronunciationIndex];
            }
            if (exampleIndex !== -1 && values[exampleIndex]) {
              newWord.example = values[exampleIndex];
            }
            if (categoryIndex !== -1 && values[categoryIndex]) {
              newWord.category = values[categoryIndex];
            }
            if (difficultyIndex !== -1 && ['easy', 'medium', 'hard'].includes(values[difficultyIndex])) {
              newWord.difficulty = values[difficultyIndex];
            }
            words.push(newWord);
            validCount++;
          }
        }
      }
      if (validCount > 0) {
        saveWords();
        filteredWords.length = 0;
        words.forEach(w => filteredWords.push(w));
        
        // 重置分页状态
        if (window.vocabularyState) {
          window.vocabularyState.currentPage = 1;
        }
        
        updateWordsDisplay();
        renderCategoryFilters();
        alert(`成功导入 ${validCount} 个单词`);
      } else {
        alert('没有找到有效的单词数据');
      }
    } catch (error) {
      console.error('导入CSV失败:', error);
      alert('导入失败，请检查文件格式');
    }
  };
  reader.readAsText(file);
}

// 导出为JSON
export function exportToJson() {
    if (words.length === 0) {
        alert('没有单词可以导出。');
        return;
    }
    const jsonString = JSON.stringify(words, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 导出为CSV
export function exportToCsv() {
    if (words.length === 0) {
        alert('没有单词可以导出。');
        return;
    }
    const headers = ['word', 'pronunciation', 'meaning', 'example', 'category', 'difficulty', 'lastReviewed', 'reviewCount'];
    const csvRows = [
        headers.join(','),
        ...words.map(word => {
            return headers.map(header => {
                // Ensure CSV compatibility for fields that might contain commas or quotes
                let value = word[header] === undefined || word[header] === null ? '' : String(word[header]);
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = `"${value.replace(/"/g, '""')}"`; // Escape quotes by doubling them and wrap in quotes
                }
                return value;
            }).join(',');
        })
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}