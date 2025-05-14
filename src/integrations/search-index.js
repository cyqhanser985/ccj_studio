import fs from 'fs';
import path from 'path';

export default function createSearchIndexIntegration() {
  return {
    name: 'search-index-integration',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        try {
          const outDir = dir.pathname || dir.toString();
          
          const blogDir = path.join(process.cwd(), 'src/content/blog');
          const notesDir = path.join(process.cwd(), 'src/content/notes');
          
          const searchData = [];
          
          if (fs.existsSync(blogDir)) {
            const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
            
            for (const file of blogFiles) {
              const id = file.replace(/\.[^/.]+$/, '');
              const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
              
              const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
              const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
              const body = content.replace(/---\n[\s\S]*?\n---/, '').trim();
              
              const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?$/m);
              const descMatch = frontmatter.match(/description:\s*["']?(.*?)["']?$/m);
              const dateMatch = frontmatter.match(/date:\s*(.*?)$/m);
              const categoryMatch = frontmatter.match(/category:\s*["']?(.*?)["']?$/m);
              const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/s);
              
              const title = titleMatch ? titleMatch[1] : id;
              const description = descMatch ? descMatch[1] : '';
              const category = categoryMatch ? categoryMatch[1] : '';
              const tags = tagsMatch 
                ? tagsMatch[1].split(',').map(tag => 
                    tag.trim().replace(/["']/g, '')
                  ) 
                : [];
              const date = dateMatch ? new Date(dateMatch[1]).toISOString() : null;
              
              searchData.push({
                id,
                title,
                description,
                url: `/blog/${id}`,
                category,
                tags,
                content: body.substring(0, 5000),
                date
              });
            }
          }
          
          if (fs.existsSync(notesDir)) {
            const notesFiles = fs.readdirSync(notesDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
            
            for (const file of notesFiles) {
              const id = file.replace(/\.[^/.]+$/, '');
              const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
              
              const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
              const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
              const body = content.replace(/---\n[\s\S]*?\n---/, '').trim();
              
              const titleMatch = frontmatter.match(/title:\s*["']?(.*?)["']?$/m);
              const descMatch = frontmatter.match(/description:\s*["']?(.*?)["']?$/m);
              const dateMatch = frontmatter.match(/date:\s*(.*?)$/m);
              const categoryMatch = frontmatter.match(/category:\s*["']?(.*?)["']?$/m);
              const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/s);
              
              const title = titleMatch ? titleMatch[1] : id;
              const description = descMatch ? descMatch[1] : '';
              const category = categoryMatch ? categoryMatch[1] : '';
              const tags = tagsMatch 
                ? tagsMatch[1].split(',').map(tag => 
                    tag.trim().replace(/["']/g, '')
                  ) 
                : [];
              const date = dateMatch ? new Date(dateMatch[1]).toISOString() : null;
              
              searchData.push({
                id,
                title,
                description,
                url: `/notes/${id}`,
                category,
                tags,
                content: body.substring(0, 5000),
                date
              });
            }
          }
          
          const searchDataPath = path.join(outDir, 'search-data.json');
          fs.writeFileSync(searchDataPath, JSON.stringify(searchData));
          
          console.log('✅ 成功生成搜索数据文件，包含', searchData.length, '条记录');
        } catch (error) {
          console.error('❌ 生成搜索索引时出错:', error);
        }
      }
    }
  };
}
