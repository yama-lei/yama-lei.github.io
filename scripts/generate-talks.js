/* global hexo */
const fs = require('fs');
const path = require('path');

// 生成 talks.json 数据文件
hexo.extend.generator.register('talks-data', function(locals) {
  const talkDir = path.join(hexo.source_dir, '_posts', 'talk');
  const talks = [];
  
  try {
    if (!fs.existsSync(talkDir)) {
      console.log('[Talks Generator] Directory not found:', talkDir);
      return {
        path: 'talks.json',
        data: JSON.stringify([])
      };
    }
    
    const files = fs.readdirSync(talkDir).filter(file => file.endsWith('.md'));
    console.log('[Talks Generator] Found files:', files);
    
    files.forEach(file => {
      try {
        const filePath = path.join(talkDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 解析 front-matter
        const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        
        if (!frontMatterMatch) {
          console.log('[Talks Generator] No front-matter in:', file);
          return;
        }
        
        const yamlContent = frontMatterMatch[1];
        const mainContent = (frontMatterMatch[2] || '').trim();
        
        if (!mainContent) {
          console.log('[Talks Generator] No content in:', file);
          return;
        }
        
        // 解析 YAML
        const talk = {
          title: '无标题',
          date: new Date().toISOString(),
          content: mainContent,
          tags: [],
          image: '',
          link: ''
        };
        
        const lines = yamlContent.split('\n');
        let currentKey = null;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith('#')) continue;
          
          if (line.startsWith('- ')) {
            // 数组项
            if (currentKey === 'tags' || currentKey === 'categories') {
              talk.tags.push(line.substring(2).trim());
            }
          } else if (line.includes(':')) {
            const colonIdx = line.indexOf(':');
            const key = line.substring(0, colonIdx).trim();
            const value = line.substring(colonIdx + 1).trim();
            
            if (key === 'title') {
              talk.title = value || '无标题';
              currentKey = null;
            } else if (key === 'date') {
              talk.date = value || talk.date;
              currentKey = null;
            } else if (key === 'image') {
              talk.image = value || '';
              currentKey = null;
            } else if (key === 'link') {
              talk.link = value || '';
              currentKey = null;
            } else if (key === 'tags' || key === 'categories') {
              currentKey = key;
            }
          }
        }
        
        talks.push(talk);
        console.log('[Talks Generator] Parsed:', talk.title, '|', talk.date);
        
      } catch (err) {
        console.error('[Talks Generator] Error parsing file:', file, err);
      }
    });
    
    // 排序
    talks.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('[Talks Generator] Total:', talks.length);
    
  } catch (err) {
    console.error('[Talks Generator] Error:', err);
  }
  
  // 返回 JSON 数据文件
  return {
    path: 'talks.json',
    data: JSON.stringify(talks, null, 2)
  };
});
