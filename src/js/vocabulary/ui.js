import { getUniqueCategories } from './utils.js';
import { words, filteredWords, currentFilter, searchTerm, currentPage, pageSize } from './state.js';
import { vocabularyTableBody, totalCountEl, prevPageBtn, nextPageBtn } from './domElements.js';
import { deleteWord } from './actions.js'; // Assuming deleteWord is in actions.js
import { applyFilters } from './actions.js'; // Assuming applyFilters is in actions.js

// 渲染分类筛选按钮
export function renderCategoryFilters() {
  const categories = getUniqueCategories();
  const categorySelect = document.getElementById('category-filter'); // Direct get, or import from domElements.js if added there

  if (categorySelect) {
    categorySelect.innerHTML = '<option value="all">所有分类</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  const filterContainer = document.querySelector('.flex.flex-wrap.gap-2');
  if (filterContainer) {
    filterContainer.innerHTML = `
      <button class="category-filter ${currentFilter === 'all' ? 'active' : ''} bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800" data-category="all">
        全部
      </button>
    `;
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = `category-filter ${currentFilter === category ? 'active' : ''} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600`;
      button.setAttribute('data-category', category);
      button.textContent = category;
      filterContainer.appendChild(button);
      button.addEventListener('click', () => {
        // currentFilter = category; // This state update should be handled by a state management function or directly in actions.js
        // applyFilters();
        // updateCategoryFilterUI();
        // For now, let's assume applyFilters will handle state update and UI update call
        handleCategoryFilterClick(category);
      });
    });

    const allButton = filterContainer.querySelector('[data-category="all"]');
    if (allButton) {
      allButton.addEventListener('click', () => {
        // currentFilter = 'all';
        // applyFilters();
        // updateCategoryFilterUI();
        handleCategoryFilterClick('all');
      });
    }
  }
}

function handleCategoryFilterClick(category) {
    // Update state (currentFilter should be imported from state.js and be mutable)
    // This is a simplified approach. Ideally, state mutations go through dedicated functions.
    // For now, directly modifying imported 'let' variables is problematic with ES modules.
    // A better approach would be to have setter functions in state.js or use a more robust state management pattern.
    // Let's assume applyFilters will correctly access and use the new category.
    // And that applyFilters itself will call updateCategoryFilterUI.
    
    // Hacky way to update state for now, will need refactor if state.js exports are const
    // import * as state from './state.js'; state.currentFilter = category;
    // This won't work if currentFilter is a primitive exported with 'let'.
    // Instead, applyFilters should take the new filter as an argument.
    applyFilters(category, searchTerm); // Pass current search term as well
    updateCategoryFilterUI(category); // Explicitly call UI update
}

// 更新分类筛选UI
export function updateCategoryFilterUI(activeFilter) {
  const buttons = document.querySelectorAll('.category-filter');
  buttons.forEach(button => {
    const category = button.getAttribute('data-category');
    if (category === activeFilter) {
      button.classList.add('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-800', 'dark:text-blue-200');
      button.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    } else {
      button.classList.remove('active', 'bg-blue-100', 'dark:bg-blue-900', 'text-blue-800', 'dark:text-blue-200');
      button.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    }
  });
}

// 更新单词显示
export function updateWordsDisplay() {
  const totalPages = Math.ceil(filteredWords.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageWords = filteredWords.slice(startIndex, endIndex);

  if (vocabularyTableBody) {
    if (currentPageWords.length === 0) {
      vocabularyTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
            ${searchTerm || currentFilter !== 'all' ? '没有找到匹配的单词' : '还没有单词，请添加一些单词开始学习'}
          </td>
        </tr>
      `;
    } else {
      vocabularyTableBody.innerHTML = currentPageWords.map(word => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="font-medium text-gray-900 dark:text-white">${word.word}</div>
            ${word.pronunciation ? `<div class="text-sm text-gray-500 dark:text-gray-400">${word.pronunciation}</div>` : ''}
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-900 dark:text-white">${word.meaning}</div>
            ${word.example ? `<div class="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">${word.example}</div>` : ''}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              ${word.category || '未分类'}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${word.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : word.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}">
              ${word.difficulty === 'easy' ? '简单' : word.difficulty === 'medium' ? '中等' : '困难'}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-3" data-id="${word.id}" data-action="delete">
              删除
            </button>
          </td>
        </tr>
      `).join('');

      document.querySelectorAll('[data-action="delete"]').forEach(button => {
        button.addEventListener('click', (e) => {
          const target = e.currentTarget;
          const id = target.getAttribute('data-id');
          if (id) deleteWord(id);
        });
      });
    }
  }

  if (totalCountEl) {
    totalCountEl.textContent = `共 ${filteredWords.length} 个单词`;
  }

  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
  }
}

export function updateTotalCount() {
    if (totalCountEl) {
        totalCountEl.textContent = `共 ${filteredWords.length} 个单词`;
    }
}

export function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredWords.length / pageSize);
    if (prevPageBtn && nextPageBtn) {
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages;
    }
}