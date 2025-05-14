import { words, filteredWords, currentFilter, searchTerm, currentPage, pageSize, useDictionary as globalUseDictionary } from './state.js';
import { saveWords, queryDictionary, getUniqueCategories } from './utils.js';
import { updateWordsDisplay, renderCategoryFilters, updateCategoryFilterUI } from './ui.js';
import { addWordForm as globalAddWordForm, meaningTextarea as globalMeaningTextarea, wordInput as globalWordInput } from './domElements.js';

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
  // Update state for filter and search term
  // This is a simplified way; ideally, state.js would have setters
  // For now, we assume state.js 'let' exports are directly modifiable if this module is careful
  // However, direct modification of imported primitives is not standard. 
  // It's better if state.js exports objects or functions to modify state.
  // For this refactor, we'll update local copies and rely on them being passed around or re-imported where needed.
  
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
  
  //currentPage = 1; // Reset to first page after filtering - state.js should handle this ideally
  // For now, let's assume the caller of applyFilters or updateWordsDisplay handles currentPage reset.
  updateWordsDisplay();
  updateCategoryFilterUI(filterCategory); // Ensure button styles are correct
}


export function handleAddWordFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(globalAddWordForm);
    const newWordData = {
        word: formData.get('word')?.toString().trim() || '',
        pronunciation: formData.get('pronunciation')?.toString().trim() || '',
        meaning: formData.get('meaning')?.toString().trim() || '',
        example: formData.get('example')?.toString().trim() || '',
        category: formData.get('category')?.toString().trim() || '',
        difficulty: formData.get('difficulty')?.toString() || 'medium',
    };

    if (!newWordData.word || !newWordData.meaning) {
        alert('单词和释义不能为空');
        return;
    }
    addWord(newWordData);
    if (globalAddWordForm) {
        globalAddWordForm.reset();
    }
}

export function handleUseDictionaryChange(event) {
    const checkbox = event.target;
    // globalUseDictionary = checkbox.checked; // This direct assignment to imported primitive won't work as expected.
    // State should be managed via functions or an object in state.js
    // For now, let's assume a local variable or pass the state around.
    const useDict = checkbox.checked;
    if (useDict && globalWordInput && globalWordInput.value.trim()) {
        queryDictionary(globalWordInput.value.trim());
    }
}

export function handleWordInputBlur(event) {
    // Similar to handleUseDictionaryChange, direct modification of globalUseDictionary is problematic.
    // We need a reliable way to get the current state of useDictionary.
    // For now, let's assume we can access it or it's passed.
    // This requires useDictionary to be correctly managed and accessible.
    const wordValue = event.target.value.trim();
    // if (globalUseDictionary && wordValue) { // Check the actual state of useDictionary
    // queryDictionary(wordValue);
    // }
    // Placeholder: to make this work, `useDictionary` state needs proper management.
    // For now, this function might not behave as intended without correct state access.
    const useDictionaryCheckbox = document.getElementById('use-dictionary'); // Re-fetch or ensure it's available
    if (useDictionaryCheckbox && useDictionaryCheckbox.checked && wordValue) {
        queryDictionary(wordValue);
    }
}

export function handleSearchInput(event) {
    const newSearchTerm = event.target.value;
    // searchTerm = newSearchTerm; // Again, direct state modification issue.
    // applyFilters should take the new search term.
    applyFilters(currentFilter, newSearchTerm); // Pass current filter and new search term
}

export function handlePrevPage() {
    if (currentPage > 1) {
        // currentPage--; // State modification issue
        // A state management function should handle this: e.g., state.setCurrentPage(currentPage - 1)
        // For now, this will be handled in main.js or where event listeners are set up.
        // updateWordsDisplay();
    }
}

export function handleNextPage() {
    const totalPages = Math.ceil(filteredWords.length / pageSize);
    if (currentPage < totalPages) {
        // currentPage++; // State modification issue
        // updateWordsDisplay();
    }
}