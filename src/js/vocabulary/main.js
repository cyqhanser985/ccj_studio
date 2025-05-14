import { loadWords, queryDictionary, playWordAudio } from './utils.js';
import { renderCategoryFilters, updateWordsDisplay, updateCategoryFilterUI } from './ui.js';
import {
  addWord,
  deleteWord,
  applyFilters,
  handleAddWordFormSubmit,
  handleUseDictionaryChange,
  handleWordInputBlur,
  handleSearchInput
} from './actions.js';
import {
  startLearningMode,
  closeLearningMode,
  toggleMeaning,
  nextWord,
  loadCurrentWord
} from './learningMode.js';
import { handleJsonImport, handleCsvImport, exportToJson, exportToCsv } from './importExport.js';
import {
  addWordForm,
  searchInput,
  prevPageBtn,
  nextPageBtn,
  useDictionaryCheckbox,
  wordInput,
  importJsonInput,
  importCsvInput,
  downloadPronunciationBtn, // Assuming this element exists and is needed
  startLearningBtn,
  closeLearningBtn,
  showMeaningBtn,
  nextWordBtn,
  playAudioBtn, // Assuming this element exists and is needed
  exportJsonBtn,
  exportCsvBtn,
  categoryFilterSelect // For learning mode category filter
} from './domElements.js';
import { words, filteredWords, currentFilter, searchTerm, currentPage, pageSize, learningWords, currentWordIndex, meaningVisible, useDictionary } from './state.js';

// Helper function to update currentPage state (since direct import modification is tricky)
function setCurrentPage(newPage) {
    // This is a conceptual update. state.js needs a proper mechanism.
    // For now, we'll assume this function correctly updates the shared state if state.js is refactored.
    // If state.js exports an object: import { state } from './state.js'; state.currentPage = newPage;
    // Or if state.js has a setter: import { setCurrentPageState } from './state.js'; setCurrentPageState(newPage);
    // For this example, we'll directly try to modify the imported variable, which might not work as expected across modules for primitives.
    // This highlights a limitation of the current simple 'let' export from state.js
    // A better pattern is needed for robust state management.
    window.vocabularyState.currentPage = newPage; // Using the global workaround from learningMode.js
}

function setSearchTerm(newSearchTerm) {
    window.vocabularyState.searchTerm = newSearchTerm;
}

function setCurrentFilter(newFilter) {
    window.vocabularyState.currentFilter = newFilter;
}

function setUseDictionary(value) {
    window.vocabularyState.useDictionary = value;
}


// 初始化
function init() {
  // Initialize global state if not done elsewhere (e.g. learningMode.js)
  if (!window.vocabularyState) {
    window.vocabularyState = {
        currentPage: 1,
        searchTerm: '',
        currentFilter: 'all',
        useDictionary: false,
        // from learningMode.js
        currentWordIndex: 0,
        meaningVisible: false
    };
  }

  loadWords(); // Loads words into global state.words
  applyFilters(window.vocabularyState.currentFilter, window.vocabularyState.searchTerm); // Initial filter application
  renderCategoryFilters();
  setupEventListeners();
  updateWordsDisplay(); // Initial display
}

// 设置事件监听器
function setupEventListeners() {
  if (addWordForm) {
    addWordForm.addEventListener('submit', handleAddWordFormSubmit);
  }

  if (useDictionaryCheckbox) {
    useDictionaryCheckbox.addEventListener('change', (e) => {
        setUseDictionary(e.target.checked);
        if (e.target.checked && wordInput && wordInput.value.trim()) {
            queryDictionary(wordInput.value.trim());
        }
    });
  }

  if (wordInput) {
    wordInput.addEventListener('blur', (e) => {
        if (window.vocabularyState.useDictionary && e.target.value.trim()) {
            queryDictionary(e.target.value.trim());
        }
    });
  }

  if (importJsonInput) {
    importJsonInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        handleJsonImport(this.files[0]);
        this.value = '';
      }
    });
  }

  if (importCsvInput) {
    importCsvInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        handleCsvImport(this.files[0]);
        this.value = '';
      }
    });
  }

  if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', exportToJson);
  }

  if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', exportToCsv);
  }

  //下载发音包按钮 (原始代码中有此按钮的事件监听，但功能是模拟的)
  if (downloadPronunciationBtn) {
    downloadPronunciationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('发音包功能正在开发中，暂时仍使用在线发音服务');
      localStorage.setItem('offline_pronunciation_available', 'true');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        setSearchTerm(e.target.value);
        applyFilters(window.vocabularyState.currentFilter, window.vocabularyState.searchTerm);
    });
  }

  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (window.vocabularyState.currentPage > 1) {
        setCurrentPage(window.vocabularyState.currentPage - 1);
        updateWordsDisplay();
      }
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredWords.length / pageSize);
      if (window.vocabularyState.currentPage < totalPages) {
        setCurrentPage(window.vocabularyState.currentPage + 1);
        updateWordsDisplay();
      }
    });
  }

  // Event listeners for category filter buttons (dynamic)
  // These are now set up within renderCategoryFilters in ui.js, but need to call applyFilters correctly.
  // We need to ensure that applyFilters in actions.js correctly updates the state and UI.
  // The ui.js handleCategoryFilterClick needs to correctly call applyFilters from actions.js.
  // Let's adjust ui.js to call actions.applyFilters with the new category.
  // And actions.applyFilters needs to update state.currentFilter and then call ui.updateCategoryFilterUI.

  // Learning Mode
  if (startLearningBtn) {
    startLearningBtn.addEventListener('click', startLearningMode);
  }
  if (closeLearningBtn) {
    closeLearningBtn.addEventListener('click', closeLearningMode);
  }
  if (showMeaningBtn) {
    showMeaningBtn.addEventListener('click', toggleMeaning);
  }
  if (nextWordBtn) {
    nextWordBtn.addEventListener('click', nextWord);
  }

  // Play audio button in learning mode (if it exists)
  // The original script had a getElementById('play-audio') in setupEventListeners.
  // Assuming playAudioBtn from domElements.js refers to this.
  if (playAudioBtn) {
    playAudioBtn.addEventListener('click', () => {
      // currentWordEl is from domElements.js, refers to the word display in learning mode
      if (learningWords.length > 0 && learningWords[window.vocabularyState.currentWordIndex]) {
        playWordAudio(learningWords[window.vocabularyState.currentWordIndex].word);
      }
    });
  }

  // Category filter buttons in the main list (these are dynamically created)
  // The event listeners for these are added in `renderCategoryFilters` in `ui.js`.
  // We need to ensure that `handleCategoryFilterClick` in `ui.js` correctly updates the state
  // and calls `applyFilters` from `actions.js`.
  // In `ui.js`, `handleCategoryFilterClick` should be modified:
  // function handleCategoryFilterClick(category) {
  //   setCurrentFilter(category); // Update state
  //   applyFilters(category, window.vocabularyState.searchTerm); // Apply filter
  // }
  // And `renderCategoryFilters` should call this `handleCategoryFilterClick`.
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);