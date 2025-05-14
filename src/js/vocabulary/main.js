import { loadWords, queryDictionary, playWordAudio } from './utils.js';
import { renderCategoryFilters, updateWordsDisplay, updateCategoryFilterUI } from './ui.js';
import {
  addWord,
  deleteWord,
  applyFilters,
  handleAddWordFormSubmit,
  handleUseDictionaryChange,
  handleWordInputBlur,
  handleSearchInput,
  handlePrevPage,
  handleNextPage
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

// 初始化全局状态
if (!window.vocabularyState) {
  window.vocabularyState = {
    currentPage: 1,
    searchTerm: '',
    currentFilter: 'all',
    useDictionary: false,
    currentWordIndex: 0,
    meaningVisible: false,
    learningWords: []
  };
}

// 初始化
function init() {
  loadWords(); // 加载单词到全局状态
  applyFilters(window.vocabularyState.currentFilter, window.vocabularyState.searchTerm); // 初始化过滤器
  renderCategoryFilters();
  setupEventListeners();
  updateWordsDisplay(); // 初始化显示
}

// 设置事件监听器
function setupEventListeners() {
  // 添加单词表单
  const addWordForm = document.getElementById('add-word-form');
  if (addWordForm) {
    addWordForm.addEventListener('submit', handleAddWordFormSubmit);
  }

  // 使用词典复选框
  const useDictionaryCheckbox = document.getElementById('use-dictionary');
  if (useDictionaryCheckbox) {
    useDictionaryCheckbox.addEventListener('change', handleUseDictionaryChange);
  }

  // 单词输入框
  const wordInput = document.getElementById('word');
  if (wordInput) {
    wordInput.addEventListener('blur', handleWordInputBlur);
  }

  // 导入JSON
  const importJsonInput = document.getElementById('import-json');
  if (importJsonInput) {
    importJsonInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        handleJsonImport(this.files[0]);
        this.value = '';
      }
    });
  }

  // 导入CSV
  const importCsvInput = document.getElementById('import-csv');
  if (importCsvInput) {
    importCsvInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        handleCsvImport(this.files[0]);
        this.value = '';
      }
    });
  }

  // 导出按钮
  const exportJsonBtn = document.getElementById('export-json');
  const exportCsvBtn = document.getElementById('export-csv');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', exportToJson);
  }
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportToCsv);
  }

  // 下载发音包按钮
  const downloadPronunciationBtn = document.getElementById('download-pronunciation-pack');
  if (downloadPronunciationBtn) {
    downloadPronunciationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('发音包功能正在开发中，暂时仍使用在线发音服务');
      localStorage.setItem('offline_pronunciation_available', 'true');
    });
  }

  // 搜索输入框
  const searchInput = document.getElementById('search-vocabulary');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }

  // 分页按钮
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', handlePrevPage);
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', handleNextPage);
  }

  // 学习模式按钮
  const startLearningBtn = document.getElementById('start-learning');
  const closeLearningBtn = document.getElementById('close-learning');
  const showMeaningBtn = document.getElementById('show-meaning');
  const nextWordBtn = document.getElementById('next-word');
  
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

  // 单词播放按钮
  const playAudioBtn = document.getElementById('play-audio');
  if (playAudioBtn) {
    playAudioBtn.addEventListener('click', () => {
      const currentWord = window.vocabularyState.learningWords[window.vocabularyState.currentWordIndex];
      if (currentWord) {
        playWordAudio(currentWord.word);
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

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', init);