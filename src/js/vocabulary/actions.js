import { words, filteredWords, currentFilter, searchTerm, currentPage, pageSize } from './state.js';
import { saveWords, queryDictionary } from './utils.js';
import { updateWordsDisplay, renderCategoryFilters, updateCategoryFilterUI } from './ui.js';

// 添加新单词
export function addWord(newWordData) {
  const word = {
    ...newWordData,
    id: Date.now().toString(),
    reviewCount: 0,
  };
  words.unshift(word);
  saveWords();
  applyFilters(currentFilter, searchTerm); // Apply current filters to see if the new word should be visible
  renderCategoryFilters(); // Re-render filters in case a new category was added
}

// 删除单词
export function deleteWord(id) {
  if (confirm('确定要删除这个单词吗？')) {
    const index = words.findIndex(word => word.id === id);
    if (index > -1) {
      words.splice(index, 1);
      saveWords();
      applyFilters(currentFilter, searchTerm);
      renderCategoryFilters();
    }
  }
}

// 应用过滤器
export function applyFilters(filterCategory, currentSearchTerm) {
  let result = [...words]; // Start with all words

  // Filter by search term
  if (currentSearchTerm && currentSearchTerm.trim() !== '') {
    const lowerSearchTerm = currentSearchTerm.toLowerCase();
    result = result.filter(word => 
      word.word.toLowerCase().includes(lowerSearchTerm) ||
      word.meaning.toLowerCase().includes(lowerSearchTerm)
    );
  }
  
  // Filter by category
  if (filterCategory && filterCategory !== 'all') {
    result = result.filter(word => word.category === filterCategory);
  }

  // Update the global filteredWords state
  filteredWords.length = 0; // Clear array
  result.forEach(item => filteredWords.push(item));
  
  // 使用window全局状态而不是直接修改导入的变量
  if (window.vocabularyState) {
    window.vocabularyState.currentFilter = filterCategory;
    window.vocabularyState.searchTerm = currentSearchTerm;
    window.vocabularyState.currentPage = 1; // 重置为第一页
  }
  
  updateWordsDisplay();
  updateCategoryFilterUI(filterCategory); // Ensure button styles are correct
}

export function handleAddWordFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (!form) return;
    
    const formData = new FormData(form);
    const newWordData = {
        word: formData.get('word') ? formData.get('word').toString().trim() : '',
        pronunciation: formData.get('pronunciation') ? formData.get('pronunciation').toString().trim() : '',
        meaning: formData.get('meaning') ? formData.get('meaning').toString().trim() : '',
        example: formData.get('example') ? formData.get('example').toString().trim() : '',
        category: formData.get('category') ? formData.get('category').toString().trim() : '',
        difficulty: formData.get('difficulty') ? formData.get('difficulty').toString() : 'medium',
    };

    if (!newWordData.word || !newWordData.meaning) {
        alert('单词和释义不能为空');
        return;
    }
    addWord(newWordData);
    form.reset();
}

export function handleUseDictionaryChange(event) {
    const checkbox = event.target;
    if (!checkbox) return;
    
    if (window.vocabularyState) {
        window.vocabularyState.useDictionary = checkbox.checked;
    }
    
    if (checkbox.checked) {
        const wordInput = document.getElementById('word');
        if (wordInput && wordInput.value.trim()) {
            queryDictionary(wordInput.value.trim());
        }
    }
}

export function handleWordInputBlur(event) {
    if (!event.target) return;
    
    const wordValue = event.target.value.trim();
    if (!wordValue) return;
    
    const useDictionary = window.vocabularyState?.useDictionary || 
                         document.getElementById('use-dictionary')?.checked;
                         
    if (useDictionary) {
        queryDictionary(wordValue);
    }
}

export function handleSearchInput(event) {
    if (!event.target) return;
    
    const newSearchTerm = event.target.value;
    applyFilters(window.vocabularyState?.currentFilter || currentFilter, newSearchTerm);
}

export function handlePrevPage() {
    const currentPageValue = window.vocabularyState?.currentPage || currentPage;
    if (currentPageValue > 1) {
        if (window.vocabularyState) {
            window.vocabularyState.currentPage = currentPageValue - 1;
        }
        updateWordsDisplay();
    }
}

export function handleNextPage() {
    const currentPageValue = window.vocabularyState?.currentPage || currentPage;
    const totalPages = Math.ceil(filteredWords.length / pageSize);
    if (currentPageValue < totalPages) {
        if (window.vocabularyState) {
            window.vocabularyState.currentPage = currentPageValue + 1;
        }
        updateWordsDisplay();
    }
}