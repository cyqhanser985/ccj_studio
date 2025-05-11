import { generateSearchDataFile } from '../utils/generateSearchData.js';

// 生成搜索数据文件
generateSearchDataFile()
  .then(() => {
    console.log('搜索数据生成完成');
  })
  .catch(error => {
    console.error('生成搜索数据时出错:', error);
    process.exit(1);
  }); 